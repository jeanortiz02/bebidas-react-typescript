import { create } from "zustand";
import { createRecipeSlice, RecipiesSliceType } from "./recipeSlice";
import { devtools } from "zustand/middleware";


export const useAppStore = create<RecipiesSliceType>()(devtools( (...a) => ({
    ...createRecipeSlice(...a)
})))