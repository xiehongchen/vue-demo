import{i as a,U as e,V as t,c as r,W as n,v as s,s as o,w as p,a as i,j as l,X as g,Y as u,Z as d,o as c,_ as m}from"./vendor-bZbVrpZz.js";import{u as h,g as z}from"./useTable-CMAMVJr0.js";const b=l("h1",null,"表格封装",-1),C=a({__name:"table",setup(a){const l=e({name:"",status:""}),{loading:C,tableData:S,getTableData:_,pagination:f,changeCurrent:v,changePageSize:w}=h((a=>z({...l,current:a.page,pageSize:a.size})),{immediate:!0,formatResult:a=>a.map((a=>({...a,isEdit:!1})))});return t(C,(a=>{})),(a,e)=>{const t=m,l=g,h=u,z=d;return c(),r("div",null,[b,n((c(),o(l,{data:s(S),style:{width:"100%"},border:""},{default:p((()=>[i(t,{prop:"date",label:"Date",width:"180"}),i(t,{prop:"name",label:"Name",width:"180"}),i(t,{prop:"address",label:"Address"})])),_:1},8,["data"])),[[z,s(C)]]),i(h,{background:"",layout:"prev, pager, next",total:s(f).total,"page-size":s(f).pageSize,"onUpdate:pageSize":e[0]||(e[0]=a=>s(f).pageSize=a),"current-page":s(f).current,"onUpdate:currentPage":e[1]||(e[1]=a=>s(f).current=a),onCurrentChange:s(v),onSizeChange:s(w)},null,8,["total","page-size","current-page","onCurrentChange","onSizeChange"])])}}});export{C as _};
//# sourceMappingURL=table.vue_vue_type_script_setup_true_lang-CHL1yEwe.js.map
