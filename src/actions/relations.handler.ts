/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ActionHandler, ActionResponse, RecordJSON } from 'adminjs';

export type RelationsActionResponse = ActionResponse & {
  /**
   * List of relation records
   */
  records: Array<RecordJSON>;
};

// TODO handle resource relations
export const relationsHandler: ActionHandler<RelationsActionResponse> = (
  req,
  res,
  ctx
) => ({
  records: [],
});
