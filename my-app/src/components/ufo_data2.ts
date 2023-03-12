
import * as d3 from 'd3';

export type Ufo2 = {
    id: number,
    id_ref_loc: number,
    id_ref_shape: number,
    date: Date,
    duration: string,
    summary: string,
    images: string,
    hoax: string,
    madar: string,
    url: string,
    urlImage: string,
}

export type Ufos = {
    ufos: Ufo2[],
    location: string,
    state: string,
    projection: [number, number]
    tot: number
}

export async function getUfoData2(verbose:boolean,
    source= "https://raw.githubusercontent.com/useless-fisualization-operation/ufo-datasets/main/DataSets/UfoData.csv"): Promise<Ufo2[]> {
    console.log("Loading UFO data from: " + source);
    const ufos: Ufo2[] = [];
    await d3.csv(source).then(data => {
        data.forEach(row => {if (
            row["ID_REF_LOC"] === undefined || 
            row["ID_REF_SHAPE"] === undefined ||  
            row["Date"] === undefined || 
            row["Duration"] === undefined || 
            row["Summary"] === undefined || 
            row["Images"] === undefined || 
            row["Url"] === undefined || 
            row["UrlImage"] === undefined ||
            row["Hoax"] === undefined || 
            row["Madar"] === undefined) {
                if(verbose) console.log("UFO row missing data: " + row);
                return null;
            }
    
            const ufo_date = new Date(row.Date);
            ufos.push(
                    {
                        id: 0,
                        id_ref_loc: Number(row.ID_REF_LOC),
                        id_ref_shape: Number(row.ID_REF_SHAPE),
                        date: ufo_date,
                        duration: row.Duration,
                        summary: row.Summary,
                        images: row.Images,
                        hoax: row.Hoax,
                        madar: row.Madar,
                        url: row.Url,
                        urlImage: row.UrlImage
                    }
                );
        });
    });
    if(verbose) console.log(ufos.length + " UFOs loaded.")
    return ufos;
}