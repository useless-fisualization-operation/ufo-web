import pandas as pd
import numpy as np

def extract_year(date):
    slashsplit = str(date).split('/')
    #print(slashsplit)
    if len(slashsplit)==3:
        lastsplit = slashsplit[2]
        #if len(lastsplit) >=3 and lastsplit[2]==" " and lastsplit[0:2].isnumeric():
        if len(lastsplit) >= 4 and lastsplit[0:4].isnumeric():
            return int(lastsplit[0:4])
            #year_short = int(lastsplit[0:2])
            #if year_short <=23:
                #return 2000 + year_short
            #else:
                #return 1900 + year_short
    return -1

if False:
    #num_sightnings
    df_ufos = pd.read_csv("UfoEntireData.csv")
    #print(df_ufos)
    df_ufos["Year"] = df_ufos["Date"].map(extract_year)
    print(np.sort(df_ufos["Year"].unique()))
    print(type(df_ufos["Year"].unique()))
    #print(df_ufos["Year"].max())
    #print(df_ufos["Year"].min())
    print(df_ufos)
    res = df_ufos[["State", "Year"]].value_counts()
    #print(res)
    df_out = pd.DataFrame(res)
    df_out = df_out.rename(columns={list(df_out)[0]:'Num_Sightings'})


    #add missing years
    first_year = 1920
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
    df_out = df_out.reindex(complete_idx, fill_value=0)

    #df_out = df_out.rename(columns={"State": "Num_Sightings"})
    #df_out.index.name = ["State", "Year"]
    #print(df_out)

    df_out = df_out.sort_index()
    print(df_out)
    df_out.to_csv("num_sightings_per_state_per_year_full.csv")

#df_out = pd.read_csv("relative_num_sightings_per_state_per_year_full.csv")
df_out = pd.read_csv("num_sightings_per_state_per_year_full.csv")
states = df_out["State"].unique()
all_years = df_out["Year"].unique()
print(states)
print(all_years)
df_out = df_out.set_index(["State", "Year"])


#do combinations of start and stop year
df_new = df_out.copy(deep="True")
df_new = df_new.reset_index()
np.sort(all_years)
num_years = all_years.shape[0]
df_new = df_new.rename(columns={"Year": "Start_Year"})
df_new["Stop_Year"] = df_new.loc[:, "Start_Year"]
df_new = df_new.set_index(["State", "Start_Year", "Stop_Year"])
df_new.sort_index()

for state in states:
    print(state)
    for start_year_idx in range(num_years):
        start_year = all_years[start_year_idx]
        if (state, start_year) in df_out.index:
            sum = df_out.loc[state, start_year]["Num_Sightings"]
            #sum = df_out.loc[state, start_year]["Rel_Num_Sightings"]
            count = 1
            #print(sum)
            for stop_year_idx in range(start_year_idx+1, num_years):
                stop_year = all_years[stop_year_idx]
                if (state, stop_year) in df_out.index:
                    sum += df_out.loc[state, stop_year]["Num_Sightings"]
                    #sum += df_out.loc[state, stop_year]["Rel_Num_Sightings"]
                    count += 1
                    df_new.loc[state, start_year, stop_year] = sum

df_new = df_new.sort_index()
#df_new.to_csv("num_sightings_per_state_per_year_timespan_rows_full.csv")



