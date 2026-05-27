import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'OpenRich',
  description: 'Universal rich-text editor — framework-agnostic core with bindings for React, Vue, Svelte, Solid, and vanilla JS',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'React', link: '/guide/react' },
          { text: 'Vue', link: '/guide/vue' },
          { text: 'Svelte', link: '/guide/svelte' },
          { text: 'Solid', link: '/guide/solid' },
          { text: 'Vanilla JS', link: '/guide/vanilla' },
          { text: 'i18n', link: '/guide/i18n' },
          { text: 'Theming', link: '/guide/theming' },
          { text: 'SSR', link: '/guide/ssr' },
        ],
      },
    ],
  },
});
