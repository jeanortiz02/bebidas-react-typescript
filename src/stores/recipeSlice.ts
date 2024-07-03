import { StateCreator } from "zustand"
import { getCategories } from "../services/RecipieService"
import { Categories } from "../types"

export type RecipiesSliceType = {
    categories : Categories,
    fetchCategories: () => Promise<void>
}

export const createRecipeSlice : StateCreator<RecipiesSliceType> = (set) => ({
    categories : {
        drinks: []
    },
    fetchCategories: async() => {
        const categories = await getCategories();
        set({
            categories
        })
    }
})