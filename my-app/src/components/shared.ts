import type { Airport, AirportType } from "./airport_data";
import type { State } from "./states";
import { allShapes } from "./ufo_shapes";
import type { Ufos } from "./ufo_data2";
import type { UfoLocation } from "./ufo_locations";
import { writable, type Writable } from 'svelte/store';

export type SharedState = {
    display_options: DisplayOptions;
    selected: Airport | Ufos | State | null; // the string is the location
    selected_type: "airport" | "ufos" | "state" | "none";
    start_date: Date | null;
    end_date: Date | null;
};

export type DisplayOptions = {
    [key: string]: boolean | unknown
};


export const shared: Writable<SharedState> = writable(
    {
        display_options: {
            // For Airports: 
            airport: true,
            large_airport: true,
            medium_airport: false,
            small_airport: false,
            heliport: false,
            seaplane_base: false,
            balloonport: false,
            closed_airport: false,
            // Others:
            religion: true,
            // For Ufos:
            ufo: true,
            ufo_images: true,
            ufo_no_images: true,
            shapes: allShapes
            // --- For Ufo Shapes:
        },
        start_date: new Date(2014, 0, 1),
        end_date: new Date(2018, 0, 1),
        selected: null,
        selected_type: 'none'
    });