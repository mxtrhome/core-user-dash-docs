---
title: Introduction 
---

# {{ $page.title }}

This documentation is created in order to support, at first place, Front-end developers to understand the UI system of the ["MXTR Core user dashboard"](https://www.mxtrautomation.com/) project.
Here you can find description of the core components, code examples and important logic peaces explanation.

## Technical stack
| Technology            | Description                       |
|-----------------------|-----------------------------------|
| JavaScript/TypeScript | Language                          |
| Vue.js (2.6.x)        | Core framework                    |
| Jest                  | Testing framework                 |
| Eslint                | Code checking                     |
| Vuetify               | Ui components framework           |
| Vuex                  | Reactive state management library |
| Vue Router            | Page router                       |
| Scss/Sass/Stylus      | Css preprocessors                 |

## File System
```
└─ src
   ├─ api
   │  └─ loginAPI.js
   ├─ assets
   ├─ classes
   ├─ common
   ├─ components
   ├─ constants
   ├─ development
   ├─ helpers
   ├─ layouts
   ├─ mixins
   ├─ plugins
   ├─ sass
   ├─ store
   │  ├─ modules
   │  └─ index.js
   ├─ views
   │  ├─ admin
   │  ├─ dashboard
   │  ├─ workflow
   │  └─ ...
   ├─ App.vue
   ├─ globalComponents.js
   ├─ main.ts
   └─ router.js
```

## Docs contents
- [Workflow](./workflows)
  - [Activities (Sections)](./workflows/sections.md)
  - [Connections](./workflows/connections.md)
  - [Section Modals](./workflows/sectionModals.md)
  - [Section Menu](./workflows/sectionMenu.md)
  - [Workflow under the hood](./workflows/technical.md)
- [Email Editor](./email-editor)
- [Lead Lists](./lead-lists)