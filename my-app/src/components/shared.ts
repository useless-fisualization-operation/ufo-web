import type { Airport } from "./airport_data";
import type { State } from "./states";
import type { Ufo } from "./ufo_data";

export type SharedState = {
    display_options: DisplayOptions;
    selected: Airport | Ufo | State | null;
    selected_type: "airport" | "ufo" | "state" | "none";
};

export type DisplayOptions = {
    display_large_airports: boolean;
    display_medium_airports: boolean;
    display_small_airports: boolean;
    display_heliports: boolean;
    display_seaplane_bases: boolean;
    display_balloonports: boolean;
    display_closed_airports: boolean;
    display_ufos: boolean;
    display_religion: boolean;
};

