export interface PizzeriaShortDtoModel {
  id: number;
  name: string;
  address: string;
}

export interface PizzeriaDistanceDtoModel {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distanceKm: number;
}
