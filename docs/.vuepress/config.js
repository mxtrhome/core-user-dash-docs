import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'

export default defineUserConfig({
    dest: 'dist',
    lang: 'en-US',
    title: 'MXTR Dashboard Documentation',
    description: 'Core user dashboard project UI documentation',
    head: [['link', { rel: 'icon', href: '/images/favicon.png' }]],
    theme: defaultTheme({
        logo: '/images/logo.png',
        navbar: [
            {
                text: 'Introduction',
                link: '/',
            },
            {
                text: 'Workflows',
                children: ['/workflows', '/workflows/sections.md'],
            },
        ]
    }),
})