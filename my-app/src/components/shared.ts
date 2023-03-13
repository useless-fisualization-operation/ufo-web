import type { Airport, AirportType } from "./airport_data";
import type { State } from "./states";
import { allShapes } from "./ufo_shapes";
import type { Ufos } from "./ufo_data2";
import type { Shape } from "./ufo_shapes";
import { writable, type Writable } from 'svelte/store';
import type { City } from "./city_data";

export type SharedState = {
    shapes: Shape[] | null,
    shapes_options: ShapesOptions;
    display_options: DisplayOptions;
    selected: City | Airport | Ufos | State | null; // the string is the location
    selected_type: "city" | "airport" | "ufos" | "state" | "none";
    n_ufos_on_state: { data: number, loc: number };
    start_date: Date | null;
    end_date: Date | null;
    page: "map" | "chart" | "about" | "heatmap";
};

export type DisplayOptions = {
    [key: string]: boolean,
};

export type ShapesOptions = {
    [key: string]: boolean
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
            cities: true,
            // For Ufos:
            ufo: true,
            ufo_images: true,
            ufo_no_images: true,
            ufo_hoax: true,
            ufo_non_hoax: true,
            ufo_madar: true,
            ufo_non_madar: true,
            // --- For Ufo Shapes:
        },
        shapes: null,
        n_ufos_on_state: { data: 0, loc: 0 },
        shapes_options: allShapes,
        start_date: new Date(2014, 0, 1),
        end_date: new Date(2018, 0, 1),
        selected: null,
        selected_type: 'none',
        page: 'map',
    });