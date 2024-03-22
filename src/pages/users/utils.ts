import moment from 'moment';
import { UserInterface } from './types.ts';

export const convertedUsers = (users: UserInterface[] | undefined): Record<string, unknown>[] => {
  if (!users) {
    return [];
  }

  return users.map((users) => {
    const formattedCreatedAt = moment(users.created_at).format('DD/MM/YYYY, LTS');

    return {
      ...users,
      created_at: formattedCreatedAt,
    };
  });
};
