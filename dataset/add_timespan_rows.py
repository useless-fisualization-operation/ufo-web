import pandas as pd
import numpy as np

df = pd.read_csv("population_density_by_us_state_cleaned.csv")
df_new = df.copy(deep="True")

df = df.set_index(["State", "Year"])
df = df.sort_index()

states = np.array(df.index.unique(level="State"))
years = np.array(df.index.unique(level="Year"))
np.sort(years)
num_years = years.shape[0]


df_new = df_new.rename(columns={"Year": "Start_Year"})
df_new["Stop_Year"] = df_new.loc[:, "Start_Year"]
df_new = df_new.set_index(["State", "Start_Year", "Stop_Year"])
df_new.sort_index()



print(df)
print(type(df))


#required_array = np.array(df.values)
#print("hello: ")
#print(required_array[0])

#print(type())




for state in states:
    print(state)
    for start_year_idx in range(num_years):
        start_year = years[start_year_idx]
        if (state, start_year) in df.index:
            sum = df.loc[state, start_year]["Resident Population Density"]
            count = 1
            #print(sum)
            for stop_year_idx in range(start_year_idx+1, num_years):
                stop_year = years[stop_year_idx]
                if (state, stop_year) in df.index:
                    sum += df.loc[state, stop_year]["Resident Population Density"]
                    count += 1
                    df_new.loc[state, start_year, stop_year] = sum/count
                    #print(sum/count)


    #df_curr_state = df.loc[df['State'] == state]

print("finished df_new")
print(df_new)
df_new = df_new.sort_index()

df_new.to_csv("population_density_by_us_state_cleaned_timespan_rows.csv") #encoding='utf-8',
