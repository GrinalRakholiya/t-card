import moment from 'moment';
import { RoleInterface } from './types.ts';

export const convertedRoles = (roles: RoleInterface[] | undefined): Record<string, unknown>[] => {
  if (!roles) {
    return [];
  }

  return roles.map((role) => {
    const formattedCreatedAt = moment(role.created_at).format('DD/MM/YYYY, LTS');

    return {
      ...role,
      created_at: formattedCreatedAt,
    };
  });
};
