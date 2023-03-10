import type { Airport, AirportType } from "./airport_data";
import type { State } from "./states";
import type { Ufo } from "./ufo_data";
import { writable, type Writable } from 'svelte/store';


export type SharedState = {
    display_options: DisplayOptions;
    selected: Airport | Ufo | State | null;
    selected_type: "airport" | "ufo" | "state" | "none";
};

export type DisplayOptions = {
    [key: string]: boolean
};


export const shared: Writable<SharedState> = writable(
    {
        display_options: {
            large_airport: true,
            medium_airport: false,
            small_airport: false,
            heliport: false,
            seaplane_base: false,
            balloonport: false,
            closed_airport: false,
            ufo: false,
            religion: true
        },
        selected: null,
        selected_type: 'none'
    });