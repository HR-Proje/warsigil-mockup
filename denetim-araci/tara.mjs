import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const pages = ['ana-ekran','mod-haritasi','takip-merkezi','techizat-depo','pazar','heykel','sol-cekmece','yapi-yakinlasma','zumrut-ocagi'];
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true}); const report=[];
 for(const slug of pages){
  const context=await browser.newContext({viewport:{width:844,height:390},deviceScaleFactor:1}); const page=await context.newPage(); const errors=[];
  page.on('pageerror',e=>errors.push('pageerror: '+e.message)); page.on('console',m=>{if(m.type()==='error')errors.push('console: '+m.text())});
  const out=path.resolve('denetim',slug); fs.mkdirSync(out,{recursive:true});
  try {
   await page.goto(`http://127.0.0.1:8077/${slug}/`,{waitUntil:'networkidle',timeout:20000}); await page.waitForTimeout(3000); await page.screenshot({path:path.join(out,'00-ekran.jpg'),type:'jpeg',quality:70});
   const baseline=await page.evaluate(()=>{const scene=document.querySelector('#sahne,#oyun')||document.body,sr=scene.getBoundingClientRect(),issues=[];const els=[...scene.querySelectorAll('*')];for(const e of els){const r=e.getBoundingClientRect(),s=getComputedStyle(e);if(r.width&&r.height&&(r.left<sr.left-1||r.top<sr.top-1||r.right>sr.right+1||r.bottom>sr.bottom+1))issues.push({type:'outside',tag:e.tagName,sel:e.id||e.className?.toString().slice(0,40),text:(e.innerText||'').slice(0,40),rect:[r.x,r.y,r.width,r.height]});if(e.scrollWidth>e.clientWidth+2&&e.clientWidth>0)issues.push({type:'scroll',tag:e.tagName,sel:e.id||e.className?.toString().slice(0,40),text:(e.innerText||'').slice(0,40)});if((s.clipPath&&s.clipPath!=='none')||(s.borderImageSource&&s.borderImageSource!=='none'))issues.push({type:'shape',sel:e.id||e.className?.toString().slice(0,40),clip:s.clipPath,border:s.borderImageSource});}return {issues,imgs:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),list:!!document.querySelector('#liste'),links:[...document.querySelectorAll('a')].map(a=>({text:a.innerText,href:a.href}))}});
   const controls=await page.locator('button,a,[role=button],[onclick]').evaluateAll(es=>es.filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&getComputedStyle(e).visibility!=='hidden'}).map((e,i)=>({i,tag:e.tagName,text:(e.innerText||e.getAttribute('aria-label')||'').trim().slice(0,40),href:e.getAttribute('href')})));
   const actions=[];
   for(const c of controls){if(c.href&&(/^(\.\.|\/|https?:)/).test(c.href))continue;if(!c.text)continue;try{const el=page.locator('button,a,[role=button],[onclick]').nth(c.i);const before=await page.locator('body').innerText();await el.click({timeout:1200,force:true});await page.waitForTimeout(350);const after=await page.locator('body').innerText();const modal=await page.locator('[role=dialog],dialog,.modal,.popup,.overlay').count().catch(()=>0),changed=before!==after||modal>0;if(changed){const n=String(actions.length+1).padStart(2,'0');await page.screenshot({path:path.join(out,`${n}-${(c.text||'pencere').toLowerCase().replace(/[^a-z0-9-]/g,'-').slice(0,25)}.jpg`),type:'jpeg',quality:70});actions.push({control:c,opened:true});await page.keyboard.press('Escape').catch(()=>{});await page.locator('body').click({position:{x:5,y:5},force:true}).catch(()=>{});await page.waitForTimeout(100)}else actions.push({control:c,dead:true})}catch(e){actions.push({control:c,error:e.message.slice(0,100)})}}
   report.push({slug,baseline,controls,actions,errors});
  }catch(e){report.push({slug,error:e.message,errors})} await context.close();
 }
 fs.mkdirSync('denetim',{recursive:true});fs.writeFileSync('denetim/rapor.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report.map(r=>({slug:r.slug,error:r.error,errors:r.errors,issues:r.baseline?.issues?.length,imgs:r.baseline?.imgs,controls:r.controls?.length,dead:r.actions?.filter(a=>a.dead).map(a=>a.control.text),actionErrors:r.actions?.filter(a=>a.error).map(a=>a.control.text)})),null,2));await browser.close();
})();
