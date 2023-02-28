import { relationsFeature } from '../../../../../src/relations.feature';
import { CreateResourceResult } from '../../../types';
import { componentLoader } from '../../component-loader';
import { Organization } from '../models';

export const createOrganizationResource = (): CreateResourceResult<
  typeof Organization
> => ({
  resource: Organization,
  features: [
    relationsFeature({
      componentLoader,
      relations: {
        persons: {
          junction: {
            joinKey: 'personId',
            inverseJoinKey: 'organizationId',
            throughResourceId: 'PersonOrganization',
          },
          target: {
            resourceId: 'Person',
          },
        },
      },
    }),
  ],
  options: {
    navigation: { icon: 'Home' },
    actions: {
      findRelation: {
        isAccessible: true,
      },
    },
  },
});
