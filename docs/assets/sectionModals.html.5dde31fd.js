import{_ as i}from"./lead_added_to_list_trigger.95beee8f.js";import{_ as c,a as l}from"./section_menu_after_trigger.84cd8553.js";import{_ as u,r as d,o as r,c as k,a as s,b as n,t as v,d as t,w as e,e as o}from"./app.a442214b.js";const m="/core-user-dash-docs/assets/edit_section_btn.769d2ad1.png",h={},b={id:"page-title",tabindex:"-1"},_=s("a",{class:"header-anchor",href:"#page-title","aria-hidden":"true"},"#",-1),w=o('<p>Each workflow section has its own &quot;modal&quot;, except sections without visual part (<a href="#join">Join</a> and <a href="#fork">Fork</a>) and automatically generated sections (<a href="#start">Start</a>, <a href="#finish">Finish</a>). For example lets look onto <a href="#leadaddedtolisttrigger">LeadAddedToListTrigger</a>, it has next modal:</p><p><img src="'+i+'" alt="Lead added to list trigger"></p><p>Usually modal contains section name and form controls that allows you to set up this section. As we said previously sections has its modals, so all these modals has own components they are split by role in separate folders, all of them you can find in <code>views/workflow/sections</code> directory.</p>',3),y=n("Modal can be opened in two modes: "),g=s("a",{href:"#edit-mode"},'"edit"',-1),f=n(" and "),q=s("a",{href:"#create-mode"},'"create"',-1),L=n(" section, as you can see using modal we can set "),x=n("activities data"),S=n(' that can be saved into backend when user press "Save" button.'),M=o('<h2 id="create-mode" tabindex="-1"><a class="header-anchor" href="#create-mode" aria-hidden="true">#</a> Create mode</h2><p>By press <img src="'+c+'" alt="Create Section"> button (after section) you will open <a href="./sectionMenu">Section Menu</a>, this menu displays dynamic list of available sections that can be added after previous one.</p><p><img src="'+l+'" alt="Section Menu after trigger"></p><p>In &quot;create section mode&quot; all the field in the form would be empty or filled with default values.</p><h2 id="edit-mode" tabindex="-1"><a class="header-anchor" href="#edit-mode" aria-hidden="true">#</a> Edit mode</h2><p>To open modal in &quot;edit mode&quot; you need to press <img src="'+m+`" alt="Edit button"> button next to existing section. You will open the same component as for <a href="#create-mode">&quot;create&quot;</a> mode, with only difference: all fields would contain previously added data.</p><h2 id="modal-component" tabindex="-1"><a class="header-anchor" href="#modal-component" aria-hidden="true">#</a> Modal component</h2><p>As we mentioned above all the modal component laying in <code>views/workflow/sections</code> directory. Let&#39;s look on the typical example of the component to understand how it is working, the modal for <a href="#leadaddedtolisttrigger">LeadAddedToListTrigger</a></p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span>mapGetters<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vuex&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>activityTypes<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@/constants/canvas/activities&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>sectionRoles<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@/constants/canvas/sectionRoles&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>sectionModal<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@/mixins/workflow/sectionModal&quot;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;LeadAddedToListTrigger&quot;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">mixins</span><span class="token operator">:</span> <span class="token punctuation">[</span>sectionModal<span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span><span class="token function">mapGetters</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
      <span class="token string">&#39;leadLists&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">data</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">selectedLeadList</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token literal-property property">leadListsLoading</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">handleClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">&#39;submit&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">type</span><span class="token operator">:</span> activityTypes<span class="token punctuation">.</span>LeadAddedToListTrigger<span class="token punctuation">,</span>
          <span class="token literal-property property">state</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">role</span><span class="token operator">:</span> sectionRoles<span class="token punctuation">.</span>trigger<span class="token punctuation">,</span>
            <span class="token literal-property property">displayName</span><span class="token operator">:</span> <span class="token string">&#39;Lead Added To List&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">LeadListId</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>selectedLeadList<span class="token punctuation">.</span>id<span class="token punctuation">,</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>selectedLeadList<span class="token punctuation">.</span>name<span class="token punctuation">,</span>
            <span class="token literal-property property">list</span><span class="token operator">:</span> <span class="token punctuation">[</span>
              <span class="token punctuation">{</span>
                <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;List&#39;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>selectedLeadList<span class="token punctuation">.</span>name
              <span class="token punctuation">}</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">required</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>value<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token string">&#39;Required field&#39;</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>sectionEdit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span> LeadListId<span class="token punctuation">,</span> name <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>sectionEdit<span class="token punctuation">.</span>state

      <span class="token keyword">this</span><span class="token punctuation">.</span>selectedLeadList <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">id</span><span class="token operator">:</span> LeadListId<span class="token punctuation">,</span>
        name<span class="token punctuation">,</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>leadListsLoading <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>$store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token string">&#39;getLeadLists&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>leadListsLoading <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>As you can see from the <code>mounted</code> hook code, switching between &quot;edit&quot; and &quot;create&quot; modes depends on <code>&#39;sectionEdit&#39;</code> vuex state, we can say that we are in &quot;edit&quot; mode when <code>&#39;sectionEdit&#39;</code> vuex state has some data. So we can make a conclusion that press on <a href="#create-mode">&quot;Create section button&quot;</a> just opens modal, when press <a href="#create-mode">&quot;Edit section button&quot;</a> must also fill the <code>&#39;sectionEdit&#39;</code> state with corresponding section data. Below we will study where and how it happens.</p>`,10),E=n("One more important thing here is "),T=s("code",null,"handleClick",-1),C=n(" method. Each modal implements this method, as you can see there we emmit "),A=s("code",null,"'submit'",-1),R=n(" event and add as a second parameter object with data. This object must contain "),B=s("code",null,"template",-1),F=n(" property with all the data for "),j=n("activities data"),V=n(". So as you may understand all we need form this component is to collect data from user inputs and post this data by trigger "),$=s("code",null,"'submit'",-1),I=n(" event. Below we will see where we sign on this "),N=s("code",null,"'submit'",-1),W=n(" event, to understand the flow of "),G=s("a",{href:"#modal-rendering-process"},"Modal rendering",-1),D=o(`<h2 id="modal-rendering-process" tabindex="-1"><a class="header-anchor" href="#modal-rendering-process" aria-hidden="true">#</a> Modal rendering process</h2><p>Firstly lets see where we call all these &quot;Section modals&quot; components. Imports for these components are added in only one place: <code>Workflow.vue</code> (<code>views/workflows</code> directory). But in the template you do not find any usage of it, because here we are having a deal with &quot;dynamic&quot; components.</p><p>Listening for clicks on Sections buttons you can find in the next code:</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code>  ...
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>SectionsGrid</span>
                <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>getSections.length<span class="token punctuation">&quot;</span></span>
                <span class="token attr-name">:movement</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>movement<span class="token punctuation">&quot;</span></span>
                <span class="token attr-name">@start</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>handleStart<span class="token punctuation">&quot;</span></span>
                <span class="token attr-name">@email</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>openBeeEmailEditor<span class="token punctuation">&quot;</span></span>
                <span class="token attr-name">@add</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>onAddSection<span class="token punctuation">&quot;</span></span>
                <span class="token attr-name">@edit</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>editSection($event)<span class="token punctuation">&quot;</span></span>
                <span class="token attr-name">@finish</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>saveWorkflow<span class="token punctuation">&quot;</span></span>
                <span class="token attr-name">@remove</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>initRemoveSection<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
  ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),H=n("What "),J=s("code",null,"SectionsGrid",-1),O=n(" is responds for you can understand reading, "),U=n("Activity draw process"),Y=n(" For now it is enough to know that this component responds for Sections rendering. Let's look on this line from code above "),z=s("code",null,'@edit="editSection($event)"',-1),K=n(' here we sign to "edit" event (press on edit button next to section) with '),P=s("code",null,"editSection",-1),Q=n(" method."),X=o(`<p>Let&#39;s check code of <code>editSection</code> method (<code>mixins/workflow/workflow.js</code>):</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code>...
        editSection(payload) {
            const section = payload.value

            this.dialog = true
            this.currentModal = {
                value: section.type,
                width: &#39;700&#39;
            }

            this.$store.commit(&#39;setSectionEdit&#39;, section)
        },
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Here we have &#39;setSectionEdit&#39; commit, this is actually the place where we set the <code>&#39;sectionEdit&#39;</code> vuex state and our &quot;Section modal&quot; understands that we are in &quot;Edit section mode&quot;.</p>`,3),Z=n("Second thing here is setting "),nn=s("code",null,"currentModal",-1),sn=n(" state and its "),an=s("code",null,"value",-1),tn=n(" prop, as you can see the value is a "),en=n('"type"'),on=n(' of the section. As you remember we have a modal for each "section type", and now we can use this "section type" with "Vue Dynamic components" to render correct modal, in '),pn=s("code",null,"Workflow.vue",-1),cn=n(" template we have next call for dynamic component:"),ln=o(`<div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code>...
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>v-dialog</span>
            <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>dialog<span class="token punctuation">&quot;</span></span>
            <span class="token attr-name">:attach</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>findElement(&#39;workflowMainViewContainer&#39;)<span class="token punctuation">&quot;</span></span>
            <span class="token attr-name">overlay-opacity</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>0<span class="token punctuation">&quot;</span></span>
            <span class="token attr-name">absolute</span>
            <span class="token attr-name">:width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>currentModal.width<span class="token punctuation">&quot;</span></span>
            <span class="token attr-name"><span class="token namespace">@click:</span>outside</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>handleModalClose<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span>
              <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>currentModal.value<span class="token punctuation">&quot;</span></span>
              <span class="token attr-name">@reset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>handleWorkflowReset<span class="token punctuation">&quot;</span></span>
              <span class="token attr-name">@cancel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>handleModalClose<span class="token punctuation">&quot;</span></span>
              <span class="token attr-name">@submit</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>submitCurrentModal<span class="token punctuation">&quot;</span></span>
              <span class="token attr-name">@remove</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>handleRemoveFromModal<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>v-dialog</span><span class="token punctuation">&gt;</span></span>
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>From this line <code>@submit=&quot;submitCurrentModal&quot;</code> we understand that this is the place where we sign to our <code>submit</code> event from &quot;Section modal&quot;</p>`,2),un=n("This line "),dn=s("code",null,':is="currentModal.value"',-1),rn=n(" matches selected section "),kn=n('"type"'),vn=n(" with corresponding modal from imports");function mn(p,hn){const a=d("RouterLink");return r(),k("div",null,[s("h1",b,[_,n(" "+v(p.$page.title),1)]),w,s("p",null,[y,g,f,q,L,t(a,{to:"/workflows/sections.html#activity-entity"},{default:e(()=>[x]),_:1}),S]),M,s("p",null,[E,T,C,A,R,B,F,t(a,{to:"/workflows/sections.html#activity-entity"},{default:e(()=>[j]),_:1}),V,$,I,N,W,G]),D,s("p",null,[H,J,O,t(a,{to:"/workflows/sections.html#activity-draw-process"},{default:e(()=>[U]),_:1}),Y,z,K,P,Q]),X,s("p",null,[Z,nn,sn,an,tn,t(a,{to:"/workflows/sections.html#section-types"},{default:e(()=>[en]),_:1}),on,pn,cn]),ln,s("p",null,[un,dn,rn,t(a,{to:"/workflows/sections.html#section-types"},{default:e(()=>[kn]),_:1}),vn])])}const yn=u(h,[["render",mn],["__file","sectionModals.html.vue"]]);export{yn as default};
