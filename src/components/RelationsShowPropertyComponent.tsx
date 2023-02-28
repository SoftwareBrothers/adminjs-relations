import React from 'react';
import { Box, Tab, Tabs } from '@adminjs/design-system';
import {
  ApiClient,
  BasePropertyProps,
  RecordsTable,
  ReduxState,
  useTranslation,
} from 'adminjs';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { memo } from 'react';

const api = new ApiClient();

const RelationsShowPropertyComponent: FC<BasePropertyProps> = props => {
  const { resource, record } = props;
  const { id: resourceId, properties } = resource;

  const { relationsTargets } = properties.relations.props;
  const relationsKeys = Object.keys(relationsTargets);
  const [selectedTab, setSelectedTab] = useState<string>(relationsKeys[0]);
  const { translateLabel } = useTranslation();

  if (!relationsKeys.length) return null;

  return (
    <Tabs currentTab={selectedTab} onChange={setSelectedTab}>
      {relationsKeys.map(relation => (
        <Tab
          key={relation}
          id={relation}
          label={translateLabel(relation, resourceId)}
        >
          <RelationTab
            targetResourceId={relationsTargets[relation]}
            record={record}
            resource={resource}
            relation={relation}
            activeTab={selectedTab}
          />
        </Tab>
      ))}
    </Tabs>
  );
};

type RelationTabProps = Pick<BasePropertyProps, 'record' | 'resource'> & {
  relation: string;
  activeTab: string;
  targetResourceId: string;
};

const RelationTab: FC<RelationTabProps> = props => {
  const { relation, targetResourceId, resource, record, activeTab } = props;
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const resources = useSelector((state: ReduxState) => state.resources);
  const targetResource = resources.find(r => r.id === targetResourceId);

  useEffect(() => {
    if (activeTab !== relation || !record) return;

    setIsLoading(true);
    api
      .recordAction({
        actionName: 'findRelation',
        recordId: record.id,
        resourceId: targetResourceId,
        params: { relation },
      })
      .then(({ data: { records: relatedRecords } }) => {
        setIsLoading(false);
        setRecords(relatedRecords);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [activeTab, relation, record, resource.id, targetResourceId]);

  if (activeTab !== relation || !targetResource) return null;

  return (
    <Box py="xl">
      <RecordsTable
        resource={targetResource}
        records={records}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default memo(RelationsShowPropertyComponent);
