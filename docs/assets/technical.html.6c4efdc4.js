import{_ as c}from"./simplest_workflow.432b9354.js";import{_ as r,r as p,o as l,c as d,a as s,b as n,t as u,d as o,w as a,e as t}from"./app.18e07e69.js";const k={},h={id:"page-title",tabindex:"-1"},w=s("a",{class:"header-anchor",href:"#page-title","aria-hidden":"true"},"#",-1),f=s("p",null,'Workflow is a number of "Action items" which can be executed one by one for concrete users (Leads). Workflows exist to automate manual routine work. For example, we can set up sending email for each new created Lead in out platform, instead of doing it manually. The "Schema" for such action can look like this:',-1),m=s("p",null,[s("img",{src:c,alt:"Simplest Workflow"})],-1),v=n('Visually Workflow is a schema with "items" that is connected by vertical and horizontal "lines", practically "items" - is '),g=n("Activities"),_=n(' and "lines" - is '),y=n("Connections"),b=n(". In other words Workflow is a number of Activities and Connections. Vuex store contains two corresponding states: "),q=s("code",null,"activities",-1),W=n(" and "),x=s("code",null,"connections",-1),j=n(" ("),L=s("code",null,"src/store/modules/workflow.js",-1),I=n("), these states always contains actual information for current Workflow, so when user saves the progress we grab data from "),D=s("code",null,"activities",-1),S=n(" and "),z=s("code",null,"connections",-1),A=n(" to pass it to the request."),T=t(`<h2 id="render-process" tabindex="-1"><a class="header-anchor" href="#render-process" aria-hidden="true">#</a> Render process</h2><p>Let&#39;s review the process of Workflow rendering step by step. Let&#39;s imagine that we already have saved workflow and trying to open it in &quot;Edit Workflow Page&quot;.</p><p>First thing we do is request Workflow data using <code>workflowId</code> from the url (url for workflow is: <code>&#39;/workflows/:id/edit&#39;</code> in vue router - <code>src/router.js</code>). We do this request call in &#39;mounted&#39; hook inside <code>Workflow.vue</code> component (<code>src/views/workflow/Workflow.vue</code>).</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token operator">...</span>
    <span class="token keyword">async</span> <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>isLoading <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>$store<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">&#39;clearActivities&#39;</span><span class="token punctuation">)</span> <span class="token comment">// clear for activities</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>$store<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">&#39;clearConnections&#39;</span><span class="token punctuation">)</span> <span class="token comment">// clear for connections</span>
    
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$route<span class="token punctuation">.</span>params<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token string">&#39;getWorkflow&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$route<span class="token punctuation">.</span>params<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token comment">// get workflow data</span>
        <span class="token punctuation">}</span>
    
        <span class="token keyword">this</span><span class="token punctuation">.</span>isLoading <span class="token operator">=</span> <span class="token boolean">false</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$nextTick</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">renderWorkflow</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// render workflow</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">addWheelEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// add wheel event - scroll on canvas</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;resize&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>updateWorkflowContainerSize<span class="token punctuation">)</span> <span class="token comment">// resize listenner</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token operator">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Analysing code above we can highlight next important steps in &quot;Workflow rendering&quot; process:</p><ol><li>clear existing <code>activities</code> and <code>connections</code> states</li><li>request for workflow data by &quot;id&quot; via <code>getWorkflow</code> vuex action dispatch (set <code>activities</code> and <code>connections</code>)</li><li>call <code>renderWorkflow()</code> method of the <code>workflow.js</code> mixin</li><li>add wheel event on canvas</li><li>add resize window listener</li></ol>`,6),$=n("With first and second steps everything is clear, but what happens inside "),B=s("code",null,"renderWorkflow",-1),C=n('? Here we have a deal with "draw process" (which is described in '),E=n('"Activity Draw process"'),V=n('). For now, it is enough to understand this process as "Draw a workflow schema based on current '),F=s("code",null,"activities",-1),N=n(" and "),R=s("code",null,"connections",-1),O=n('".'),U=t(`<p>Fourth step adds &quot;scroll listener&quot; on canvas container element to allow moving the &quot;Workflow Schema&quot; via mouse wheel or touchpad.</p><p>The last &quot;add resize window listener&quot; step is needed to have a correct and actual sizes of the canvas element to make correct calculation for positions and sizes of new created sections and for other items that draws inside canvas.</p><h2 id="backed-requirements" tabindex="-1"><a class="header-anchor" href="#backed-requirements" aria-hidden="true">#</a> Backed requirements</h2><p>Except <code>connections</code> and <code>activities</code> the backend requires from us couple of other properties, lets review and explain each of them.</p><p>The entity of the workflow (<a href="#workflow-instance-and-workflow-definition">Workflow definition</a>) for typical Workflow can look like this:</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> workflowDefinition <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">activities</span><span class="token operator">:</span> Array<span class="token punctuation">,</span>
    <span class="token literal-property property">connections</span><span class="token operator">:</span> Array<span class="token punctuation">,</span>
    <span class="token literal-property property">description</span><span class="token operator">:</span> String <span class="token operator">||</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// not using on the UI now</span>
    <span class="token literal-property property">folderId</span><span class="token operator">:</span> <span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span> <span class="token comment">// id of the folder that this workflow is laying under</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span> <span class="token comment">// workflow id</span>
    <span class="token literal-property property">isDisabled</span><span class="token operator">:</span> Boolean<span class="token punctuation">,</span> <span class="token comment">// workflow status, if &quot;false&quot; the workflow is not runnig (will not create any instances), just saves as template</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token comment">// workflow name</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Exactly this entity we send and request from the api endpoints, usage of all Workflow endpoints you can find in <code>src/store/modules/workflow.js</code> directory.</p><h2 id="workflow-instance-and-workflow-definition" tabindex="-1"><a class="header-anchor" href="#workflow-instance-and-workflow-definition" aria-hidden="true">#</a> Workflow instance and Workflow definition</h2><p>We already mentioned that workflow can have &quot;Instance&quot; and &quot;Definition&quot;. So You already know that workflow executes for concrete Lead, it means that there is context for each execution of the Workflow.</p><p>Before Workflow starts its execution on the backend side we create a &quot;copy&quot; (&quot;cast&quot; or &quot;mask&quot;) of the Workflow and runs our activities based on this &quot;copy&quot; but not based on the original Workflow object. The &quot;Original Object&quot; here we call <strong>&quot;Workflow Definition&quot;</strong> when &quot;copy&quot; is <strong>&quot;Workflow Instance&quot;</strong></p><p><strong>Reasonable question here is</strong>: why we need to create an Instance for each execution and not just use the Definition for it?</p><p><strong>To answer to this question</strong> let&#39;s review next situation:</p><p>Imagine that you set up the workflow and activate it, let&#39;s say that our workflow starts its execution for some lead, and exactly at this moment you decide to change something in your workflow. So if you made some minor changes then workflow can finish its execution successfully, but what if changes was more significant, and new changes does not match with action that is executes right now, what then can happen with our lead? In second case we definitely got the error.</p><p>So to avoid such issues we need to create the &quot;Workflow Instance&quot; for each execution, that way our execution will work based on workflow copy, that will never be changed during execution process. s</p><p>Using <strong>Workflow Instances</strong> we are available to create some kind of &quot;Log page&quot; for each &quot;Workflow Definition&quot;, this &quot;Logs&quot; are available via next url: <code>&#39;/workflows/:id/logs&#39;</code> where <code>:id</code> is &quot;Definition ID&quot;. This url corresponds to <code>WorkflowLogs.vue</code> component (<code>src/views/workflow/WorkflowLogs.vue</code>).</p>`,15);function H(i,P){const e=p("RouterLink");return l(),d("div",null,[s("h1",h,[w,n(" "+u(i.$page.title),1)]),f,m,s("p",null,[v,o(e,{to:"/workflows/sections.html"},{default:a(()=>[g]),_:1}),_,o(e,{to:"/workflows/connections.html"},{default:a(()=>[y]),_:1}),b,q,W,x,j,L,I,D,S,z,A]),T,s("p",null,[$,B,C,o(e,{to:"/workflows/sections.html#activity-draw-process"},{default:a(()=>[E]),_:1}),V,F,N,R,O]),U])}const J=r(k,[["render",H],["__file","technical.html.vue"]]);export{J as default};
