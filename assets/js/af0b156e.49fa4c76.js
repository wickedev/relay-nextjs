(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{79:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return i})),a.d(t,"metadata",(function(){return o})),a.d(t,"toc",(function(){return c})),a.d(t,"default",(function(){return l}));var r=a(3),s=a(7),n=(a(0),a(90)),i={title:"Prerequisites"},o={unversionedId:"prerequisites",id:"prerequisites",isDocsHomePage:!1,title:"Prerequisites",description:"First check out the Relay docs and the Relay prerequisites.",source:"@site/docs/prerequisites.md",slug:"/prerequisites",permalink:"/relay-nextjs/docs/prerequisites",editUrl:"https://github.com/RevereCRE/relay-nextjs/edit/master/website/docs/prerequisites.md",version:"current",sidebar:"docs",previous:{title:"What is relay-nextjs",permalink:"/relay-nextjs/docs/"},next:{title:"Installation and Setup",permalink:"/relay-nextjs/docs/installation-and-setup"}},c=[{value:"A Next.js project",id:"a-nextjs-project",children:[]},{value:"A GraphQL API and Schema",id:"a-graphql-api-and-schema",children:[]}],p={toc:c};function l(e){var t=e.components,a=Object(s.a)(e,["components"]);return Object(n.b)("wrapper",Object(r.a)({},p,a,{components:t,mdxType:"MDXLayout"}),Object(n.b)("p",null,"First check out the ",Object(n.b)("a",{parentName:"p",href:"https://relay.dev"},"Relay docs")," and the ",Object(n.b)("a",{parentName:"p",href:"https://relay.dev/docs/getting-started/prerequisites/"},"Relay prerequisites"),".\nThen make sure you are ready with each of the following."),Object(n.b)("h2",{id:"a-nextjs-project"},"A Next.js project"),Object(n.b)("p",null,Object(n.b)("inlineCode",{parentName:"p"},"relay-nextjs")," is meant to integrate the Relay framework with Next.js.\nIf you're not using Next.js you don't need this project.\nThe rest of this guide will assume your project is using ",Object(n.b)("strong",{parentName:"p"},"TypeScript")," and\nthe page to your pages is ",Object(n.b)("inlineCode",{parentName:"p"},"src/pages"),"."),Object(n.b)("p",null,"Relay generates artifacts in a single directory. To avoid traversing directories as\nmuch it will be helpful to configure TypeScript with the following ",Object(n.b)("inlineCode",{parentName:"p"},"baseUrl"),":"),Object(n.b)("pre",null,Object(n.b)("code",{parentName:"pre",className:"language-json"},'// tsconfig.json\n{\n  "compilerOptions": {\n    "baseUrl": "./src"\n  }\n}\n')),Object(n.b)("h2",{id:"a-graphql-api-and-schema"},"A GraphQL API and Schema"),Object(n.b)("p",null,"Relay uses a GraphQL API to fetch data and compiles queries against a GraphQL schema.\nThis guide assumes a local schema (a ",Object(n.b)("inlineCode",{parentName:"p"},".graphql")," file). To set up Relay with a remote schema please see the\n",Object(n.b)("a",{parentName:"p",href:"https://relay.dev/docs/guides/compiler/"},"Relay Compiler docs"),"."))}l.isMDXComponent=!0}}]);