import type { Airport, AirportType } from "./airport_data";
import type { State } from "./states";
import type { Ufo, Ufos } from "./ufo_data";
import { writable, type Writable } from 'svelte/store';


export type SharedState = {
    display_options: DisplayOptions;
    selected: Airport | Ufos | State | null;
    selected_type: SelectionType;
    start_date: Date | null;
    end_date: Date | null;
};

export type SelectionType = 'airport' | 'ufo' | 'state' | 'none';

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
            religion: true,
        },
        start_date: new Date(2014, 0, 1),
        end_date: new Date(2018, 0, 1),
        selected: null,
        selected_type: 'none'
    });