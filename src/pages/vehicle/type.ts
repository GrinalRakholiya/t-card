export interface VehicleInterface {
  id: number;
  vehicle_number: string;
  qr_code: string;
  key_tag: number;
  parked_at: string;
  assigned_site: string;
  status: string;
  registration_letter: {
    year: string;
    letters: string;
  };
  registration_date: string;
  drive_side: {
    dataCode: string;
    displayText: string;
  };
  vehicle_type: string;
  manufactured_date: string;
  make: string;
  model: string;
  created_at: string;
  updated_at: string;
}
