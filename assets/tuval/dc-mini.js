/* dc-mini.js: Warsigil taslak çalıştırıcısı.
   assets/tuval/Main.dc.html (claude.ai tuvalinden gelen "Design Component" şablonu + mantık sınıfı)
   dosyasını yükler, Preact ile çizer. Şablon bir kez ayrıştırılır; her çizimde hazır ağaç gezilir.
   Desteklenen: {{yol}} delikleri, <sc-if value>, on* olayları, ref geri çağrıları, <helmet>,
   DCLogic (props, state, setState, forceUpdate, yaşam döngüsü, renderVals).
   Bağımlılık: ../assets/vendor/preact.min.js (window.preact). */
(function () {
  'use strict';
  var P = window.preact;
  var h = P.h, Fragment = P.Fragment;
  var SRC = (document.currentScript && document.currentScript.src) || '';
  var TEMPLATE_URL = new URL('Main.dc.html', SRC || location.href).href;

  /* ---------- delik ifadeleri ---------- */
  var HOLE = /\{\{\s*([^{}]+?)\s*\}\}/g;
  var FULL_HOLE = /^\{\{\s*([^{}]+?)\s*\}\}$/;

  function walk(vals, parts) {
    var v = vals;
    for (var i = 0; i < parts.length; i++) {
      if (v == null) return undefined;
      v = v[parts[i]];
    }
    return v;
  }
  function getter(expr) {
    expr = expr.trim();
    if (expr === 'true') return function () { return true; };
    if (expr === 'false') return function () { return false; };
    if (expr === 'null') return function () { return null; };
    if (expr === 'undefined') return function () { return undefined; };
    if (/^-?\d+(\.\d+)?$/.test(expr)) { var n = parseFloat(expr); return function () { return n; }; }
    var parts = expr.split('.');
    return function (vals) { return walk(vals, parts); };
  }
  function str(x) { return (x == null || x === false || x === true) ? '' : String(x); }

  /* Metni parçalara böler: {s:'sabit'} ya da {g:getter}. Delik yoksa null döner. */
  function splitHoles(s) {
    if (s.indexOf('{{') < 0) return null;
    var out = [], last = 0, m;
    HOLE.lastIndex = 0;
    while ((m = HOLE.exec(s))) {
      if (m.index > last) out.push({ s: s.slice(last, m.index) });
      out.push({ g: getter(m[1]) });
      last = m.index + m[0].length;
    }
    if (last < s.length) out.push({ s: s.slice(last) });
    return out;
  }
  function interpolate(parts, vals) {
    var r = '';
    for (var i = 0; i < parts.length; i++) r += parts[i].g ? str(parts[i].g(vals)) : parts[i].s;
    return r;
  }

  /* ---------- stil ayrıştırma (JS'in sonradan yazdığı özellikler ezilmesin diye nesne olarak verilir) ---------- */
  function splitDecls(s) {
    var out = [], cur = '', depth = 0, q = null, i, ch;
    for (i = 0; i < s.length; i++) {
      ch = s.charAt(i);
      if (q) { cur += ch; if (ch === q) q = null; }
      else if (ch === '"' || ch === "'") { q = ch; cur += ch; }
      else if (ch === '(') { depth++; cur += ch; }
      else if (ch === ')') { depth--; cur += ch; }
      else if (ch === ';' && depth === 0) { out.push(cur); cur = ''; }
      else cur += ch;
    }
    if (cur.trim()) out.push(cur);
    return out;
  }

  /* ---------- şablonu derle ---------- */
  /* Her düğüm: {s:true, v:statikVnode|metin} ya da {s:false, f:function(vals)} */
  function compileChildren(nodes) {
    var out = [];
    for (var i = 0; i < nodes.length; i++) {
      var c = compileNode(nodes[i]);
      if (c) out.push(c);
    }
    return out;
  }
  function evalKids(kids, vals) {
    var ch = new Array(kids.length);
    for (var i = 0; i < kids.length; i++) ch[i] = kids[i].s ? kids[i].v : kids[i].f(vals);
    return ch;
  }
  function allStatic(kids) {
    for (var i = 0; i < kids.length; i++) if (!kids[i].s) return false;
    return true;
  }

  function compileNode(node) {
    if (node.nodeType === 3) {
      var t = node.nodeValue;
      var parts = splitHoles(t);
      if (!parts) return { s: true, v: t };
      return { s: false, f: function (vals) { return interpolate(parts, vals); } };
    }
    if (node.nodeType !== 1) return null;
    var tag = node.localName;
    if (tag === 'helmet') return null;

    var kids = compileChildren(node.childNodes);

    if (tag === 'sc-if') {
      var raw = node.getAttribute('value') || '';
      var m = FULL_HOLE.exec(raw);
      var cond = m ? getter(m[1]) : (function (lit) { return function () { return lit !== 'false' && lit !== '' && lit !== '0'; }; })(raw.trim());
      return {
        s: false,
        f: function (vals) {
          return cond(vals) ? h.apply(null, [Fragment, null].concat(evalKids(kids, vals))) : null;
        }
      };
    }

    var staticProps = {}, dyn = [], styleDyn = null, hasDyn = false, i;
    for (i = 0; i < node.attributes.length; i++) {
      var an = node.attributes[i].name, av = node.attributes[i].value;
      if (an.indexOf('hint-') === 0) continue;
      var lower = an.toLowerCase();
      var full = FULL_HOLE.exec(av);
      if (lower === 'style') {
        var holes = splitHoles(av);
        if (!holes) { staticProps.style = av; continue; }
        var decls = splitDecls(av), seen = {}, dupe = false, spec = [];
        decls.forEach(function (d) {
          var k = d.indexOf(':');
          if (k < 0) return;
          var key = d.slice(0, k).trim(), val = d.slice(k + 1).trim();
          if (seen[key]) dupe = true;
          seen[key] = 1;
          spec.push({ k: key, p: splitHoles(val), v: val });
        });
        if (dupe) { dyn.push({ n: 'style', f: (function (hp) { return function (vals) { return interpolate(hp, vals); }; })(holes) }); }
        else styleDyn = spec;
        hasDyn = true;
        continue;
      }
      if (lower === 'ref') {
        hasDyn = true;
        dyn.push({ n: 'ref', f: full ? getter(full[1]) : function () { return null; } });
        continue;
      }
      if (lower.indexOf('on') === 0 && full) {
        hasDyn = true;
        dyn.push({ n: lower, f: getter(full[1]) });
        continue;
      }
      if (full) { hasDyn = true; dyn.push({ n: an, f: getter(full[1]) }); continue; }
      var mixed = splitHoles(av);
      if (mixed) { hasDyn = true; dyn.push({ n: an, f: (function (hp) { return function (vals) { return interpolate(hp, vals); }; })(mixed) }); continue; }
      staticProps[an] = av;
    }

    if (!hasDyn && allStatic(kids)) {
      var sp = {};
      for (var k1 in staticProps) sp[k1] = staticProps[k1];
      sp.children = evalKids(kids, null);
      return { s: true, v: h(tag, sp) };
    }

    return {
      s: false,
      f: function (vals) {
        var p = {}, k, j;
        for (k in staticProps) p[k] = staticProps[k];
        for (j = 0; j < dyn.length; j++) p[dyn[j].n] = dyn[j].f(vals);
        if (styleDyn) {
          var so = {};
          for (j = 0; j < styleDyn.length; j++) {
            var d = styleDyn[j];
            so[d.k] = d.p ? interpolate(d.p, vals) : d.v;
          }
          p.style = so;
        }
        p.children = evalKids(kids, vals);
        return h(tag, p);
      }
    };
  }

  /* ---------- DCLogic ---------- */
  /* Durum yazımı anında görünür (this.state hemen güncel), çizim toplu yapılır. */
  function DCLogic(props, context) {
    P.Component.call(this, props, context);
  }
  DCLogic.prototype = Object.create(P.Component.prototype);
  DCLogic.prototype.constructor = DCLogic;
  Object.defineProperty(DCLogic.prototype, 'state', {
    configurable: true,
    get: function () { return this._st; },
    set: function (v) { if (!this._init) this._st = v; }
  });
  DCLogic.prototype.setState = function (patch, cb) {
    var ns = typeof patch === 'function' ? patch(this._st || {}, this.props) : patch;
    if (ns != null) this._st = Object.assign({}, this._st, ns);
    this.forceUpdate(cb);
  };
  DCLogic.prototype.render = function () {
    this._init = true;
    var tpl = this.constructor._tpl;
    return tpl(this.renderVals());
  };

  /* ---------- yükle ve çiz ---------- */
  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function waitIdle(c, max) {
    var t0 = Date.now();
    return new Promise(function (res) {
      (function chk() {
        if ((!c.busy && !c.anim) || Date.now() - t0 > (max || 4000)) res();
        else setTimeout(chk, 40);
      })();
    });
  }

  /* Sayfanın verdiği kimliğe göre başlangıç durumu: gerçek kullanıcı akışındaki işleyicileri çağırır. */
  var BASLANGIC = {
    'ana-ekran': function () { return Promise.resolve(); },
    'yapi-yakinlasma': function (c) {
      return sleep(1000).then(function () { c.focus('kisla', false); return waitIdle(c); });
    },
    'zumrut-ocagi': function (c) { c.tap('ocak'); return waitIdle(c).then(function () { return sleep(250); }); },
    'pazar': function (c) { c.tap('pazar'); return waitIdle(c).then(function () { return sleep(250); }); },
    'haklar-listesi': function (c) { c.h.toggleDD(); return sleep(200); },
    'sol-cekmece': function (c) { c.h.openDrawer(); return sleep(350); },
    'kilitli-yapi': function (c) {
      /* Arena Sv 8'de açılır; Komutan Seviyesi 5'e çekilince kilitli kalır. */
      c.setState({ lvl: 5 });
      return sleep(120).then(function () { c.tap('arena'); return waitIdle(c); }).then(function () { return sleep(250); });
    },
    'heykel': function (c) { c.tap('heykel'); return waitIdle(c).then(function () { return sleep(250); }); },
    'avatar-rozetleri': function (c) { c.h.bdgS(); return sleep(250); },
    'komutan-detayi': function (c) { c.h.openKd(); return sleep(350); },
    'techizat-depo': function (c) {
      c.h.openKd();
      return sleep(300).then(function () { c.eqSlotTF.S(); return sleep(350); });
    },
    'bas-ekrani': function (c) {
      c.h.openKd();
      return sleep(300).then(function () { c.eqSlotTF.S(); return sleep(300); })
        .then(function () { c.eqBasF.c1(); return sleep(350); });
    }
  };

  function boot(container) {
    return fetch(TEMPLATE_URL).then(function (r) {
      if (!r.ok) throw new Error('Şablon yüklenemedi: ' + r.status);
      return r.text();
    }).then(function (text) {
      var doc = new DOMParser().parseFromString(text, 'text/html');
      var xdc = doc.querySelector('x-dc');
      if (!xdc) throw new Error('x-dc bulunamadı');
      /* helmet: stil ve yazı tipi bağlantıları head'e */
      var hel = xdc.querySelector('helmet');
      if (hel) {
        Array.prototype.slice.call(hel.children).forEach(function (el) {
          document.head.appendChild(document.importNode(el, true));
        });
      }
      /* şablon kökü */
      var roots = compileChildren(xdc.childNodes).filter(function (c) {
        return !(c.s && typeof c.v === 'string' && !c.v.trim());
      });
      var tpl = roots.length === 1
        ? function (vals) { var c = roots[0]; return c.s ? c.v : c.f(vals); }
        : function (vals) { return h.apply(null, [Fragment, null].concat(evalKids(roots, vals))); };
      /* mantık */
      var sc = doc.querySelector('script[data-dc-script]');
      if (!sc) throw new Error('Mantık betiği bulunamadı');
      var Component = new Function('DCLogic', sc.textContent + '\n;return Component;')(DCLogic);
      Component._tpl = tpl;

      var inst = null;
      P.render(h(Component, { ref: function (r) { if (r) inst = r; } }), container);
      window.WS_INST = inst;
      var id = window.WS_BASLANGIC;
      var fn = id && BASLANGIC[id];
      if (fn && inst) {
        return fn(inst).then(function () { document.documentElement.setAttribute('data-hazir', id); });
      }
      document.documentElement.setAttribute('data-hazir', id || '');
    });
  }

  function start() {
    var el = document.getElementById('oyun') || document.getElementById('sahne');
    boot(el).catch(function (e) {
      console.error(e);
      el.textContent = 'Yüklenemedi: ' + (e && e.message);
      el.style.color = '#F4ECD8';
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
