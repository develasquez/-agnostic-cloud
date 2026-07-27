import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'doc',
      id: 'index',
      label: 'Home',
    },
    {
      type: 'doc',
      id: 'quickstart',
      label: 'Quickstart',
    },
    {
      type: 'category',
      label: 'Packages',
      items: [
        {
          type: 'category',
          label: '@agnostic-cloud/storage',
          items: [
            { type: 'doc', id: 'packages/storage', label: 'Overview' },
            { type: 'doc', id: 'api/@agnostic-cloud/storage/index', label: 'API Reference' },
          ],
        },
        {
          type: 'category',
          label: '@agnostic-cloud/secrets',
          items: [
            { type: 'doc', id: 'packages/secrets', label: 'Overview' },
            { type: 'doc', id: 'api/@agnostic-cloud/secrets/index', label: 'API Reference' },
          ],
        },
        {
          type: 'category',
          label: '@agnostic-cloud/cache',
          items: [
            { type: 'doc', id: 'packages/cache', label: 'Overview' },
            { type: 'doc', id: 'api/@agnostic-cloud/cache/index', label: 'API Reference' },
          ],
        },
        {
          type: 'category',
          label: '@agnostic-cloud/kms',
          items: [
            { type: 'doc', id: 'packages/kms', label: 'Overview' },
            { type: 'doc', id: 'api/@agnostic-cloud/kms/index', label: 'API Reference' },
          ],
        },
        {
          type: 'category',
          label: '@agnostic-cloud/pubsub',
          items: [
            { type: 'doc', id: 'packages/pubsub', label: 'Overview' },
            { type: 'doc', id: 'api/@agnostic-cloud/pubsub/index', label: 'API Reference' },
          ],
        },
        {
          type: 'category',
          label: '@agnostic-cloud/nosql',
          items: [
            { type: 'doc', id: 'packages/nosql', label: 'Overview' },
            { type: 'doc', id: 'api/@agnostic-cloud/nosql/index', label: 'API Reference' },
          ],
        },
        {
          type: 'category',
          label: '@agnostic-cloud/migrate',
          items: [
            { type: 'doc', id: 'packages/migrate', label: 'Overview' },
            { type: 'doc', id: 'api/@agnostic-cloud/migrate/index', label: 'API Reference' },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        { type: 'doc', id: 'guides/cross-cloud-migration', label: 'Cross-Cloud Migration' },
        { type: 'doc', id: 'guides/local-emulators', label: 'Local Emulators' },
        { type: 'doc', id: 'guides/multi-service-patterns', label: 'Multi-Service Patterns' },
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        { type: 'doc', id: 'llm-reference', label: 'LLM Reference' },
        { type: 'doc', id: 'errors', label: 'Error Reference' },
      ],
    },
  ],
};

export default sidebars;
