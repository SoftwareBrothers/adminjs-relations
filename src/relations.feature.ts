import { buildFeature, ComponentLoader, FeatureType } from 'adminjs';
import { relationsHandler } from './actions/relations.handler';
import { RelationsFeatureConfig } from './types';
import { bundleComponent } from './utils';

const bundleRelationsComponents = (componentLoader: ComponentLoader) => ({
  show: bundleComponent(componentLoader, 'RelationsShowPropertyComponent'),
  edit: bundleComponent(componentLoader, 'RelationsEditPropertyComponent'),
  list: bundleComponent(componentLoader, 'RelationsEditPropertyComponent'),
});

/**
 * @exaple
 * ```
 * export const createOrganizationResource = (): CreateResourceResult<
 *  typeof Organization
 *> => ({
 *  resource: Organization,
 *  features: [
 *    relationsFeature({
 *      componentLoader,
 *      relations: {
 *        persons: {
 *          junction: {
 *            joinKey: 'personId',
 *            inverseJoinKey: 'organizationId',
 *            throughResourceId: 'PersonOrganization',
 *          },
 *          target: {
 *            resourceId: 'Person',
 *          },
 *        },
 *      },
 *    }),
 *  ],
 *  options: {
 *    navigation: { icon: 'Home' },
 *    actions: {
 *      findRelation: {
 *        isAccessible: true,
 *      },
 *    },
 *  },
 *});
 *```
 */
export const relationsFeature = ({
  componentLoader,
  relations,
  propertyKey = 'relations',
}: RelationsFeatureConfig): FeatureType => {
  const { show, edit, list } = bundleRelationsComponents(componentLoader);

  return buildFeature({
    properties: {
      [propertyKey]: {
        type: 'string',
        components: { show, edit, list },
        props: {
          relationsTargets: Object.keys(relations).reduce(
            (memo, current) => ({
              ...memo,
              [current]: relations[current].target.resourceId,
            }),
            {}
          ),
        },
        position: Number.MAX_SAFE_INTEGER,
      },
    },
    actions: {
      findRelation: {
        actionType: 'record',
        isVisible: false,
        handler: relationsHandler,
      },
    },
  });
};

export default relationsFeature;
