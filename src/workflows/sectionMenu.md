---
title: Section Menu
---

# {{ $page.title }}

You can open "Section menu" when trying to create new section by pressing ![Create Section](./images/create_section_btn.png) 
button.

![Section Menu after trigger](./images/section_menu_after_trigger.png)

This menu is not static, it generates dynamically depending on the place (after/before what section) it was called. 
On the screenshot above you can see few levels of the opened menu, the functionality allows you to create section menu
with different levels depth, to make this menu more user comfortable. 


## The process menu generation
Everything starts from `Workflow.vue` (`views/workflows/Workflow.vue`) component. 
```vue
...
      <tiered-menu
          ...
          :model="sectionMenuItems"/>
...
```
`<tiered-menu>` is a side component, the description of it you can find in 
[official docs](https://primefaces.org/primevue/tieredmenu), for us now is enough to know that this component draws our
menu and accepts `:model` attribute. So `sectionMenuItems` there - is state property of `Workflow.vue` component it fills
every time the user clicks ![Create Section](./images/create_section_btn.png) button.

In `methods` section you can find next code:
```javascript
...
    onAddSection(e) {
      this.addSection(e) // triggers "add section process 
      this.sectionMenuItems = getSectionMenuForActivity( // fill the menu
          this.getActiveSection,
          (event) => this.handleSectionMenuSelect(event.item),
          this.$store.getters.activities,
          this.$store.getters.connections,
      )
      this.$refs.workflowSectionMenu.show(e) // show the menu
    },
...
```
Inside this `onAddSection` handler we call `getSectionMenuForActivity` helper (`src/helpers/workflow/section.js`), 
which accepts 4 important params:
- section - [entity of the section](./sections.md#activity-entity) above ![Create Section](./images/create_section_btn.png) button (active section)
- command - callback function, that would be called on menu item select
- activities - list of all activities
- connections - list of all connections

Lists of `activities` and `connections` are needed to know what section is after and before current, to generate correct
menu.
So as you may understand `getSectionMenuForActivity` returns the `section menu items` in understandable structure for
`<tiered-menu>` component. Inside this  helper we also use next imports:

```javascript
import {menuActivityTypesMap, sectionMenuItems} from '@/constants/canvas/sectionMenu'
```

This two constants are sets the view of the "Section menu" ([`sectionMenuItems`](#sectionmenuitems-const)) and rules 
for their appearance ([`menuActivityTypesMap`](#menuactivitytypesmap-const)). 

## sectionMenuItems const
sectionMenuItems (`src/helpers/workflow/section.js`) responds for the "view" of the "Section menu", it contains the
description of the whole levels and items in menu. 
So there are two types of the menu items: 
- Items that has child elements - they don't have any actions on click on them
- Items that do not have child elements - finite items that must have action on click on them

The "Section menu item entity" for the **"Items that has child elements"** can have next properties:
```javascript
    {
        label: String,  // name of the item
        value: "key" // identifier of the item
        icon: 'pi pi-fw pi-flag', // icon next to item name (https://www.primefaces.org/diamond/icons.xhtml)
        visible: Boolean, // visibility of the item 
        items: Array, // list of chaild menu items
    }
```

For the **"Items that do not have child elements"** there are 3 more properties available:
```javascript
    {
        duplicates: Boolean,  // diplays possiblility to past the same item after this section (with same 'value')
        type: String, // role of the section that corresponds the 'value of this item'
        command: Function, // action function that would be called on click on this item
    }
```
The `value` of such item must contain the [Activity type](./sections.md#section-types) 
from `/constants/canvas/activities.js`, and of course this type of items does not contain `items` property as must not
contain children.

## menuActivityTypesMap const
`menuActivityTypesMap` (`src/helpers/workflow/section.js`) responds for the items availability after concrete section, or in other words, it dictates what
sections would be available in menu after current one.

The structure of this object is pretty simple it contains a "key" - which is [Activity type](./sections.md#section-types)
and "value" - List of "Menu item IDs" available after its "key activity".
"Menu item IDs" here is one of [Activity type](./sections.md#section-types) or `menuValues` (also const from 
`src/helpers/workflow/section.js`)

For example after [Start Section](./sections.md#start) we have next menu items available:
```javascript
...
    [activityTypes.Start]: [
        menuValues.TriggerMenu,
        menuValues.ListsTriggerMenu,
        activityTypes.LeadCreatedTrigger,
        activityTypes.LeadMovedToTenantTrigger,
        activityTypes.LeadAddedToListTrigger,
        activityTypes.LeadRemovedFromListTrigger,
        menuValues.LeadsTriggerMenu,
        activityTypes.LeadCompareFieldTrigger,
        activityTypes.LeadStatusChangedTrigger,
    ],
...
```

## Conclusion
As you may understand the `getSectionMenuForActivity` helper doing a few simple things 
it accepts the whole "Menu object" from [sectionMenuItems](#sectionmenuitems-const), and filters it by the rules from
[menuActivityTypesMap](#menuactivitytypesmap-const). As result, it returns list of menu items and sections that are 
available after current one.

## Add a new "Section Menu Item"
First of all ensure that you have the "Activity" with your type in [Activity types list](./sections.md#section-types) 
and corresponding [Section modal](./sectionModals.md).

Basically all you need is to set few constants in `src/helpers/workflow/section.js`:
So when your "Activity" exists and has a "Modal" you have to find a place for it in "Section menu":
in [sectionMenuItems](#sectionmenuitems-const) you can past it inside existing `items` prop, or create your own submenu 
(in second case you also need to add you submenu name to the `menuValues` const) and past it there. 

As result, you will have something like that:
```javascript
export const sectionMenuItems = (command) => [
    ...
    {
        label: 'Menu',
        value: menuValues.[...],
        items: [
            {
                label: 'Submenu',
                value: menuValues.[...],
                items: [
                    { 
                        duplicates: true, // can this section be added after it self
                        label: 'Your item name',
                        value: activityTypes.['your activity type'],
                        type: sectionRoles.['role of your activity'],
                        command 
                    },
                ]
            }
        ]
    }
    ...
]
```

Once item is added you have to set the list of available menu items after your item.
So just add your section name as a "key" and list all the menu items to the 
[menuActivityTypesMap](#menuactivitytypesmap-const)
The result will look like that:
```javascript
export const menuActivityTypesMap = {
    ...
    [activityTypes.['your activity type']]: [
        ...
        menuValues.['some menu name'],
        menuValues.['some submenu name'],
        activityTypes.['some activity type'],
        ...
    ],
    ...
}
```

And the last thing you need here is to add your section (with you menu items) after some other sections. 
For example lets say you want yur section to be available after "Start" section, just find this section in the list and
add your "menu items" and "activity type": 
```javascript
export const menuActivityTypesMap = {
    ...
    [activityTypes.Start]: [
        ...
        menuValues.['your menu name'],
        menuValues.['your submenu name'],
        activityTypes.['your activity type'],
    ],
    ...
}
```