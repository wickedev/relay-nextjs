(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{69:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return c})),r.d(t,"toc",(function(){return l})),r.d(t,"default",(function(){return u}));var n=r(3),o=r(7),a=(r(0),r(88)),i={title:"What is relay-nextjs",slug:"/"},c={unversionedId:"what-why",id:"what-why",isDocsHomePage:!1,title:"What is relay-nextjs",description:"relay-nextjs is a bridge between Next.js and",source:"@site/docs/what-why.md",slug:"/",permalink:"/relay-nextjs/docs/",editUrl:"https://github.com/RevereCRE/relay-nextjs/edit/master/website/docs/what-why.md",version:"current",sidebar:"docs",next:{title:"Prerequisites",permalink:"/relay-nextjs/docs/prerequisites"}},l=[],s={toc:l};function u(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},s,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"relay-nextjs")," is a bridge between ",Object(a.b)("a",{parentName:"p",href:"https://nextjs.org/"},"Next.js")," and\n",Object(a.b)("a",{parentName:"p",href:"https://relay.dev"},"Relay"),". Because these are two highly opinionated frameworks\nit can be difficult to get them to work together. This library solves that problem\nby glueing the two together using techniques that require low-level knowledge of\nboth frameworks."),Object(a.b)("p",null,"Basically we wrote the glue code for you!"),Object(a.b)("p",null,"This library has several goals:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Use Relay with no modifications, be able to copy code exactly as is from the docs"),Object(a.b)("li",{parentName:"ul"},"Use only documented public APIs of React, Relay, and Next.js to prevent lock-in"),Object(a.b)("li",{parentName:"ul"},"Does not require modifications to pages not using Relay"),Object(a.b)("li",{parentName:"ul"},"Incremental adoption across your app")))}u.isMDXComponent=!0},88:function(e,t,r){"use strict";r.d(t,"a",(function(){return p})),r.d(t,"b",(function(){return y}));var n=r(0),o=r.n(n);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=o.a.createContext({}),u=function(e){var t=o.a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},p=function(e){var t=u(e.components);return o.a.createElement(s.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},f=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,i=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=u(r),f=n,y=p["".concat(i,".").concat(f)]||p[f]||b[f]||a;return r?o.a.createElement(y,c(c({ref:t},s),{},{components:r})):o.a.createElement(y,c({ref:t},s))}));function y(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,i=new Array(a);i[0]=f;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:n,i[1]=c;for(var s=2;s<a;s++)i[s]=r[s];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,r)}f.displayName="MDXCreateElement"}}]);