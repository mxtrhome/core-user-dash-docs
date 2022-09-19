---
title: Workflow Sections
---

# {{ $page.title }}

Section is a part (step) of the workflow. Each sections in the workflow plays their role, for example Sending an Email has
an "action" role and "Lead Status changes" has a "trigger" role. But it is not the full list of the Sections and Their Roles.

List of the existing Section Roles (`src/constants/canvas/sectionRoles.js`):
- **start** - Start section role, 
- **action** - Action sections role, 
- **trigger** - Role for trigger sections, 
- **fork** - System role it uses for sections branching, 
- **join** - Another system role, uses for joining section into a single branch, 
- **finish** - Finish section role, 
- **delay** - Timer section role, 
- **condition** - True/False statements section role,

List of the existing Section types (Activities) (`src/constants/canvas/activities.js`):
- [Start](workflow/sections#start),
- [Join](workflow/sections#start),
- [EmailClickTrigger](workflow/sections#start),
- [EmailVisitTrigger](workflow/sections#start),
- [EmailOpenTrigger](workflow/sections#start),
- [LeadCreatedTrigger](workflow/sections#start),
- [LeadMovedToTenantTrigger](workflow/sections#start),
- [LeadCompareFieldTrigger](workflow/sections#start),
- [LeadOwnedByTrigger](workflow/sections#start),
- [LeadHasDateFieldTrigger](workflow/sections#start),
- [LeadStatusChangedTrigger](workflow/sections#start),
- [LeadAddedToListTrigger](workflow/sections#start),
- [LeadRemovedFromListTrigger](workflow/sections#start),
- [SendEmailActivity](workflow/sections#start),
- [SendNotificationEmailActivity](workflow/sections#start),
- [LeadAddToListActivity](workflow/sections#start),
- [LeadRemoveFromListActivity](workflow/sections#start),
- [LeadChangeFieldValueActivity](workflow/sections#start),
- [LeadChangeStatusActivity](workflow/sections#start),
- [TimerEvent](workflow/sections#start),
- [LeadCompareFieldActivity](workflow/sections#start),

We have next mapping for **Sections** and their **roles** (`src/constants/canvas/sectionRoles.js`):
```javascript
const rolesActivitiesMap = {
    [sectionRoles.start]: [activityTypes.Start],
    [sectionRoles.fork]: [activityTypes.Fork],
    [sectionRoles.join]: [activityTypes.Join],
    [sectionRoles.finish]: [activityTypes.Finish],
    [sectionRoles.delay]: [activityTypes.TimerEvent],
    [sectionRoles.action]: [
        activityTypes.SendEmailActivity,
        activityTypes.SendNotificationEmailActivity,
        activityTypes.LeadAddToListActivity,
        activityTypes.LeadRemoveFromListActivity,
        activityTypes.LeadChangeFieldValueActivity,
        activityTypes.LeadChangeStatusActivity,
    ],
    [sectionRoles.trigger]: [
        activityTypes.EmailClickTrigger,
        activityTypes.EmailVisitTrigger,
        activityTypes.EmailOpenTrigger,
        activityTypes.LeadCompareFieldTrigger,
        activityTypes.LeadOwnedByTrigger,
        activityTypes.LeadHasDateFieldTrigger,
        activityTypes.LeadStatusChangedTrigger,
        activityTypes.LeadAddedToListTrigger,
        activityTypes.LeadRemovedFromListTrigger,
        activityTypes.LeadCreatedTrigger,
        activityTypes.LeadMovedToTenantTrigger,
    ],
    [sectionRoles.condition]: [activityTypes.LeadCompareFieldActivity]
}
```


