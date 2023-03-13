import * as d3 from 'd3';

export type City = {
    name: string,
    state: string,
    projection: [number, number]
}

export async function getCityData(projection: d3.GeoProjection, verbose: boolean,
    source= "https://raw.githubusercontent.com/useless-fisualization-operation/ufo-datasets/main/DataSets/relevant_cities_dataset.csv"): Promise<City[]> {
    if(verbose) console.log("Loading city data from: " + source);
    const cities: City[] = [];
    await d3.csv(source).then(data => {
        data.forEach(row => {
            const map_coordinates = projection([Number(row.Longitude), Number(row.Latitude)]);
            cities.push(
                {
                    name: row.City!,
                    state:  row.State!,
                    projection: map_coordinates!
                }
            );
        });
    });
    if(verbose) console.log(cities.length + " cities loaded.")
    return cities;
}