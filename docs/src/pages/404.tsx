import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function NotFound(): ReactNode {
  return (
    <Layout title="Page Not Found">
      <main className="container" style={{padding: '4rem 0', textAlign: 'center'}}>
        <h1>404</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/agnostic-layer/">
          Return Home
        </Link>
      </main>
    </Layout>
  );
}
