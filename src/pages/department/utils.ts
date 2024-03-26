import moment from 'moment';
import { DepartmentInterface } from './types.ts';

export const convertedDepartment = (departments: DepartmentInterface[] | undefined): Record<string, unknown>[] => {
  if (!departments) {
    return [];
  }

  return departments.map((department) => {
    const formattedCreatedAt = moment(department.created_at).format('DD/MM/YYYY, LTS');

    return {
      ...department,
      created_at: formattedCreatedAt,
    };
  });
};
