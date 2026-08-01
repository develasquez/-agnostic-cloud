import React from 'react';
import Mermaid from '@theme/Mermaid';

export default function ArchitectureDiagram(): React.ReactElement {
  return (
    <Mermaid
      value={`graph TD
    A["createStorage({ cloud })"] --> B["S3Strategy (AWS S3)"]
    A --> C["GcsStrategy (GCP GCS)"]
    A --> D["AzureBlobStrategy (Azure Blob)"]
    A --> O["OciStorageStrategy (OCI Storage)"]
    B --> E["StorageStrategy Interface<br/>putObject / getObject / deleteObject / listObjects"]
    C --> E
    D --> E
    O --> E`}
    />
  );
}
