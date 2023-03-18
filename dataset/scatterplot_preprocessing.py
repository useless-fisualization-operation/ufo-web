import pandas as pd

#num_sightnings
if False:
    df_ufos = pd.read_csv("UfoEntireData.csv")
    res = df_ufos["State"].value_counts()
    df_out = pd.DataFrame(res)
    df_out = df_out.rename(columns={"State": "Num_Sightings"})
    df_out.index.name = "State"
    print(df_out)

df_ufos = pd.read_csv("relative_num_sightings_per_state_per_year_full.csv")
res = df_ufos.groupby(['State'])['Rel_Num_Sightings'].sum()
df_out = pd.DataFrame(res)
df_out = df_out.rename(columns={"State": "Rel_Num_Sightings"})
df_out.index.name = "State"
print(df_out)

#importance of religion
df_religion = pd.read_csv("importance_of_religion_by_us_state_cleaned.csv")
df_religion = df_religion.set_index("State")
df_religion = df_religion.rename(columns={"Very important" : "Rel_Very_important",
                                "Somewhat important" : "Rel_Somewhat_important",
                                "Not too important" : "Rel_Not_too_important",
                                "Not at all important" : "Rel_Not_at_all_important",
                                "Don't know" : "Rel_Dont_know",
                                "Sample size": "Rel_Sample_size"})
#print(df_religion)


#population density
#df_pdens = pd.read_csv("population_density_by_us_state_cleaned_timespan_rows.csv")
df_pdens = pd.read_csv("population_density_total_population_by_us_state_cleaned_timespan_rows.csv")
filter_fulltime = (df_pdens["Start_Year"] == 1910) & (df_pdens["Stop_Year"] == 2020)
df_pdens_fulltime = df_pdens[filter_fulltime]
df_pdens_fulltime = df_pdens_fulltime.drop(columns=['Start_Year', 'Stop_Year'])
df_pdens_fulltime = df_pdens_fulltime.set_index("State")
df_pdens_fulltime = df_pdens_fulltime.rename(columns={"Resident_Population_Density": "Population_Density",
                                                      "Total_Resident_Population":"Total_Resident_Population"})
#print(df_pdens_fulltime)

#drugs
df_drugs = pd.read_csv("drug_use_2015_16_21_cleaned.csv")
filter_fulltime_drugs = (df_drugs["Year"] == 2021)
df_drugs_filtered = df_drugs[filter_fulltime_drugs]
df_drugs_filtered = df_drugs_filtered.drop(columns=['Year'])
df_drugs_filtered = df_drugs_filtered.set_index("State")
df_drugs_filtered = df_drugs_filtered.rename(columns={
    'Illicit Drug Use in the Past Month':'Illicit_Drug_Use',
    'Marijuana Use in the Past Month':'Marijuana_Use',
    'Illicit Drug Use Other Than Marijuana in the Past Month':'Illicit_Drug_Use_Other_Than_Marijuana',
    'Binge Alcohol Use in the Past Month': 'Binge_Alcohol_Use',
    'Illicit Drug Use Disorder in the Past Year': 'Illicit_Drug_Use_Disorder',
    'Serious Mental Illness in the Past Year': 'Serious_Mental_Illness',
    'Any Mental Illness in the Past Year':'Any_Mental_Illness'
})
print(df_drugs_filtered)


#merging
df_out = pd.merge(df_out, df_religion, left_index=True, right_index=True)
df_out = pd.merge(df_out, df_pdens_fulltime, left_index=True, right_index=True)
df_out = pd.merge(df_out, df_drugs_filtered, left_index=True, right_index=True)
df_out = df_out.sort_index()
print(df_out)
df_out.to_csv("scatterplot_data_full_relative_drugsincl.csv")



