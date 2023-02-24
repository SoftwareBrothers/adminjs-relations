import {
  ActionHandler,
  ActionResponse,
  FeatureType,
  RecordJSON,
  buildFeature
} from 'adminjs';
import { RelationsFeatureConfig } from './types';
import { bundleComponent } from './utils';

export type RelationsActionResponse = ActionResponse & {
  /**
   * List of relation records
   */
  records: Array<RecordJSON>;
};

// TODO handle resource relations
const relationsHandler: ActionHandler<RelationsActionResponse> = (
  req,
  res,
  ctx
) => ({
  records: [],
});

/**
 * @exaple
 * ```
 * export const userResource = {
 *  resource: UserModel,
 *  features: [
 *    relationsFeature({
 *      relations: {
 *        articles: {
 *          junction: {
 *            joinKey: "authorId",
 *            inverseJoinKey: "articleId",
 *            throughResourceId: "UserArticle",
 *          },
 *          target: {
 *            resourceId: "Article",
 *          },
 *        },
 *      },
 *    }),
 *  ],
 *  options: {
 *    ...
 *    actions: {
 *      findRelation: {
 *        isAccessible: (...) => boolean,
 *      },
 *    },
 *  },
 *};
 *```
 */
export const relationsFeature = ({
  componentLoader,
  relations,
}: RelationsFeatureConfig): FeatureType => {
  const relationsTabsComponent = bundleComponent(
    componentLoader,
    'DefaultRelationsShowProperty'
  );

  return buildFeature({
    properties: {
      ...Object.keys(relations).reduce(
        (memo, current) => ({
          ...memo,
          [current]: { type: 'string', isVisible: false },
        }),
        {}
      ),
      relations: {
        type: 'relations',
        components: { show: relationsTabsComponent },
        props: {
          relationsTargets: Object.keys(relations).reduce(
            (memo, current) => ({
              ...memo,
              [current]: relations[current].target.resourceId,
            }),
            {}
          ),
        },
        position: 999,
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
