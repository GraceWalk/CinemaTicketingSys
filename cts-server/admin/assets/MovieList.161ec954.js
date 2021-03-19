import{h as a,i as l,j as e,o as n,c as t,k as o,t as i,u as s,w as u,m as r,n as d,r as p}from"./vendor.732fc1c0.js";const c=u("data-v-1ea144a7");a("data-v-1ea144a7");const f={class:"movie-page"},_=r("更新热映电影数据"),w=r("新建影片"),b=r("编辑"),m=r("删除");l();const y={expose:[],setup(a){const l=d("$api"),u=d("$notify"),r=d("$router"),y=e({list:[]});async function v(){const a=await l.getMoviesList();y.list=a.data}function j(){r.push({name:"movieDetail"})}async function g(){const a=await l.refreshMoviesList("nowplaying");y.list=a.data,u({title:"同步热映电影数据成功",type:"success"})}return v(),c(((a,e)=>{const d=p("el-button"),k=p("el-form-item"),C=p("el-form"),h=p("el-table-column"),x=p("el-table");return n(),t("div",f,[o("div",null,[o(d,{type:"primary",onClick:g},{default:c((()=>[_])),_:1}),o(d,{type:"primary",onClick:j},{default:c((()=>[w])),_:1})]),o(x,{data:s(y).list,stripe:"",style:{width:"100%"}},{default:c((()=>[o(h,{type:"expand"},{default:c((a=>[o(C,{"label-position":"left",inline:"",class:"table-expand"},{default:c((()=>[o(k,{label:"影片名称"},{default:c((()=>[o("span",null,i(a.row.name),1)])),_:2},1024),o(k,{label:"影片原名"},{default:c((()=>[o("span",null,i(a.row.originName||a.row.name),1)])),_:2},1024),o(k,{label:"类型"},{default:c((()=>[o("span",null,i(a.row.type.join(" ")),1)])),_:2},1024),o(k,{label:"发行年份"},{default:c((()=>[o("span",null,i(a.row.year),1)])),_:2},1024),o(k,{label:"导演"},{default:c((()=>[o("span",null,i(a.row.directors.join(" ")),1)])),_:2},1024),o(k,{label:"编剧"},{default:c((()=>[o("span",null,i(a.row.scriptWriter.join(" ")),1)])),_:2},1024),o(k,{label:"主演"},{default:c((()=>[o("span",null,i(a.row.actors.slice(0,5).join(" ")),1)])),_:2},1024),o(k,{label:"国家"},{default:c((()=>[o("span",null,i(a.row.countries.join(" ")),1)])),_:2},1024),o(k,{label:"上映时间"},{default:c((()=>[o("span",null,i(a.row.date.join(" ")),1)])),_:2},1024),o(k,{label:"语言"},{default:c((()=>[o("span",null,i(a.row.language.join(" ")),1)])),_:2},1024),o(k,{label:"评分"},{default:c((()=>[o("span",null,i(a.row.rating),1)])),_:2},1024),o(k,{label:"时长"},{default:c((()=>[o("span",null,i(a.row.runtime),1)])),_:2},1024),o(k,{label:"背景图片"},{default:c((()=>[o("span",null,i(a.row.picUrl),1)])),_:2},1024),o(k,{label:"简介"},{default:c((()=>[o("span",null,i(a.row.introduction),1)])),_:2},1024)])),_:2},1024)])),_:1}),o(h,{prop:"name",label:"名称"}),o(h,{label:"国家"},{default:c((a=>[o("span",null,i(a.row.countries.join(" ")),1)])),_:1}),o(h,{label:"导演"},{default:c((a=>[o("span",null,i(a.row.directors.join(" ")),1)])),_:1}),o(h,{label:"操作"},{default:c((a=>[o(d,{size:"mini",onClick:l=>{return e=a.row._id,void r.push({name:"movieDetail",query:{id:e}});var e}},{default:c((()=>[b])),_:2},1032,["onClick"]),o(d,{size:"mini",type:"danger",onClick:e=>async function(a,e){await l.removeMovie(a),v(),u.success({title:`成功删除电影 ${e}`})}(a.row._id,a.row.name)},{default:c((()=>[m])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"])])}))},__scopeId:"data-v-1ea144a7"};export default y;
