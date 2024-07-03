import { z } from "zod";
import { CategoriesApiResponseSchema, DrinkAPIResponse, DrinksAPIResponse, RecipeAPIResponseSchema, SearchFilterSchema } from "../utils/recipies-schema";



export type Categories = z.infer< typeof CategoriesApiResponseSchema>;
export type SearchFilter = z.infer< typeof SearchFilterSchema>;
export type Drinks = z.infer< typeof DrinksAPIResponse>;
export type Drink = z.infer< typeof DrinkAPIResponse>;
export type Recipie = z.infer< typeof RecipeAPIResponseSchema>;