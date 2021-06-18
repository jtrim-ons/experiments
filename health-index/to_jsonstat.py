import pandas as pd
import json

def make_jsonstat(df, labels):
    result = {
        "version": "2.0",
        "class": "dataset",
        "dimension": {},
        "id": [],
        "size": []
    }
    values_len = 1
    dimension_lengths = []
    cols = list(df)
    for col in cols[:-1]:
        uniques = df[col].unique()
        values_len *= len(uniques)
        result["id"].append(col)
        result["size"].append(len(uniques))
        result["dimension"][col] = {
            "label": col,
            "category": {
                "index": dict((cat, i) for i, cat in enumerate(uniques))
            }
        }
        if col in labels:
            result["dimension"][col]["category"]["label"] = labels[col]
    result["value"] = [None] * values_len

    value_col = cols[-1]
    for row in df.itertuples():
        m = 1
        value_index = 0
        for col, sz in reversed(list(zip(result["id"], result["size"]))):
            index = result["dimension"][col]["category"]["index"][getattr(row, col)]
            value_index += index * m
            result["value"][value_index] = getattr(row, value_col)
            m *= sz

    return result

df = pd.read_csv("hibetadatatablesv2.csv")

df["Ind"] = df["IndexLevel"] + ":" + df["IndicatorOrGrouping"]
df["Year"] = df["Year"].astype(str)

areas = df[["AreaCode", "AreaName", "GeographyType"]].drop_duplicates()
labels = {"AreaCode": dict((x.AreaCode, x.AreaName) for x in areas.itertuples())}

main_table = df[["AreaCode", "Ind", "Year", "Value"]].drop_duplicates()

result = make_jsonstat(main_table, labels)
print(json.dumps(result, indent=2))

