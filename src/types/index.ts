import type { ComponentLoader } from 'adminjs';

export type RelationsFeatureConfig = {
  componentLoader: ComponentLoader;
  relations: RelationsFeatureOptions;
};

export type RelationsFeatureOptions = {
  [resourceId: string]: {
    junction: {
      joinKey: string;
      inverseJoinKey: string;
      throughResourceId: string;
    };
    target: {
      resourceId: string;
    };
  };
};
