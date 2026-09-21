import dataset from "@/data/pincode/source.json";

type PincodeDataset = Record<
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

export function hasPincode(code: string) {
    return code in pincodeData;
}

