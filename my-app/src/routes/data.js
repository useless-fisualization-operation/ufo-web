import * as airportData from './us_airports_cleaned.json';
import * as religionData from './importance_of_religion_by_us_state_cleaned.json';
import * as d3 from 'd3';

export function getAirportData(projection) {
    var c = [];
    //const display = ["large_airport", "medium_airport", "small_airport", "heliport", "seaplane_base", "balloonport"];
    airportData.default.forEach(airport => {
        airport.coordinates = projection([airport.longitude_deg, airport.latitude_deg]);
        if(airport.coordinates!==null) c.push(airport);
        //else console.log(airport)
    });
    return c;
}

export function getReligionData() {   
    return religionData.default;
}

function getData(link) {
    return d3.csv(link);
}

export async function getUfoData(projection) {
    const ufoSource = "https://raw.githubusercontent.com/useless-fisualization-operation/ufo-datasets/main/UfoDataWithImagesCleaned.csv";
    var u = [];
    await getData(ufoSource).then((data) => {
        let count = 0;
        data.forEach((ufo,i) => {
            ufo.coordinates = projection([ufo.Longitude, ufo.Latitude]);
            if(ufo.coordinates!==null) u.push(ufo);
            /*
            else{
                console.log(i+ ": "+ ufo.Url);
                count++;
            }*/
        });
        console.log("Total errors: "+ count);
    });
    return u;
}

