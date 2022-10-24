---
title: Workflow Sections (Activities)
---

# {{ $page.title }}

Section or Activity is a "part" (step) of the workflow. Each section in the workflow plays its role, for example 
Sending an Email has an "action" role and "Lead Status changed" has a "trigger" role. But it is not the full list of 
the Sections and Their Roles.

List of the existing Section Roles (`src/constants/canvas/sectionRoles.js`):
- **start** - Start section role
- **action** - Action sections role 
- **trigger** - Role for trigger sections
- **fork** - System role it uses for sections branching
- **join** - Another system role, uses for joining section into a single branch
- **finish** - Finish section role
- **delay** - Timer section role
- **condition** - True/False statements section role

List of the existing Section types (Activities) (`src/constants/canvas/activities.js`):
- [Start](workflow/sections#Start)
- [Join](workflow/sections#Join)
- [Fork](workflow/sections#Fork)
- [EmailClickTrigger](workflow/sections#EmailClickTrigger)
- [EmailVisitTrigger](workflow/sections#EmailVisitTrigger)
- [EmailOpenTrigger](workflow/sections#EmailOpenTrigger)
- [LeadCreatedTrigger](workflow/sections#LeadCreatedTrigger)
- [LeadMovedToTenantTrigger](workflow/sections#LeadMovedToTenantTrigger)
- [LeadCompareFieldTrigger](workflow/sections#LeadCompareFieldTrigger)
- [LeadOwnedByTrigger](workflow/sections#LeadOwnedByTrigger)
- [LeadHasDateFieldTrigger](workflow/sections#LeadHasDateFieldTrigger)
- [LeadStatusChangedTrigger](workflow/sections#LeadStatusChangedTrigger)
- [LeadAddedToListTrigger](workflow/sections#LeadAddedToListTrigger)
- [LeadRemovedFromListTrigger](workflow/sections#LeadRemovedFromListTrigger)
- [SendEmailActivity](workflow/sections#SendEmailActivity)
- [SendNotificationEmailActivity](workflow/sections#SendNotificationEmailActivity)
- [LeadAddToListActivity](workflow/sections#LeadAddToListActivity)
- [LeadRemoveFromListActivity](workflow/sections#LeadRemoveFromListActivity)
- [LeadChangeFieldValueActivity](workflow/sections#LeadChangeFieldValueActivity)
- [LeadChangeStatusActivity](workflow/sections#LeadChangeStatusActivity)
- [TimerEvent](workflow/sections#TimerEvent)
- [LeadCompareFieldActivity](workflow/sections#LeadCompareFieldActivity)

We have next mapping for **Activities** and their **roles** (`src/constants/canvas/sectionRoles.js`):
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


