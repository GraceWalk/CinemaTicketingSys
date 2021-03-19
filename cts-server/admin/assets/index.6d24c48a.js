var e=Object.assign;import{p as t,o,c as r,g as n,r as i,a as s,b as a,l as c,d as l,e as u,f as m,E as p}from"./vendor.732fc1c0.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(o){const r=new URL(e,location),n=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((o,i)=>{const s=new URL(e,r);if(self[t].moduleMap[s])return o(self[t].moduleMap[s]);const a=new Blob([`import * as m from '${s}';`,`${t}.moduleMap['${s}']=m;`],{type:"text/javascript"}),c=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(a),onerror(){i(new Error(`Failed to import: ${e}`)),n(c)},onload(){o(self[t].moduleMap[s]),n(c)}});document.head.appendChild(c)})),self[t].moduleMap={}}}("/assets/");const d={expose:[],setup(e){const{ctx:s}=n();return t("$api",s.$api),t("$notify",s.$notify),t("$router",s.$router),(e,t)=>{const n=i("router-view");return o(),r(n)}}};let f;const v={},_=function(e,t){if(!t)return e();if(void 0===f){const e=document.createElement("link").relList;f=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if(e in v)return;v[e]=!0;const t=e.endsWith(".css"),o=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${o}`))return;const r=document.createElement("link");return r.rel=t?"stylesheet":f,t||(r.as="script",r.crossOrigin=""),r.href=e,document.head.appendChild(r),t?new Promise(((e,t)=>{r.addEventListener("load",e),r.addEventListener("error",t)})):void 0}))).then((()=>e()))},g=[{path:"/",redirect:"/movies"},{path:"/login",name:"login",component:()=>_((()=>__import__("./Login.dc3deb0d.js")),["/assets/Login.dc3deb0d.js","/assets/Login.ff0910ec.css","/assets/vendor.732fc1c0.js"])},{path:"/",component:()=>_((()=>__import__("./Layout.88305137.js")),["/assets/Layout.88305137.js","/assets/Layout.cd5de004.css","/assets/vendor.732fc1c0.js"]),children:[{path:"movies",name:"movieList",component:()=>_((()=>__import__("./MovieList.161ec954.js")),["/assets/MovieList.161ec954.js","/assets/MovieList.96e51302.css","/assets/vendor.732fc1c0.js"])},{path:"movies/detail",name:"movieDetail",component:()=>_((()=>__import__("./MovieDetail.1ba56d06.js")),["/assets/MovieDetail.1ba56d06.js","/assets/MovieDetail.9a356dfb.css","/assets/vendor.732fc1c0.js"])}]}],h=s({history:a(),routes:g});h.beforeEach(((e,t,o)=>{const r=localStorage.getItem("token");"login"===e.name||r?o():(o({name:"login"}),c.ElNotification({title:"用户当前未登录, 已自动跳转到登录页面",type:"error"}))}));const L=l({state:()=>({count:0}),mutations:{increment(e){e.count++}}});const b=u.create({baseURL:"/api/"});b.interceptors.request.use((e=>{const t=localStorage.getItem("token");return t&&(e.headers.Authorization=`Bearer ${t}`),e})),b.interceptors.response.use((t=>{let o=e({},t.data);return 0===o.errno?o:(c.ElNotification({title:o.errmsg,type:"error"}),Promise.reject(o.errmsg))}));var E=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",login:function(e){return b.post("public/login",e)}});var $=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",getMoviesList:function(){return b.get("public/movies/")},getMovieDetail:function(e){return b.get(`public/movies/detail?id=${e}`)},createMovie:function(e){return b.post("admin/movies/create",e)},updateMovie:function(e){return b.post("admin/movies/update",e)},removeMovie:function(e){return b.post("admin/movies/remove",{id:e})},autoCompleteDetail:function(e,t){return b.get(`admin/movies/autoComplete?type=${e}&id=${t}`)},refreshMoviesList:function(e){return b.get(`admin/movies/refresh?type=${e}`)}});const y=Object.assign({},E,$),M=m(d);M.config.globalProperties.$api=y,M.use(h).use(L).use(p).mount("#app");
