import{o as e,c as t,r as o,_ as n,a as r,b as s,d as a,M as i,m as c,e as m,f as d,E as p,A as u}from"./vendor-Nsf7-Cwh.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const l=(e,t)=>{const o=e.__vccOpts||e;for(const[n,r]of t)o[n]=r;return o};const _=l({},[["render",function(n,r){const s=o("router-view");return e(),t(s)}]]),f=[{path:"/home",name:"home",component:()=>n((()=>import("./index-9U5MX7qR.js")),__vite__mapDeps([0,1,2,3,4,5])),meta:{title:"首页"}},{path:"/package",name:"package",component:()=>n((()=>import("./index-BVjFd4Kd.js")),__vite__mapDeps([6,2,3])),meta:{title:"封装组件"}},{path:"/category",name:"category",component:()=>n((()=>import("./index-DNREKpNh.js")),__vite__mapDeps([7,1,2,3,4,8])),meta:{title:"分类"}},{path:"/tags",name:"tags",component:()=>n((()=>import("./index-cYX4uZvB.js")),__vite__mapDeps([9,1,2,3,10])),meta:{title:"标签"}},{path:"/about",name:"about",component:()=>n((()=>import("./index-InAF_Is-.js")),__vite__mapDeps([11,2,3]))}],h=[{path:"/doc/:name",name:"doc",component:()=>n((()=>import("./index-OuJCOjfK.js")),__vite__mapDeps([12,2,3,4,13]))},{path:"/search",name:"search",component:()=>n((()=>import("./index-VFiFYdIG.js")),__vite__mapDeps([14,1,2,3,4,15]))}],g=[{path:"/",redirect:"/home",component:()=>n((()=>import("./index-B6mgDGeJ.js")),__vite__mapDeps([16,2,3,4,17])),children:[...f,...h]}],y=r({history:s(),routes:g,scrollBehavior:()=>({left:0,top:0})}),E=a(),b=new WeakMap,O=new IntersectionObserver((e=>{for(const t of e)if(t.isIntersecting){const e=b.get(t.target);e&&e.play(),O.unobserve(t.target)}}));const x={mounted(e){if(!function(e){return e.getBoundingClientRect().top>window.innerHeight}(e))return;const t=e.animate([{transform:"translateY(100px)",opacity:.5},{transform:"translateY(0)",opacity:1}],{duration:500,fill:"forwards",easing:"ease-out"});t.pause(),b.set(e,t),O.observe(e)},unmounted(e){O.unobserve(e)}},R=e=>i.mock({code:200,data:e,message:"请求成功",success:!0}),v=[{url:"/api/a",method:"get",timeout:300,response:()=>R({})}],I=e=>{const t=["篮球","羽毛球","足球","音乐","电影","旅行","高尔夫","爬山","游泳","健身"],o=[];for(;o.length<e;){const e=Math.floor(Math.random()*t.length);o.includes(t[e])||o.push(t[e])}return o},L=[{url:"/api/person/list",method:"get",timeout:350,response:({query:e})=>{const{current:t=1,pageSize:o=10,status:n=0,name:r=""}=e,s=(e=>{const t=[];for(let o=0;o<e.pageSize;o++)t.push({id:"@integer(10,999999)",index:o,name:""!==e.name?e.name:"@cname()",phone:"15578728810",startTime:"@datetime",endTime:"@datetime",createTime:"@datetime",address:"@county(true)",avatar:c.Random.image("400x400",c.Random.color(),c.Random.color(),c.Random.first()),date:"@date('yyyy-MM-dd')",time:"@time('HH:mm')","proportion|1-100":10,"no|100000-10000000":1e5,status:""!=e.status?Number(e.status):Math.random()>.5?1:0,color:i.mock("@hex"),hobbys:I(Math.floor(9*Math.random()))});return t})({current:t,pageSize:o,status:n,name:r});return R({total:1e3,records:s})}},{url:"/api/person/delete",method:"post",timeout:350,response:({body:e})=>{const{ids:t}=e;return R(t)}}];const P=d(_);for(const[T,j]of Object.entries(p))P.component(T,j);P.use(u),P.use(E),P.use(y),P.directive("silderIn",x),P.mount("#app"),m([...v,...L]);export{l as _,f as m,y as r};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-9U5MX7qR.js","assets/data-D9FhXXPW.js","assets/vendor-Nsf7-Cwh.js","assets/vendor-DZvzJxPB.css","assets/article-gFgtrTCS.js","assets/index-DBgWzTzu.css","assets/index-BVjFd4Kd.js","assets/index-DNREKpNh.js","assets/index-Dze_-8NP.css","assets/index-cYX4uZvB.js","assets/index-Cj3bEeaU.css","assets/index-InAF_Is-.js","assets/index-OuJCOjfK.js","assets/index-D9HpaLMS.css","assets/index-VFiFYdIG.js","assets/index-B0tcavSu.css","assets/index-B6mgDGeJ.js","assets/index-CrJVA6C0.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
//# sourceMappingURL=index-DcTmwxo-.js.map