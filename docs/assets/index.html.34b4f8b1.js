import{_ as i}from"./simplest_workflow.432b9354.js";import{_ as r,a as c}from"./section_menu_after_trigger.84cd8553.js";import{_ as l}from"./send_email_activity_modal.58f2ddcd.js";import{_ as p,r as d,o as h,c as u,a as e,b as t,t as m,d as s,e as o}from"./app.a442214b.js";const f="/core-user-dash-docs/assets/multiple_triggers.33394c8a.png",k="/core-user-dash-docs/assets/save_and_activate_wf_btns.f96896c1.png",w={},_={id:"page-title",tabindex:"-1"},v=e("a",{class:"header-anchor",href:"#page-title","aria-hidden":"true"},"#",-1),g=o('<p>Workflows (or Campaigns) is an important part of the core-user-dash project. Its functionality allows the users (tenants) create some kind of schemas which then could be executed.</p><p>Workflow allows the users to automate some processes and actions under own leads (clients or contacts). The simplest workflow can look like this:</p><p><img src="'+i+'" alt="Simple Workflow"></p><h2 id="workflow-sections-activities" tabindex="-1"><a class="header-anchor" href="#workflow-sections-activities" aria-hidden="true">#</a> Workflow Sections (Activities)</h2><p>On the image above you can see typical example of the workflow which contains 4 items - <strong>Activities</strong>. First and last - are automatically generated sections, next statements are valid for them:</p><ul><li>Workflow always starts from <strong>Start Section</strong></li><li>Each workflow branch (current workflow has only one branch) must be ended with <strong>Finish Section</strong></li></ul><p>Second one is a trigger section or just <strong>Trigger</strong> - this type of sections usually begins the workflow, we can say that &quot;Any workflow starts its execution form Trigger&quot;. The Workflow can have multiple triggers at the beginning, which means that list of the actions which laying under triggers can be executed multiple times depending on trigger event:</p><p><img src="'+f+'" alt="Simple Workflow"></p><p>Third section is an action section or just <strong>Action</strong>. Actions can do some work for your leads, for example &quot;Send an Email&quot; or &quot;Change Lead Status&quot; and many other things. Usually Actions on the Workflows stands vertically when Triggers mostly horizontally.</p><p>We&#39;ve just seen 4 of the 8 section roles:</p><ul><li>Start</li><li>Finish</li><li>Trigger</li><li>Action</li></ul>',11),y=t("Check the full list of sections and their roles: "),b={href:"/workflows/sections",target:"_blank",rel:"noopener noreferrer"},S=t("Workflow sections"),x=e("h2",{id:"connections",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#connections","aria-hidden":"true"},"#"),t(" Connections")],-1),A=t("Second important entity in workflow is a "),q=e("strong",null,"Connection",-1),W=t('. Connection matches two neighbour Activities visually you can see them as lines between sections, but technically they are more complicated. If we are talking about huge workflow schemas with lots of branches or with multiple triggers in it, then we must use special "transitional" actions - '),j=e("a",{href:"workflow/sections#Join"},"Join",-1),C=t(" and "),T=e("a",{href:"workflow/sections#Fork"},"Fork",-1),I=t(", they allow us to connect multiple sections to a single and vice versa single section to multiple. See detailed description of the "),E={href:"/workflows/connections",target:"_blank",rel:"noopener noreferrer"},F=t("Connections"),M=e("h2",{id:"technical-side-of-the-workflow",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#technical-side-of-the-workflow","aria-hidden":"true"},"#"),t(" Technical side of the workflow")],-1),B=t("We already know that two important entities of any workflow are "),U={href:"/workflows/connections",target:"_blank",rel:"noopener noreferrer"},L=t("Connection"),N=t(" and "),O={href:"/workflows/sections",target:"_blank",rel:"noopener noreferrer"},V=t("Activity"),J=t(" but how it is working under the hood? Technically Connection and Activity are simple JS objects with number of properties. Connection object always have defined properties:"),$=o(`<div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> connection <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">sourceActivityId</span><span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token comment">// id of &quot;from&quot; activity (uuid)</span>
    <span class="token literal-property property">destinationActivityId</span><span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token comment">// id of &quot;to&quot; activity (uuid)</span>
    <span class="token literal-property property">outcome</span><span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token comment">// id of the branch (uuid, and null if a single branch)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>As you can see connection is pretty simple object and displays destination and source activities information.</p><p>Activity has a different structure and must contain all the information that needed for correct rendering of the section and making connections &quot;from&quot; and &quot;to&quot; its section.</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> activity <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token comment">// uuidv</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token comment">// activity name from the &quot;constants/canvas/activities&quot;,</span>
    <span class="token literal-property property">state</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// contains all the information for specific activity that must be saved on the back-end side</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
        <span class="token literal-property property">role</span><span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token comment">// activity role form the &quot;constants/canvas/sectionRoles&quot;</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// contains visual parts of the section that must be rendered on the UI (not sends to the back-end)</span>
        <span class="token literal-property property">primaryBtn</span><span class="token operator">:</span> Object<span class="token punctuation">,</span>
        <span class="token literal-property property">nextSectionStrokeLeft</span><span class="token operator">:</span> Object<span class="token punctuation">,</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),z=t("So as you may understand workflows is a number of activities and connections between them, so the Backend expects these two arrays from us. There are also few layers on the UI that are doing some preparations before we see beautiful schema in our UI. Check more detailed description of the "),D={href:"/workflows/technical",target:"_blank",rel:"noopener noreferrer"},R=t("Workflow technical side"),G=e("h2",{id:"creating-a-new-section",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#creating-a-new-section","aria-hidden":"true"},"#"),t(" Creating a new Section")],-1),H=t("By clicking "),K=e("img",{src:r,alt:"Create Section"},null,-1),P=t(" button you will open "),Q={href:"/workflows/sectionMenu",target:"_blank",rel:"noopener noreferrer"},X=t("Section Menu"),Y=t(', this menu shows you the list of available sections at the current step. For example after "Trigger" usually stands "Action" and the Section Menu will look like this:'),Z=e("p",null,[e("img",{src:c,alt:"Section Menu after trigger"})],-1),ee=e("h2",{id:"section-modal",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#section-modal","aria-hidden":"true"},"#"),t(" Section Modal")],-1),te=t("If you try to select some Activity form the section menu the "),ne={href:"/workflows/sectionModals",target:"_blank",rel:"noopener noreferrer"},se=t("Section Modal"),oe=t(" would be opened. Each Activity has its own section modal, all the modals laying in "),ae=e("code",null,"src/views/workflow/sections",-1),ie=t(" directory, they are split by section roles."),re=o('<p>The modals for any Section has similar structure, it is a Form with number of inputs. For example &quot;Send Email Activity&quot; modal:</p><p><img src="'+l+'" alt="Send Email Activity modal"></p><h2 id="workflow-save-and-activate" tabindex="-1"><a class="header-anchor" href="#workflow-save-and-activate" aria-hidden="true">#</a> Workflow Save and Activate</h2><p>The workflow can be saved in two variants: <strong>Active</strong> and <strong>Inactive</strong>. Use next buttons in the navbar on the top of the page for workflows state manipulation:</p><p><img src="'+k+'" alt="Workflow Activate and Save buttons"></p><p>When workflow is activated it means that your workflow starts executing which in turn means that all the start triggers in your workflows starts waiting for their events (for example new lead appear in the system), and if the event occurs then other parts of workflows starts their work.</p><p>Otherwise, inactive workflows would never fire any Activity till you activate it.</p><blockquote><p>In case if your Workflow is already active you are still able to edit it, but you have to understand that, if your workflow has already been started its execution for some users or leads, you will not see your changes in execution results for them, you will be able to use your edits only for new executions.</p></blockquote>',8);function ce(a,le){const n=d("ExternalLinkIcon");return h(),u("div",null,[e("h1",_,[v,t(" "+m(a.$page.title),1)]),g,e("p",null,[y,e("a",b,[S,s(n)])]),x,e("p",null,[A,q,W,j,C,T,I,e("a",E,[F,s(n)])]),M,e("p",null,[B,e("a",U,[L,s(n)]),N,e("a",O,[V,s(n)]),J]),$,e("p",null,[z,e("a",D,[R,s(n)])]),G,e("p",null,[H,K,P,e("a",Q,[X,s(n)]),Y]),Z,ee,e("p",null,[te,e("a",ne,[se,s(n)]),oe,ae,ie]),re])}const me=p(w,[["render",ce],["__file","index.html.vue"]]);export{me as default};
