import pandas as pd
import numpy as np

def extract_year(date):
    slashsplit = str(date).split('/')
    if len(slashsplit)==3:
        lastsplit = slashsplit[2]
        if len(lastsplit) >= 4 and lastsplit[0:4].isnumeric():
            return int(lastsplit[0:4])
    return -1

#num_sightnings
df_ufos = pd.read_csv("UfoEntireData.csv")
#print(df_ufos)
df_ufos["Year"] = df_ufos["Date"].map(extract_year)
print(np.sort(df_ufos["Year"].unique()))
#print(type(df_ufos["Year"].unique()))
#print(df_ufos["Year"].max())
#print(df_ufos["Year"].min())
print(df_ufos)
res = df_ufos[["State", "Year"]].value_counts()
#print(res)
df_abs_num = pd.DataFrame(res)
df_abs_num = df_abs_num.rename(columns={list(df_abs_num)[0]:'Num_Sightings'})


#add missing years
first_year = 1910
last_year = 2023
states = df_ufos["State"].unique()
print(states)
states_repeated = [state for state in states for _ in range(first_year, last_year+1, 1)]
#print(states_repeated)
all_years = np.array(range(first_year, last_year+1, 1))
all_years_repeated = np.tile(all_years, len(states))
#print(all_years_repeated)
#print(len(states))

complete_idx = pd.MultiIndex.from_arrays([states_repeated, all_years_repeated], names=('State', 'Year'))
#print(complete_idx)
df_abs_num = df_abs_num.reindex(complete_idx, fill_value=0)

df_abs_num = df_abs_num.sort_index()
print(df_abs_num)
df_abs_num.to_csv("num_sightings_per_state_per_year_full.csv")

df_rel_num = df_abs_num.copy(deep="True")
df_rel_num = df_rel_num.rename(columns={"Num_Sightings": "Rel_Num_Sightings"})
df_rel_num = df_rel_num.sort_index()

df_population = pd.read_csv("population_density_total_population_by_us_state_cleaned_interpolated.csv")
df_population = df_population.set_index(["State", "Year"])
df_population = df_population.sort_index()
print(df_abs_num)
print(df_population)
print(df_rel_num)

df_rel_num['Rel_Num_Sightings'] = df_abs_num['Num_Sightings']/df_population['Total_Resident_Population']

print(df_rel_num)
df_rel_num.to_csv("relative_num_sightings_per_state_per_year_full.csv")