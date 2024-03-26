import moment from 'moment';
import { SitesInterface } from './type.ts';

export const convertedSites = (sites: SitesInterface[] | undefined): Record<string, unknown>[] => {
  if (!sites) {
    return [];
  }

  return sites.map((sites) => {
    const formattedCreatedAt = moment(sites.created_at).format('DD/MM/YYYY, LTS');

    return {
      ...sites,
      created_at: formattedCreatedAt,
    };
  });
};
