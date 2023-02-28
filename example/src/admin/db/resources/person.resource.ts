import { CreateResourceResult } from '../../../types';
import { Person } from '../models';

export const createPersonResource = (): CreateResourceResult<
  typeof Person
> => ({
  resource: Person,
  options: {
    navigation: { icon: 'User' },
    properties: {
      phone: {
        type: 'phone',
      },
    },
  },
});
