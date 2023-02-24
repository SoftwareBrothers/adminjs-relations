import { ResourceWithOptions, ComponentLoader } from 'adminjs';

import { relationsFeature } from '../../../../../src';
import { User } from './user.entity';

const componentLoader = new ComponentLoader();

export const createUserResource = (): ResourceWithOptions => ({
  resource: User,
  options: {
    navigation: {
      icon: 'User',
      name: 'Users',
    },
  },
  features: [
    relationsFeature({
      componentLoader,
      relations: {
        articles: {
          junction: {
            joinKey: 'authorId',
            inverseJoinKey: 'articleId',
            throughResourceId: 'UserArticle',
          },
          target: {
            resourceId: 'Article',
          },
        },
      },
    }),
  ],
});
