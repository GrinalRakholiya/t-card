import { SitesInterface } from '../../pages/sites/type.ts';

export const SITE_DATA: SitesInterface = {
  site_name: '',
  site_address: '',
  site_coordinates: {
    lat: 0,
    long: 0,
  },
  working_days: 5,
  working_start_time: '09:00',
  working_end_time: '17:00',
};

export const FORM_CONFIG = [
  {
    name: 'site_name',
    label: 'Site name',
    placeholder: 'Enter site name',
    type: 'text',
    rules: [{ required: true, message: 'Please enter site name!' }],
  },
  {
    name: 'site_address',
    label: 'Site address',
    placeholder: 'Enter site address',
    type: 'text',
    rules: [{ required: true, message: 'Please enter site address!' }],
  },
  {
    name: 'site_coordinates_lat',
    label: 'Site co-ordinate (LAT)',
    placeholder: 'Enter site co-ordinate (LAT)',
    type: 'number',
    rules: [{ required: true, message: 'Please enter site co-ordinate (LAT) !' }],
  },
  {
    name: 'site_coordinates_long',
    label: 'Site co-ordinate (LONG)',
    placeholder: 'Enter site co-ordinate (LONG)',
    type: 'number',
    rules: [{ required: true, message: 'Please enter site co-ordinate (LONG) !' }],
  },
];
