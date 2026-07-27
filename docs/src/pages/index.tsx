import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ArchitectureDiagram from '@site/src/components/ArchitectureDiagram';
import PackageGrid from '@site/src/components/PackageGrid';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/agnostic-layer/docs/next/quickstart">
            Get Started in 5 Minutes
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Unified cloud abstraction layer for AWS, GCP, and Azure — swap providers by changing one line of config.">
      <HomepageHeader />
      <main>
        <div className="container margin-vert--xl">
          <Heading as="h2">Architecture</Heading>
          <ArchitectureDiagram />
          <Heading as="h2">Packages</Heading>
          <PackageGrid />
        </div>
      </main>
    </Layout>
  );
}
