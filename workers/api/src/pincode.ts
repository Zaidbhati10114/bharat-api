import dataset from "../../../data/pincode/source.json";

export type PincodeDataset = Record<
    string,
    {
        state: string;
        stateLGD: string;
        districts: {
            district: string;
            districtLGD: string;
            blocks: string[];
        }[];
    }
>;

const pincodeData = dataset as PincodeDataset;

export function getPincode(code: string) {
    return pincodeData[code] ?? null;
}