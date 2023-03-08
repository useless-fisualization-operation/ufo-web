import { default as airportData } from '../data/us_airports_cleaned.json';
import { default as religionData } from '../data/importance_of_religion_by_us_state_cleaned.json';
import * as d3 from 'd3';
import type { DSVRowArray } from 'd3';
import { States, type State, type StateShort } from './states';

// from 0 to 1
export type ZeroToOne = number;

type RegionData = {
    state: StateShort,
    value: ZeroToOne,
}

type ReligionData = { // TODO: make it more generic, "state data" 0 to 1
    "State": string,
    "Very important": number,
    "Somewhat important": number,
    "Not too important": number,
    "Not at all important": number,
    "Don't know": number,
    "Sample size": number
}

export function getReligionData(): ReligionData[] {
    return religionData;
}

export function religionDataToRegionData(religionData: ReligionData[]): RegionData[] {
    var regionData: RegionData[] = [];
    religionData.forEach(row => {
        regionData.push(
            {
                state: States[row["State"]].short,
                value: row["Very important"],
            }
        );
    });
    return regionData;
}
