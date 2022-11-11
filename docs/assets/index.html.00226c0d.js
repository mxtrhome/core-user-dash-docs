import{_ as a,r as d,o as r,c,a as e,b as t,t as u,d as n,w as i,e as h}from"./app.18e07e69.js";const m={},v={id:"page-title",tabindex:"-1"},_=e("a",{class:"header-anchor",href:"#page-title","aria-hidden":"true"},"#",-1),b=t("This documentation is created in order to support, at first place, Front-end developers to understand the UI system of the "),p={href:"https://www.mxtrautomation.com/",target:"_blank",rel:"noopener noreferrer"},f=t('"MXTR Core user dashboard"'),w=t(" project. Here you can find description of the core components, code examples and important logic peaces explanation."),k=h(`<h2 id="technical-stack" tabindex="-1"><a class="header-anchor" href="#technical-stack" aria-hidden="true">#</a> Technical stack</h2><table><thead><tr><th>Technology</th><th>Description</th></tr></thead><tbody><tr><td>JavaScript/TypeScript</td><td>Language</td></tr><tr><td>Vue.js (2.6.x)</td><td>Core framework</td></tr><tr><td>Jest</td><td>Testing framework</td></tr><tr><td>Eslint</td><td>Code checking</td></tr><tr><td>Vuetify</td><td>Ui components framework</td></tr><tr><td>Vuex</td><td>Reactive state management library</td></tr><tr><td>Vue Router</td><td>Page router</td></tr><tr><td>Scss/Sass/Stylus</td><td>Css preprocessors</td></tr></tbody></table><h2 id="file-system" tabindex="-1"><a class="header-anchor" href="#file-system" aria-hidden="true">#</a> File System</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u2514\u2500 src
   \u251C\u2500 api
   \u2502  \u2514\u2500 loginAPI.js
   \u251C\u2500 assets
   \u251C\u2500 classes
   \u251C\u2500 common
   \u251C\u2500 components
   \u251C\u2500 constants
   \u251C\u2500 development
   \u251C\u2500 helpers
   \u251C\u2500 layouts
   \u251C\u2500 mixins
   \u251C\u2500 plugins
   \u251C\u2500 sass
   \u251C\u2500 store
   \u2502  \u251C\u2500 modules
   \u2502  \u2514\u2500 index.js
   \u251C\u2500 views
   \u2502  \u251C\u2500 admin
   \u2502  \u251C\u2500 dashboard
   \u2502  \u251C\u2500 workflow
   \u2502  \u2514\u2500 ...
   \u251C\u2500 App.vue
   \u251C\u2500 globalComponents.js
   \u251C\u2500 main.ts
   \u2514\u2500 router.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docs-contents" tabindex="-1"><a class="header-anchor" href="#docs-contents" aria-hidden="true">#</a> Docs contents</h2>`,5),x=e("a",{href:"./workflows"},"Workflow",-1),g=t("Activities (Sections)"),y=t("Connections"),S=t("Section Modals"),C=t("Section Menu"),V=t("Workflow under the hood"),L=e("li",null,[e("a",{href:"./email-editor"},"Email Editor")],-1),T=e("li",null,[e("a",{href:"./lead-lists"},"Lead Lists")],-1);function j(o,E){const l=d("ExternalLinkIcon"),s=d("RouterLink");return r(),c("div",null,[e("h1",v,[_,t(" "+u(o.$page.title),1)]),e("p",null,[b,e("a",p,[f,n(l)]),w]),k,e("ul",null,[e("li",null,[x,e("ul",null,[e("li",null,[n(s,{to:"/workflows/sections.html"},{default:i(()=>[g]),_:1})]),e("li",null,[n(s,{to:"/workflows/connections.html"},{default:i(()=>[y]),_:1})]),e("li",null,[n(s,{to:"/workflows/sectionModals.html"},{default:i(()=>[S]),_:1})]),e("li",null,[n(s,{to:"/workflows/sectionMenu.html"},{default:i(()=>[C]),_:1})]),e("li",null,[n(s,{to:"/workflows/technical.html"},{default:i(()=>[V]),_:1})])])]),L,T])])}const R=a(m,[["render",j],["__file","index.html.vue"]]);export{R as default};
