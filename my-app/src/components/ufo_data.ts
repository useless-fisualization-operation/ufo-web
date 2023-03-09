
import * as d3 from 'd3';
import type { StateShort } from './states';
import { states_short } from './states';


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

export type Ufo = {
    date: string,
    city: string,
    state: StateShort,
    latitude: number,
    longitude: number,
    shape: string,
    duration: string,
    summary: string,
    images: string,
    url: string,
    projection: [number, number]
}

function parse_ufo_row(row: d3.DSVRowString<string>): RawUfo | null {
    if (row["Date"] === undefined || row["City"] === undefined || row["State"] === undefined || row["Latitude"] === undefined || row["Longitude"] === undefined || row["Shape"] === undefined || row["Duration"] === undefined || row["Summary"] === undefined || row["Images"] === undefined || row["Url"] === undefined) {
        console.log("UFO row missing data: " + row);
        return null;
    }

    let state = null;
    try {
        state = states_short[row["State"]].short;
    } catch {
        console.log("UFO row has invalid state: " + row["State"]);
        return null;
    }

    return {
        date: row["Date"],
        city: row["City"],
        state: state,
        latitude: parseFloat(row["Latitude"]),
        longitude: parseFloat(row["Longitude"]),
        shape: row["Shape"],
        duration: row["Duration"],
        summary: row["Summary"],
        images: row["Images"],
        url: row["Url"],
    }
}

export async function getUfoData(projection: d3.GeoProjection, source: string = "https://raw.githubusercontent.com/useless-fisualization-operation/ufo-datasets/main/Data.csv"): Promise<Ufo[]> {
    console.log("Loading UFO data from: " + source);
    var ufos: Ufo[] = [];
    await d3.csv(source).then(data => {
        data.forEach(row => {
            const raw_ufo = parse_ufo_row(row);
            if (raw_ufo === null) {
                return;
            }

            const map_coordinates = projection([raw_ufo.longitude, raw_ufo.latitude]); // TODO: pre-calculate?
            if (map_coordinates !== null) {     // TODO: Errors
                ufos.push(
                    {
                        date: raw_ufo.date,
                        city: raw_ufo.city,
                        state: states_short[raw_ufo.state].short,
                        latitude: raw_ufo.latitude,
                        longitude: raw_ufo.longitude,
                        shape: raw_ufo.shape,
                        duration: raw_ufo.duration,
                        summary: raw_ufo.summary,
                        images: raw_ufo.images,
                        url: raw_ufo.url,
                        projection: map_coordinates
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