(this["webpackJsonpmovie-search"]=this["webpackJsonpmovie-search"]||[]).push([[0],{20:function(t,e,c){},21:function(t,e,c){},27:function(t,e,c){"use strict";c.r(e);var n=c(0),a=c.n(n),r=c(7),s=c.n(r),o=(c(20),c(5)),i=c(15),j=c(14),l=c(12),d=(c(21),c(1));var h=function(){var t=Object(n.useState)(""),e=Object(o.a)(t,2),c=e[0],a=e[1],r=Object(n.useState)([]),s=Object(o.a)(r,2),h=s[0],b=s[1],u=Object(n.useState)(!1),O=Object(o.a)(u,2),x=O[0],m=O[1],p=Object(n.useState)("0"),f=Object(o.a)(p,2),v=f[0],g=f[1],N=Object(n.useState)(""),S=Object(o.a)(N,2),w=S[0],y=S[1],R=Object(n.useState)(""),D=Object(o.a)(R,2),C=D[0],E=D[1];function F(t){if(y(t.Error),t.Error)throw Error(t.Error);if(!t.ok)throw Error(t.statusText);return t}var L=function(t){m(!0);var e=[];t.map((function(t){fetch("https://www.omdbapi.com/?i=".concat(t,"&apikey=").concat("f8abb468")).then(F).then((function(t){return t.json()})).then((function(t){e.push(t)})).catch((function(t){return console.log(t)}))})),setTimeout((function(){m(!1),b(e),console.log(e),0===e.length||"False"===e[0].Response?(E("no results found"),g("0")):g(e.length)}),3e3)},T=h?h.map((function(t,e){var c=t.Runtime?t.Runtime.substring(0,t.Runtime.length-3):null,n=t.Released?function(t){var e=t.split(" "),c=e[1],n=e[0],a=e[2];return"Jan"===c?"".concat(c="1","/").concat(n,"/").concat(a):"Feb"===c?"".concat(c="2","/").concat(n,"/").concat(a):"Mar"===c?"".concat(c="3","/").concat(n,"/").concat(a):"Apr"===c?"".concat(c="4","/").concat(n,"/").concat(a):"May"===c?"".concat(c="5","/").concat(n,"/").concat(a):"Jun"===c?"".concat(c="6","/").concat(n,"/").concat(a):"Jul"===c?"".concat(c="7","/").concat(n,"/").concat(a):"Aug"===c?"".concat(c="8","/").concat(n,"/").concat(a):"Sep"===c?"".concat(c="9","/").concat(n,"/").concat(a):"Oct"===c?"".concat(c="10","/").concat(n,"/").concat(a):"Nov"===c?"".concat(c="11","/").concat(n,"/").concat(a):"Dec"===c?"".concat(c="12","/").concat(n,"/").concat(a):void 0}(t.Released):null;return Object(d.jsxs)("tr",{children:[Object(d.jsx)("td",{children:t.imdbID}),Object(d.jsx)("td",{children:t.Title}),Object(d.jsx)("td",{children:c}),Object(d.jsx)("td",{children:t.Year}),Object(d.jsx)("td",{children:t.Director}),Object(d.jsx)("td",{children:t.Actors}),Object(d.jsx)("td",{children:t.Poster}),Object(d.jsx)("td",{children:t.Language}),Object(d.jsx)("td",{children:t.Country}),Object(d.jsx)("td",{children:n})]},e)})):null;return Object(d.jsxs)("div",{className:"App",children:[Object(d.jsx)("div",{className:"form-wrapper",children:Object(d.jsxs)("form",{onSubmit:function(t){t.preventDefault(),E(""),y("");var e=c.split(";");L(e)},children:[Object(d.jsx)("input",{type:"text",onChange:function(t){a(t.target.value)}}),w?Object(d.jsx)(l.a,{variant:"danger",className:"alerts",children:w}):null,Object(d.jsx)("button",{type:"submit",className:"submit-button",children:"Search"}),Object(d.jsxs)("p",{children:["You searched for ",Object(d.jsx)("span",{className:"data-num",children:v}),Object(d.jsxs)("span",{children:["\xa0",1===v?"title":"titles"]})]})]})}),x?Object(d.jsx)("div",{className:"spinner-wrapper",children:Object(d.jsx)(j.a,{animation:"border",role:"status",children:Object(d.jsx)("span",{className:"visually-hidden",children:"Loading..."})})}):Object(d.jsxs)("div",{className:"table-container",children:[Object(d.jsxs)(i.a,{striped:!0,bordered:!0,hover:!0,size:"sm",responsive:!0,children:[Object(d.jsx)("thead",{children:Object(d.jsxs)("tr",{children:[Object(d.jsx)("th",{children:"IMDB ID"}),Object(d.jsx)("th",{children:"Title Name"}),Object(d.jsx)("th",{children:"Run time"}),Object(d.jsx)("th",{children:"Release year"}),Object(d.jsx)("th",{children:"Director name"}),Object(d.jsx)("th",{children:"Actors"}),Object(d.jsx)("th",{children:"Poster URL"}),Object(d.jsx)("th",{children:"Language"}),Object(d.jsx)("th",{children:"Country of origin"}),Object(d.jsx)("th",{children:"Release date"})]})}),Object(d.jsx)("tbody",{children:T})]}),C?Object(d.jsx)(l.a,{variant:"warning",className:"alerts",children:C}):null]})]})},b=function(t){t&&t instanceof Function&&c.e(3).then(c.bind(null,29)).then((function(e){var c=e.getCLS,n=e.getFID,a=e.getFCP,r=e.getLCP,s=e.getTTFB;c(t),n(t),a(t),r(t),s(t)}))};c(26);s.a.render(Object(d.jsx)(a.a.StrictMode,{children:Object(d.jsx)(h,{})}),document.getElementById("root")),b()}},[[27,1,2]]]);
//# sourceMappingURL=main.ffefe930.chunk.js.map