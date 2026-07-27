import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Agnostic Cloud',
  tagline: 'Unified cloud abstraction layer for AWS, GCP, and Azure',
  favicon: 'img/favicon.ico',

  url: 'https://agnostic-cloud.github.io',
  baseUrl: '/-agnostic-cloud/',

  organizationName: 'agnostic-cloud',
  projectName: 'agnostic-layer',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/agnostic-cloud/agnostic-layer/edit/main/docs/',
          lastVersion: 'current',
          versions: {
            current: {
              label: 'next',
              path: 'next',
            },
          },
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: null,
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  markdown: {
    mermaid: true,
  },

  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
  ],

  themeConfig: {
    image: 'img/og-image.svg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Agnostic Cloud',
      logo: {
        alt: 'Agnostic Cloud Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/agnostic-cloud/agnostic-layer',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Quickstart', to: '/docs/next/quickstart' },
            { label: 'Storage', to: '/docs/next/packages/storage' },
            { label: 'LLM Reference', to: '/docs/next/llm-reference' },
          ],
        },
        {
          title: 'Packages',
          items: [
            { label: '@agnostic-cloud/storage', to: '/docs/next/packages/storage' },
            { label: '@agnostic-cloud/secrets', to: '/docs/next/packages/secrets' },
            { label: '@agnostic-cloud/cache', to: '/docs/next/packages/cache' },
            { label: '@agnostic-cloud/kms', to: '/docs/next/packages/kms' },
            { label: '@agnostic-cloud/pubsub', to: '/docs/next/packages/pubsub' },
            { label: '@agnostic-cloud/nosql', to: '/docs/next/packages/nosql' },
            { label: '@agnostic-cloud/migrate', to: '/docs/next/packages/migrate' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'GitHub', href: 'https://github.com/agnostic-cloud/agnostic-layer' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Agnostic Cloud.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'storage',
        entryPoints: ['../packages/storage/src/index.ts'],
        tsconfig: '../packages/storage/tsconfig.json',
        out: 'docs/api/@agnostic-cloud/storage',
        plugin: ['typedoc-plugin-markdown'],
        readme: 'none',
        cleanOutputDir: true,
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'secrets',
        entryPoints: ['../packages/secrets/src/index.ts'],
        tsconfig: '../packages/secrets/tsconfig.json',
        out: 'docs/api/@agnostic-cloud/secrets',
        plugin: ['typedoc-plugin-markdown'],
        readme: 'none',
        cleanOutputDir: true,
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'cache',
        entryPoints: ['../packages/cache/src/index.ts'],
        tsconfig: '../packages/cache/tsconfig.json',
        out: 'docs/api/@agnostic-cloud/cache',
        plugin: ['typedoc-plugin-markdown'],
        readme: 'none',
        cleanOutputDir: true,
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'kms',
        entryPoints: ['../packages/kms/src/index.ts'],
        tsconfig: '../packages/kms/tsconfig.json',
        out: 'docs/api/@agnostic-cloud/kms',
        plugin: ['typedoc-plugin-markdown'],
        readme: 'none',
        cleanOutputDir: true,
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'pubsub',
        entryPoints: ['../packages/pubsub/src/index.ts'],
        tsconfig: '../packages/pubsub/tsconfig.json',
        out: 'docs/api/@agnostic-cloud/pubsub',
        plugin: ['typedoc-plugin-markdown'],
        readme: 'none',
        cleanOutputDir: true,
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'nosql',
        entryPoints: ['../packages/nosql/src/index.ts'],
        tsconfig: '../packages/nosql/tsconfig.json',
        out: 'docs/api/@agnostic-cloud/nosql',
        plugin: ['typedoc-plugin-markdown'],
        readme: 'none',
        cleanOutputDir: true,
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'migrate',
        entryPoints: ['../packages/migrate/src/index.ts'],
        tsconfig: '../packages/migrate/tsconfig.json',
        out: 'docs/api/@agnostic-cloud/migrate',
        plugin: ['typedoc-plugin-markdown'],
        readme: 'none',
        cleanOutputDir: true,
      },
    ],
  ],
};

export default config;
