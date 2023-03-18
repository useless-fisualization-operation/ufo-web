import pandas as pd
import numpy as np

df_drugs = pd.read_csv("drug_use_2015_16_21.csv")
df_drugs = df_drugs.set_index(["State", "Year"])
print(df_drugs)
df_drugs = round(df_drugs/100, 4)
print(df_drugs)

df_drugs.to_csv("drug_use_2015_16_21_cleaned.csv", index=True)

