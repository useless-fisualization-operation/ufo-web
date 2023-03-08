import { default as airportData } from '../data/us_airports_cleaned.json';
import type { StateShort } from './states';
import { StatesShort } from './states';

export type Airport = {
    name: string,
    type: AirportType,
    latitude_deg: number,
    longitude_deg: number,
    state: StateShort,
    projection: [number, number]
}

export const AirportTypes: { [key: string]: AirportType } = {
    'large_airport': 'Large Airport',
    'medium_airport': 'Medium Airport',
    'small_airport': 'Small Airport',
    'heliport': 'Heliport',
    'seaplane_base': 'Seaplane Base',
    'balloonport': 'Balloonport',
    'closed': 'Closed'
}

export type AirportType = 'Large Airport' | 'Medium Airport' | 'Small Airport' | 'Heliport' | 'Seaplane Base' | 'Balloonport' | 'Closed';

export function getAirportData(projection: d3.GeoProjection): Airport[] {
    var airports: Airport[] = [];
    airportData.forEach(raw_airport => {
        const map_coordinates = projection([raw_airport.longitude_deg, raw_airport.latitude_deg]); // TODO: pre-calculate?
        if (map_coordinates !== null) {     // TODO: Errors
            airports.push(
                {
                    name: raw_airport.name,
                    type: AirportTypes[raw_airport.type],
                    latitude_deg: raw_airport.latitude_deg,
                    longitude_deg: raw_airport.longitude_deg,
                    state: StatesShort[raw_airport.state].short,
                    projection: map_coordinates
                }
            );
        }
        else {
            console.log("Airport not in projection: " + raw_airport.name);
        }
    });
    return airports;
}
