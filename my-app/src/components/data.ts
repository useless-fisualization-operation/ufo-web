import { default as airportData } from '../data/us_airports_cleaned.json';
import { default as religionData } from '../data/importance_of_religion_by_us_state_cleaned.json';
import * as d3 from 'd3';
import type { DSVRowArray } from 'd3';

type Airport = {
    name: string,
    type: string,
    latitude_deg: number,
    longitude_deg: number,
    state: string,
    coordinates: [number, number]
}

type RawUfo = {
    date: string,
    city: string,
    state: string,
    latitude: number,
    longitude: number,
    shape: string,
    duration: string,
    summary: string,
    images: string,
    url: string,
}

type Ufo = {
    date: string,
    city: string,
    state: string,
    latitude: number,
    longitude: number,
    shape: string,
    duration: string,
    summary: string,
    images: string,
    url: string,
    coordinates: [number, number]
}

type ReligionData = { // TODO: make it more generic, "state data" 0 to 1
    State: string,
    "Very important": number,
    "Somewhat important": number,
    "Not too important": number,
    "Not at all important": number,
    "Don't know": number,
    "Sample size": number
}



export function getAirportData(projection: d3.GeoProjection): Airport[] {
    var airports: Airport[] = [];
    airportData.forEach(raw_airport => {
        const coordinates = projection([raw_airport.longitude_deg, raw_airport.latitude_deg]); // TODO: pre-calculate?
        if (coordinates !== null) {     // TODO: Errors
            airports.push(
                {
                    name: raw_airport.name,
                    type: raw_airport.type,
                    latitude_deg: raw_airport.latitude_deg,
                    longitude_deg: raw_airport.longitude_deg,
                    state: raw_airport.state,
                    coordinates: coordinates
                }
            );
        }
        else {
            console.log("Airport not in projection: " + raw_airport.name);
        }
    });
    return airports;
}

export function getReligionData(): ReligionData[] {
    return religionData;
}


export async function getUfoData(projection: d3.GeoProjection, source: string = "https://raw.githubusercontent.com/useless-fisualization-operation/ufo-datasets/main/Data.csv") {
    var ufos: Ufo[] = [];
    await d3.csv(source).then(data => {
        data.forEach(row => {
            const raw_ufo: RawUfo = row as unknown as RawUfo;
            const coordinates = projection([raw_ufo.longitude, raw_ufo.latitude]); // TODO: pre-calculate?
            if (coordinates !== null) {     // TODO: Errors
                ufos.push(
                    {
                        date: raw_ufo.date,
                        city: raw_ufo.city,
                        state: raw_ufo.state,
                        latitude: raw_ufo.latitude,
                        longitude: raw_ufo.longitude,
                        shape: raw_ufo.shape,
                        duration: raw_ufo.duration,
                        summary: raw_ufo.summary,
                        images: raw_ufo.images,
                        url: raw_ufo.url,
                        coordinates: coordinates
                    }
                );
            }
            else {
                console.log("UFO not in projection: " + raw_ufo.city);
            }
        });
    });
    return ufos;
}