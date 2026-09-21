import { z } from "zod";

export const pincodeSchema = z
    .string()
    .regex(/^\d{6}$/, "PIN code must contain exactly 6 digits");