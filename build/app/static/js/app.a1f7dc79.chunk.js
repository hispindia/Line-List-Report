"use strict";(self.webpackChunk_dhis2_app_shell=self.webpackChunk_dhis2_app_shell||[]).push([[2143],{8593:function(e,t,a){a.r(t),a.d(t,{default:function(){return D}});var n=a(969),l=a(1949),r=(a(4144),"App_desgin__BnYg4"),i="App_zebraStriping__nfO45",o="App_darkTable__DEnJk",u="App_lightTable__sCsFQ",d="App_light-mode__9KTc8",c="App_dark-mode__Aylqm",s="App_itemAlign__u41Rf",m="App_searchBackground__1XYAT",v="App_uniqueColorRed__eyCfC",E="App_uniqueColorGreen__V6sNa",p="App_container__4dc2l",g=(a(4551),a(6309)),y=a(8382),k=a(964),f=a(3582),b=a(4359),h=a(7212),A="Model_modal__wrap__ugES1",S="Model_visible__8fmtV",_="Model_modal__2WHKA";var w=e=>{let{modalStyle:t,children:a,show:l,onClose:r,backdropStyle:i}=e;const o=(0,n.useRef)(null);return(0,n.useEffect)((()=>{l?o.current.classList.add(S):o.current.classList.remove(S)}),[l]),n.createElement(n.Fragment,null,n.createElement("div",{ref:o,className:`${A}`},n.createElement("div",{style:t,className:`${_} flex flex-col`},n.createElement("button",{onClick:r,className:"ml-auto py-0 px-2",style:{border:"none",background:"#e5e5e5"}},n.createElement("i",{class:"fa-solid fa-xmark bold",style:{color:"#444",fontSize:"16px",marginLeft:"460px",cursor:"pointer"}},"X")),a)))};function x(e,t,a){return(t=function(e){var t=function(e,t){if("object"!==typeof e||null===e)return e;var a=e[Symbol.toPrimitive];if(void 0!==a){var n=a.call(e,t||"default");if("object"!==typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class T{}x(T,"EventAPi",(async(e,t)=>(await fetch(`../../events.json?skipPaging=true&program=${e}&trackedEntityInstance=${t.id}&fields=dataValues[dataElement,value],eventDate,programStage,status`,{method:"GET"})).json())),x(T,"ProgramStages",(async()=>(await fetch("../../programStages.json?paging=false&fields=id,name",{method:"GET"})).json())),x(T,"AllDataelement",(async()=>(await fetch("../../dataElements.json?paging=false&domainType=TRACKER&fields=id,name",{method:"GET"})).json())),x(T,"Programoptions",(async()=>(await fetch("../../29/sqlViews/oZAXWFlZgI7/data?paging=false",{method:"GET"})).json())),x(T,"tableDataplot",(async e=>(await fetch(`../../trackedEntityInstances.json?ou=Fn51zf6ifbm&program=${encodeURIComponent(e)}&ouMode=DESCENDANTS`,{method:"GET"})).json())),x(T,"tableHeaderData",(async e=>(await fetch(`../../programs/${e}.json?fields=programTrackedEntityAttributes%5BtrackedEntityAttribute%5Bid,name,formName,attributeValues%5Battribute%5Bid,name,code%5D,value%5D%5D%5D`,{method:"GET"})).json()));var C=()=>{var e,t,a;const[l,A]=(0,n.useState)([]),[S,_]=(0,n.useState)(""),[x,C]=(0,n.useState)([]),[N,D]=(0,n.useState)(""),[I,R]=(0,n.useState)(!1),[P,j]=(0,n.useState)([]),[$,V]=(0,n.useState)([]),[B,W]=(0,n.useState)({}),[F,G]=(0,n.useState)({value:!1,id:""}),[M,O]=(0,n.useState)([]),[L,q]=(0,n.useState)([]),[J,K]=(0,n.useState)([]),[Z,H]=(0,n.useState)(""),[U,z]=(0,n.useState)("true"===localStorage.getItem("darkMode"));(0,n.useEffect)((()=>{localStorage.setItem("darkMode",U)}),[U]);(0,n.useRef)(null);const X=function(e,t,a){e.nodeType||(e=document.getElementById(e));var n,l={worksheet:t||"Worksheet",table:e.innerHTML};document.getElementById("dlink").href="data:application/vnd.ms-excel;base64,"+function(e){return window.btoa(unescape(encodeURIComponent(e)))}((n=l,'<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head>\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e</head><body><table>{table}</table></body></html>'.replace(/{(\w+)}/g,(function(e,t){return n[t]})))),document.getElementById("dlink").download=`${t}.xls`,document.getElementById("dlink").click()};console.log("programStages>>>>>>>",L),console.log("eventData>>>>>",M),console.log("dataElements>>>>>>",J),(0,n.useEffect)((()=>{1==F.value&&async function(){const e=await T.EventAPi(S,F);O(e)}()}),[F]),(0,n.useEffect)((()=>{!async function(){var e;const t=await T.Programoptions();A(null===t||void 0===t||null===(e=t.listGrid)||void 0===e?void 0:e.rows)}(),async function(){const e=await T.ProgramStages(),t=await T.AllDataelement();q(e),K(t)}()}),[]),(0,n.useEffect)((()=>{!async function(){var e;const t=await T.tableDataplot(S);C(null===t||void 0===t?void 0:t.trackedEntityInstances),D(null===t||void 0===t||null===(e=t.trackedEntityInstances)||void 0===e?void 0:e.length)}(),async function(){const e=await T.tableHeaderData(S);j(e)}()}),[S]),(0,n.useEffect)((()=>{!function(e){const t=[];if(void 0!==(null===e||void 0===e?void 0:e.programTrackedEntityAttributes))for(var a=0;a<e.programTrackedEntityAttributes.length;a++){var n,l;if(void 0!==(null===(n=e.programTrackedEntityAttributes[a])||void 0===n||null===(l=n.trackedEntityAttribute)||void 0===l?void 0:l.attributeValues))for(var r=0;r<e.programTrackedEntityAttributes[a].trackedEntityAttribute.attributeValues.length;r++){var i,o,u;if("showInConsent"===(null===(i=e.programTrackedEntityAttributes[a].trackedEntityAttribute.attributeValues[r])||void 0===i||null===(o=i.attribute)||void 0===o?void 0:o.code)&&"true"===(null===(u=e.programTrackedEntityAttributes[a].trackedEntityAttribute.attributeValues[r])||void 0===u?void 0:u.value)){const n={attribute:e.programTrackedEntityAttributes[a].trackedEntityAttribute.id,displayName:e.programTrackedEntityAttributes[a].trackedEntityAttribute.name,value:""};t.push(n),V(t),console.log("getting the Blank array data",t)}}}}(P)}),[P]);const[Y,Q]=(0,n.useState)(1);return console.log("header1?.programTrackedEntityAttributes>>>>",null===P||void 0===P?void 0:P.programTrackedEntityAttributes),n.createElement(n.Fragment,null,n.createElement("div",{className:p},n.createElement("div",{className:U?c:d,style:{overflow:"auto",borderRadius:"10px"}},n.createElement("div",{style:{padding:"5px"}},n.createElement("div",null,l.length>0&&n.createElement("select",{onChange:e=>{const t=JSON.parse(e.target.value);_(t.id),H(t.name)}},n.createElement("option",{value:""},"Select Program for Event List"),l.map((e=>n.createElement("option",{key:e[0],value:JSON.stringify({id:e[0],name:e[1]})},e[1])))),n.createElement("button",{onClick:()=>{z(!U)}},U?"Light Mode":"Dark Mode"),n.createElement("button",{onClick:()=>X("report-table","Timor Event List")},"Export Data")),n.createElement(w,{show:F.value,onClose:()=>G({value:!1})},n.createElement(k.i,{className:U?o:u},n.createElement(g.S,null,n.createElement(y.p,null,"Selected Program:"),n.createElement(y.p,null,Z||"")),null===M||void 0===M||null===(e=M.events)||void 0===e?void 0:e.map(((e,t)=>{var a,l;return n.createElement("div",null,n.createElement(g.S,null,n.createElement(y.p,null,"Program Stage:"),n.createElement(y.p,null,(e=>{var t;const a=null===L||void 0===L||null===(t=L.programStages)||void 0===t?void 0:t.find((t=>t.id===e));return a?a.name:"Unknown"})(null===e||void 0===e?void 0:e.programStage))),n.createElement(g.S,{className:i},n.createElement(y.p,null,"Event Date:"),n.createElement(y.p,null,e.eventDate?e.eventDate.split("T")[0]:"")),n.createElement(g.S,null,n.createElement(y.p,null,"Status:"),n.createElement(y.p,null,e.status)),(null===e||void 0===e||null===(a=e.dataValues)||void 0===a?void 0:a.length)>0&&n.createElement(n.Fragment,null,n.createElement("span",null,"DataElements"),n.createElement(g.S,{className:i},null===e||void 0===e||null===(l=e.dataValues)||void 0===l?void 0:l.map(((e,t)=>n.createElement(g.S,{key:t,className:i},n.createElement(y.p,null,(e=>{var t;const a=null===J||void 0===J||null===(t=J.dataElements)||void 0===t?void 0:t.find((t=>t.id===e));return a?a.name:"Unknown"})(null===e||void 0===e?void 0:e.dataElement),":"),n.createElement(y.p,null," ",e.value)))))))})))),n.createElement("div",{className:r},n.createElement("a",{id:"dlink"}),n.createElement("div",{id:"report-table"},n.createElement(k.i,{className:U?o:u},n.createElement(g.S,null,null===P||void 0===P||null===(t=P.programTrackedEntityAttributes)||void 0===t?void 0:t.map((e=>{var t,a;return n.createElement(y.p,{key:null===e||void 0===e||null===(t=e.trackedEntityAttribute)||void 0===t?void 0:t.id,style:{whiteSpace:"nowrap"},className:s},n.createElement("b",null,null===e||void 0===e||null===(a=e.trackedEntityAttribute)||void 0===a?void 0:a.name))}))),n.createElement(g.S,null,null===P||void 0===P||null===(a=P.programTrackedEntityAttributes)||void 0===a?void 0:a.map((e=>{var t,a,l;return n.createElement(n.Fragment,{key:null===e||void 0===e||null===(t=e.trackedEntityAttribute)||void 0===t?void 0:t.id},n.createElement(y.p,{key:null===e||void 0===e||null===(a=e.trackedEntityAttribute)||void 0===a?void 0:a.id,style:{whiteSpace:"nowrap"},className:U?`${m} ${s}`:` ${s}`},n.createElement("input",{type:"text",placeholder:`Search ${null===e||void 0===e||null===(l=e.trackedEntityAttribute)||void 0===l?void 0:l.name}`,onChange:t=>{var a,n,l;return n=null===e||void 0===e||null===(a=e.trackedEntityAttribute)||void 0===a?void 0:a.id,l=t.target.value,void W((e=>({...e,[n]:l})))}})))}))),I?n.createElement("div",null,n.createElement(h.Z,null)):n.createElement(f.R,null,(()=>{const e=10*Y,t=e-10;if(void 0!==x){const a=x.filter((e=>Object.keys(B).every((t=>{const a=B[t],n=e.attributes.find((e=>e.attribute===t));return!a||n&&n.value.includes(a)})))).slice(t,e);return console.log("filteredData>>>>>",a),a.map(((e,t)=>{var a;return n.createElement(g.S,{key:t,className:i},null===P||void 0===P||null===(a=P.programTrackedEntityAttributes)||void 0===a?void 0:a.map((t=>{var a,l,r,i,o;console.log("ele>>>>>>>>>>",null===t||void 0===t||null===(a=t.trackedEntityAttribute)||void 0===a?void 0:a.id);const u=null===t||void 0===t||null===(l=t.trackedEntityAttribute)||void 0===l?void 0:l.id,d=e.attributes.find((e=>{var a;return e.attribute===(null===t||void 0===t||null===(a=t.trackedEntityAttribute)||void 0===a?void 0:a.id)}));console.log("foundAttribute>>>>",d);const c=e.trackedEntityInstance;return console.log("TrackID>>>",c),n.createElement(n.Fragment,null,"C3kyKVIuJiv"===u&&d&&d.value>=4?n.createElement(y.p,{key:null===t||void 0===t||null===(r=t.trackedEntityAttribute)||void 0===r?void 0:r.id,className:`${v} ${s}`},n.createElement("div",{onClick:()=>G({value:!0,id:c})},d?d.value:"")):"C3kyKVIuJiv"===u&&d&&d.value<=4?n.createElement(y.p,{key:null===t||void 0===t||null===(i=t.trackedEntityAttribute)||void 0===i?void 0:i.id,className:`${E} ${s}`},n.createElement("div",{onClick:()=>G({value:!0,id:c})},d?d.value:"")):n.createElement(y.p,{key:null===t||void 0===t||null===(o=t.trackedEntityAttribute)||void 0===o?void 0:o.id,className:s},n.createElement("div",{onClick:()=>G({value:!0,id:c})},d?d.value:"")))})))}))}return null})()))),n.createElement(b.Z,{activePage:Y,itemsCountPerPage:10,totalItemsCount:N,pageRangeDisplayed:5,onChange:e=>{Q(e)},itemClass:"page-item",linkClass:"page-link"}))))))};const N={me:{resource:"me"}};var D=()=>n.createElement("div",null,n.createElement(l.ZR,{query:N},(e=>{let{error:t,loading:a,data:l}=e;return t?n.createElement("span",null,"ERROR"):a?n.createElement("span",null,"..."):n.createElement(n.Fragment,null,n.createElement(C,null))})))}}]);
//# sourceMappingURL=app.a1f7dc79.chunk.js.map