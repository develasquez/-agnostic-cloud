import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

interface CloudTab {
  title: string;
  code: string;
}

interface CloudTabsProps {
  aws: CloudTab;
  gcp: CloudTab;
  azure: CloudTab;
  oci?: CloudTab;
}

export default function CloudTabs({ aws, gcp, azure, oci }: CloudTabsProps): React.ReactElement {
  return (
    <Tabs groupId="cloud-provider">
      <TabItem value="aws" label="AWS" default>
        <CodeBlock language="typescript">{aws.code}</CodeBlock>
      </TabItem>
      <TabItem value="gcp" label="GCP">
        <CodeBlock language="typescript">{gcp.code}</CodeBlock>
      </TabItem>
      <TabItem value="azure" label="Azure">
        <CodeBlock language="typescript">{azure.code}</CodeBlock>
      </TabItem>
      {oci && (
        <TabItem value="oci" label="OCI">
          <CodeBlock language="typescript">{oci.code}</CodeBlock>
        </TabItem>
      )}
    </Tabs>
  );
}
