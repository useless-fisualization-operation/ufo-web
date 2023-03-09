import { default as airportData } from '../data/us_airports_cleaned.json';
import { default as religionData } from '../data/importance_of_religion_by_us_state_cleaned.json';
import * as d3 from 'd3';
import type { DSVRowArray } from 'd3';
import { States, StatesShort, type State, type StateShort } from './states';

// from 0 to 1
export type ZeroToOne = number;

export type StateData = {
    state: StateShort,
    value: ZeroToOne,
}

// @ts-ignore
const color_scale = d3.scaleLinear().range([0, 1]).range(["#f7fcf5", "#00441b"]);
export function getStateColor(stateData: StateData, scale: d3.ScaleLinear<number, number> = color_scale): string {
    // @ts-ignore
    return scale(stateData.value);
}

export type ReligionData = { // TODO: make it more generic, "state data" 0 to 1
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

// returns a dict of state short to state data
export function religionDataToStateData(religion_data: ReligionData[]): { [key: string]: StateData } {
    const state_data: { [key: string]: StateData } = {};
    religion_data.forEach((row) => {
        const state = StatesShort[row.State].short;
        const value = row["Very important"];
        state_data[state] = { state, value };
    });
    return state_data;
}
