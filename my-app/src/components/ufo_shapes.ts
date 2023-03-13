
import * as d3 from 'd3';

export const allShapes: { [key: string]: boolean } = {};
export type Shape = {
    id: number,
    type: string,
    tot: number
}

export async function getUfoShapes(verbose: boolean,
    source = "https://raw.githubusercontent.com/useless-fisualization-operation/ufo-datasets/main/DataSets/UfoShapes.csv"): Promise<Shape[]> {
    console.log("Loading UFO data from: " + source);
    const shapes: Shape[] = [];
    await d3.csv(source).then(data => {
        data.forEach(row => {
            if (row["ID"] === undefined || row["Shape"] === undefined || row["Tot"] === undefined) {
                if (verbose) console.log("UFO row missing data: " + row);
                return null;
            }
            allShapes[row.Shape] = true;
            shapes.push(
                {
                    id: Number(row.ID),
                    type: row.Shape,
                    tot: Number(row.Tot)
                }
            );
        });
    });
    if (verbose) console.log(shapes.length + " Shapes loaded.")
    return shapes;
}