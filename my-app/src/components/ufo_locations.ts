
import * as d3 from 'd3';
import type { StateShort } from './states';
import { states_short } from './states';

export type UfoLocation = {
    id: number,
    city: string,
    state: StateShort,
    projection: [number, number]
    ref_ufo: number[]
}

export async function getUfoLocations(projection: d3.GeoProjection, verbose: boolean,
    source = "https://raw.githubusercontent.com/useless-fisualization-operation/ufo-datasets/main/DataSets/UfoLocation.csv"): Promise<UfoLocation[]> {
    if (verbose) console.log("Loading UFO data from: " + source);
    const ufos: UfoLocation[] = [];
    await d3.csv(source).then(data => {
        data.forEach(row => {
            if (row["ID"] === undefined || row["City"] === undefined || row["State"] === undefined || row["Latitude"] === undefined || row["Longitude"] === undefined) {
                if (verbose) console.log("UFO row missing data: " + row);
                return;
            }

            let state = null;
            try {
                state = states_short[row.State].short;
            } catch {
                if (verbose) console.log("UFO row has invalid state: " + row["State"]);
                return;
            }
            const map_coordinates = projection([Number(row.Longitude), Number(row.Latitude)]); // TODO: pre-calculate?

            if (map_coordinates !== null) {     // TODO: Errors
                ufos.push(
                    {
                        id: Number(row.ID),
                        city: row.City,
                        state: state,
                        projection: map_coordinates,
                        ref_ufo: []
                    }
                );
            } else {
                if (verbose) console.log("UFO not in projection: " + row.city);
            }
        });
    });
    if (verbose) console.log(ufos.length + " UFOs loaded.")
    return ufos;
}