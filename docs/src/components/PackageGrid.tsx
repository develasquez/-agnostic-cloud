import React from 'react';

const PACKAGES = [
  { name: '@agnostic-cloud/storage', description: 'Object storage (S3, GCS, Azure Blob, OCI Storage)', clouds: ['AWS', 'GCP', 'Azure', 'OCI'] },
  { name: '@agnostic-cloud/secrets', description: 'Secrets management', clouds: ['AWS', 'GCP', 'Azure'] },
  { name: '@agnostic-cloud/cache', description: 'In-memory cache (Redis, OCI Cache)', clouds: ['AWS', 'GCP', 'Azure', 'OCI'] },
  { name: '@agnostic-cloud/kms', description: 'Key management & encryption', clouds: ['AWS', 'GCP', 'Azure', 'OCI'] },
  { name: '@agnostic-cloud/pubsub', description: 'Pub/Sub messaging & queues', clouds: ['AWS', 'GCP', 'Azure', 'OCI'] },
  { name: '@agnostic-cloud/nosql', description: 'NoSQL document databases', clouds: ['AWS', 'GCP', 'Azure'] },
  { name: '@agnostic-cloud/migrate', description: 'Cross-cloud migration utilities', clouds: ['AWS', 'GCP', 'Azure'] },
];

export default function PackageGrid(): React.ReactElement {
  return (
    <div className="package-grid">
      {PACKAGES.map((pkg) => (
        <a key={pkg.name} href={`/-agnostic-cloud/docs/next/packages/${pkg.name.split('/').pop()}`} className="package-card">
          <h3>{pkg.name}</h3>
          <p>{pkg.description}</p>
          <div className="cloud-badges">
            {pkg.clouds.map((c) => (
              <span key={c} className={`cloud-badge cloud-badge--${c.toLowerCase()}`}>{c}</span>
            ))}
          </div>
        </a>
      ))}
    </div>
  );
}
