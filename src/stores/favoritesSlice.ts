import { StateCreator } from "zustand";
import { Recipie } from '../types/index';
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";
import { RecipiesSliceType } from "./recipeSlice";



export type FavoritesSliceType = {
    favorites : Recipie[],
    handleClickFavorite : (recipie: Recipie) => void,
    favoriteExist: (id: Recipie['idDrink']) => boolean,
    loadFromLocalStorage: () => void,
}

export const createFavoritesSlice : StateCreator<FavoritesSliceType & RecipiesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (recipie) => {
        if(get().favoriteExist(recipie.idDrink) ) {
            
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink!== recipie.idDrink)
            }))
            createNotificationSlice(set, get, api).showNotification({
                text: 'Se elimino correctamente', 
                error: false})
        }

        else {
            
            set((state) => ({
                favorites: [...state.favorites, recipie]
            }))

            createNotificationSlice(set, get, api).showNotification({
                text: 'Se Agrego correctamente', 
                error: false})
        }
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExist : (id) => {
        return get().favorites.some( favorite => favorite.idDrink === id)
    },

    loadFromLocalStorage : () => {
        const storageFavorite = localStorage.getItem('favorites');

        if ( storageFavorite ) {
            set({
                favorites: JSON.parse(storageFavorite)
            }) 
        }
    },
})