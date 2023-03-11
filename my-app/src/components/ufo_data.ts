
import * as d3 from 'd3';
import type { StateShort } from './states';
import { states_short } from './states';

export type Ufo = {
    date: Date,
    city: string,
    state: StateShort,
    shape: string,
    duration: string,
    summary: string,
    images: string,
    url: string,
    urlImage: string,
    projection: [number, number]
}

export async function getUfoData(projection: d3.GeoProjection, verbose: boolean,
    source= "https://raw.githubusercontent.com/useless-fisualization-operation/ufo-datasets/main/Data.csv"): Promise<Ufo[]> {
    if(verbose) console.log("Loading UFO data from: " + source);
    const ufos: Ufo[] = [];
    await d3.csv(source).then(data => {
        data.forEach(row => {
            if (row["Date"] === undefined || row["City"] === undefined || row["State"] === undefined || row["Latitude"] === undefined || row["Longitude"] === undefined || row["Shape"] === undefined || row["Duration"] === undefined || row["Summary"] === undefined || row["Images"] === undefined || row["Url"] === undefined || row["UrlImage"] === undefined) {
                if(verbose) console.log("UFO row missing data: " + row);
                return null;
            }
            let state = null;
            try { state = states_short[row.State].short;
            } catch {
                if(verbose) console.log("UFO row has invalid state: " + row["State"]);
                return null;
            }
            const ufo_date = new Date(row.Date);
            const map_coordinates = projection([Number(row.Longitude), Number(row.Latitude)]); // TODO: pre-calculate?
            
            if (map_coordinates !== null && row.Images == 'Yes') {     // TODO: Errors
                    ufos.push(
                    {
                        date: ufo_date,
                        city:  row.City,
                        state: state,
                        shape: row.Shape,
                        duration: row.Duration,
                        summary: row.Summary,
                        images: row.Images,
                        url: row.Url,
                        urlImage: row.UrlImage,
                        projection: map_coordinates
                    }
                );
            }
            else {
                if(verbose) console.log("UFO not in projection: " + raw_ufo.city);
            }
        });
    });
    if(verbose) console.log(ufos.length + " UFOs loaded.")
    return ufos;
}