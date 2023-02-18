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
    var u = [];
    await getData(ufoSource).then((data) => {
        data.forEach(ufo => {
            if(ufo !== null){
            if(ufo.Latitude.length>0){
                ufo.coordinates = projection([ufo.Longitude, ufo.Latitude]);
                if(ufo.coordinates!==null) u.push(ufo);
                //console.log(ufo.City)
            }}
                
        });
        //return Promise.resolve("Hello there, kind sir");
    });
    return u;
    //return "hello there mister";
}

/*
import * as airportData from './us_airports_cleaned.json';
import * as ufoData from './ufo2.json';
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

export function getUfoData() {
    
    var u = [];
    
    ufoData.default.forEach(ufo => {
        if(ufo.Latitude.length != 0){ u.push(ufo);}
    });
       
    return u;
}

*/