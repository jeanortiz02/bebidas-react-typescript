import { create } from "zustand";
import { createRecipeSlice, RecipiesSliceType } from "./recipeSlice";


export const useAppStore = create<RecipiesSliceType>( (...a) => ({
    ...createRecipeSlice(...a)
}))