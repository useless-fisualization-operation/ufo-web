import * as airportData from './us_airports_cleaned.json';
import * as d3 from 'd3';

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

function getData(link) {
    return d3.csv(link);
}

export async function getUfoData(projection) {
    const ufoSource = "https://raw.githubusercontent.com/useless-fisualization-operation/ufo-datasets/main/Data.csv";
    
    await getData(ufoSource).then((data) => {
        data.forEach(ufo => {
            ufo.coordinates = projection([ufo.Longitude, ufo.Latitude]);
        });
        return data;
    });
}