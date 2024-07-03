import { z } from "zod";
import { CategoriesApiResponseSchema } from "../utils/recipies-schema";



export type Categories = z.infer< typeof CategoriesApiResponseSchema>;