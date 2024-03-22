export interface SitesInterface {
  id?: number;
  site_id?: string;
  site_name: string;
  site_address: string;
  site_coordinates: {
    lat: number;
    long: number;
  };
  working_days: number;
  working_start_time: string;
  working_end_time: string;
  created_at?: string;
  updated_at?: string;
}
