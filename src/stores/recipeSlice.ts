import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipies } from "../services/RecipieService"
import { Categories, Drink, Drinks, Recipie, SearchFilter } from "../types"

export type RecipiesSliceType = {
    categories : Categories,
    drinks: Drinks,
    selectedRecipie: Recipie,
    modal: boolean,
    fetchCategories: () => Promise<void>,
    searchRecipies: (searchFilter : SearchFilter) => Promise<void>,
    selectRecipie: (id: Drink['idDrink']) => Promise<void>,
    closeModal: () => void,
}

export const createRecipeSlice : StateCreator<RecipiesSliceType> = (set) => ({
    categories : {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipie : {} as Recipie,
    modal: false,

    fetchCategories: async() => {
        const categories = await getCategories();
        set({
            categories
        })
    },

    searchRecipies : async(searchFilter : SearchFilter) => {
        const drinks = await getRecipies(searchFilter);
        
        set({
            drinks
        })
    },
    selectRecipie : async(id) => {
        const selectedRecipie = await getRecipeById(id);
        set({
            selectedRecipie,
            modal: true
        })
    },
    closeModal: () => {
        set({
            modal: false,
            selectedRecipie: {} as Recipie
        })
    }
})