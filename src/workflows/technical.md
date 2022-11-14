---
title: Workflow under the hood
---

# {{ $page.title }}
Workflow is a number of "Action items" which can be executed one by one for concrete users (Leads). Workflows exist to automate
manual routine work. For example, we can set up sending email for each new created Lead in out platform, instead of doing
it manually. The "Schema" for such action can look like this:

![Simplest Workflow](./images/simplest_workflow.png)

Visually Workflow is a schema with "items" that is connected by vertical and horizontal "lines", practically "items" - 
is [Activities](./sections.md) and "lines" - is [Connections](./connections.md). In other words Workflow is a number of
Activities and Connections. Vuex store contains two corresponding states: `activities` and `connections` 
(`src/store/modules/workflow.js`), these states always contains actual information for current Workflow, so when user
saves the progress we grab data from `activities` and `connections` to pass it to the request.

## Render process
Let's review the process of Workflow rendering step by step. Let's imagine that we already have saved workflow and trying
to open it in "Edit Workflow Page".

First thing we do is request Workflow data using `workflowId` from the url (url for workflow is: `'/workflows/:id/edit'` 
in vue router - `src/router.js`). We do this request call in 'mounted' hook inside `Workflow.vue` component 
(`src/views/workflow/Workflow.vue`).

```javascript
...
    async mounted() {
        this.isLoading = true
        this.$store.commit('clearActivities') // clear for activities
        this.$store.commit('clearConnections') // clear for connections
    
        if (this.$route.params.id) {
            await this.$store.dispatch('getWorkflow', this.$route.params.id) // get workflow data
        }
    
        this.isLoading = false
        this.$nextTick(() => {
            this.renderWorkflow() // render workflow
            this.addWheelEvent() // add wheel event - scroll on canvas
        })
        window.addEventListener('resize', this.updateWorkflowContainerSize) // resize listenner
    },
...
```

Analysing code above we can highlight next important steps in "Workflow rendering" process: 
1. clear existing `activities` and `connections` states
2. request for workflow data by "id" via `getWorkflow` vuex action dispatch (set `activities` and `connections`)
3. call `renderWorkflow()` method of the `workflow.js` mixin
4. add wheel event on canvas
5. add resize window listener

With first and second steps everything is clear, but what happens inside `renderWorkflow`? 
Here we have a deal with "draw process" (which is described in ["Activity Draw process"](./sections.md#activity-draw-process)).
For now, it is enough to understand this process as "Draw a workflow schema based on current `activities` and 
`connections`".

Fourth step adds "scroll listener" on canvas container element to allow moving the "Workflow Schema" via mouse wheel or
touchpad.

The last "add resize window listener" step is needed to have a correct and actual sizes of the canvas element to make
correct calculation for positions and sizes of new created sections and for other items that draws inside canvas.

## Backed requirements
Except `connections` and `activities` the backend requires from us couple of other properties, lets review and explain
each of them.

The entity of the workflow ([Workflow definition](#workflow-instance-and-workflow-definition)) for typical Workflow can
look like this:
```javascript
const workflowDefinition = {
    activities: Array,
    connections: Array,
    description: String || null, // not using on the UI now
    folderId: "id", // id of the folder that this workflow is laying under
    id: "id", // workflow id
    isDisabled: Boolean, // workflow status, if "false" the workflow is not runnig (will not create any instances), just saves as template
    name: String, // workflow name
};
```
Exactly this entity we send and request from the api endpoints, usage of all Workflow endpoints you can find in 
`src/store/modules/workflow.js` directory.

## Workflow instance and Workflow definition
We already mentioned that workflow can have "Instance" and "Definition". 
So You already know that workflow executes for concrete Lead, it means that there is context for each execution of the
Workflow. 

Before Workflow starts its execution on the backend side we create a "copy" ("cast" or "mask") of the Workflow and runs
our activities based on this "copy" but not based on the original Workflow object. The "Original Object" here we call
**"Workflow Definition"** when "copy" is **"Workflow Instance"**

**Reasonable question here is**: why we need to create an Instance for each execution and not just use the Definition 
for it?

**To answer to this question** let's review next situation:

Imagine that you set up the workflow and activate it, let's say that our workflow starts its execution for some lead, and
exactly at this moment you decide to change something in your workflow. So if you made some minor changes then workflow
can finish its execution successfully, but what if changes was more significant, and new changes does not match with 
action that is executes right now, what then can happen with our lead? In second case we definitely got the error.

So to avoid such issues we need to create the "Workflow Instance" for each execution, that way our execution will work
based on workflow copy, that will never be changed during execution process.
s

Using **Workflow Instances** we are available to create some kind of "Log page" for each "Workflow Definition", this
"Logs" are available via next url: `'/workflows/:id/logs'` where `:id` is "Definition ID". This url corresponds to 
`WorkflowLogs.vue` component (`src/views/workflow/WorkflowLogs.vue`).