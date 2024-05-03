import{g as e,j as t,v as a,x as s,y as d,o,h as m,s as l,l as r,z as n,B as i,F as c,_ as u}from"./vendor-5QtJxRnT.js";import{_}from"./index-8K_HboOq.js";const h=_(e({__name:"index",setup(e){const _=t(),h=a((()=>_.params.name)),p=s({theme:"dark",text:"",id:"my-editor"});d((()=>{_.path.startsWith("/doc/")&&u((()=>import("./markdown/"+h.value+".md?raw")),__vite__mapDeps([])).then((e=>{p.text=e.default})).catch((()=>{}))}));const x=document.documentElement;return(e,t)=>(o(),m(c,null,[l(r(n),{modelValue:r(p).text,editorId:r(p).id},null,8,["modelValue","editorId"]),l(r(i),{editorId:r(p).id,scrollElement:r(x),theme:r(p).theme},null,8,["editorId","scrollElement","theme"])],64))}}),[["__scopeId","data-v-6e08c403"]]);export{h as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
//# sourceMappingURL=index-BQX5U7HG.js.map
