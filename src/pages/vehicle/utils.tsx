import moment from 'moment';
import { VehicleInterface } from './type.ts';

export const convertedVehicles = (vehicles: VehicleInterface[] | undefined): Record<string, unknown>[] => {
  if (!vehicles) {
    return [];
  }

  return vehicles?.map((vehicle) => {
    const formattedCreatedAt = moment(vehicle.created_at).format('DD/MM/YYYY, LTS');
    const formattedManufactureDate = moment(vehicle.manufactured_date).format('DD/MM/YYYY, LTS');
    const formattedRegistrationDate = moment(vehicle.registration_date).format('DD/MM/YYYY, LTS');
    const formattedRegistrationLetterYear = {
      year: moment(vehicle.registration_letter.year).format('DD/MM/YYYY'),
      letters: vehicle.registration_letter.letters,
    };

    return {
      ...vehicle,
      registration_letter: formattedRegistrationLetterYear,
      registration_date: formattedRegistrationDate,
      manufactured_date: formattedManufactureDate,
      created_at: formattedCreatedAt,
    };
  });
};
