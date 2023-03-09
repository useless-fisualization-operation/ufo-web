import type { Airport, AirportType } from "./airport_data";
import type { State } from "./states";
import type { Ufo } from "./ufo_data";

export type SharedState = {
    display_options: DisplayOptions;
    selected: Airport | Ufo | State | null;
    selected_type: "airport" | "ufo" | "state" | "none";
};

export type DisplayOptions = {
    [key: string]: boolean
};



