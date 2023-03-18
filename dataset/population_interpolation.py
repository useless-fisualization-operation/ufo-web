import pandas as pd
import numpy as np

df_pdens = pd.read_csv("population_density_total_population_by_us_state_cleaned.csv")
#first_year = 1910
#last_year = 2023
states = df_pdens["State"].unique()
years_10er = df_pdens["Year"].unique()
df_pdens = df_pdens.set_index(["State", "Year"])
df_pdens = df_pdens.sort_index()
df_new = df_pdens.copy(deep="True")
#print(df_pdens)
#print(df_new)


for state in states:
    for year_10er_prev in years_10er[:-1]:
        year_10er_next = year_10er_prev + 10
        tot_prev = df_pdens.loc[state, year_10er_prev]["Total_Resident_Population"]
        dens_prev = df_pdens.loc[state, year_10er_prev]["Resident_Population_Density"]
        tot_next = df_pdens.loc[state, year_10er_next]["Total_Resident_Population"]
        dens_next = df_pdens.loc[state, year_10er_next]["Resident_Population_Density"]
        for i in range(1, 10, 1):
            tot_curr = np.round((1-i/10)*tot_prev + (i/10)*tot_next, 0)
            dens_curr = (1-i/10)*dens_prev + (i/10)*dens_next
            df_new.at[(state, (year_10er_prev+i)), "Total_Resident_Population"] = tot_curr
            df_new.at[(state, (year_10er_prev + i)), "Resident_Population_Density"] = dens_curr
            #dens_curr

    for year in [2021, 2022, 2023]:
        tot = df_pdens.loc[state, 2020]["Total_Resident_Population"]
        dens = df_pdens.loc[state, 2020]["Resident_Population_Density"]
        df_new.at[(state, year), "Total_Resident_Population"] = tot_curr
        df_new.at[(state, year), "Resident_Population_Density"] = dens_curr


df_new = df_new.sort_index()
print(df_new)
df_new.to_csv("population_density_total_population_by_us_state_cleaned_interpolated.csv")