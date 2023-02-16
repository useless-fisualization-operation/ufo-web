import * as airportData from './us_airports_cleaned.json';

export function getAirportData() {
    var c = [];
    const display = ["large_airport", "medium_airport", "heliport", "seaplane_base", "balloonport"];

    airportData.default.forEach(airport => {
        if(display.includes(airport.type)){
            c.push(airport);
        }
    });

    return c;
}