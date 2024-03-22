interface RegistrationLetter {
  year: string;
  letters: string[];
}

interface DriveSide {
  dataCode: string;
  displayText: string;
}

export interface CardDetailsInterface {
  id: number;
  vehicle_number: string;
  qr_code: string;
  key_tag: number;
  parked_at: string;
  assigned_site: string;
  department?: string;
  department_id?: string;
  site_name?: string;
  status: string;
  registration_letter?: RegistrationLetter;
  registration_date?: string;
  drive_side?: DriveSide;
  site_id?: string;
  department_waiting_time?: string;
  total_time?: string;
  current_department_time?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CardComponentProps {
  cardDetails: CardDetailsInterface;
}
