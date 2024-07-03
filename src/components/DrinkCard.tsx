import { useAppStore } from "../stores/useAppStore"
import { Drink } from "../types"



type DrinkCardProps = {
    drink: Drink
}


export default function DrinkCard({drink} : DrinkCardProps) {

  const selectRecipie = useAppStore(state => state.selectRecipie);


  return (
    <div className="border shadow-lg ">
       <div className="overflow-hidden">
            <img 
              className="hover:scale-125 transition-transform hover:rotate-2"
              src={drink.strDrinkThumb} 
              alt={`Drink de ${drink.strDrink}`} />
       </div>

       <div className="p-5">
        <h2 className="text-2xl truncate">{drink.strDrink}</h2>
        <button
            type="button"
            onClick={() => selectRecipie(drink.idDrink)}
            className="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg"
        >
            Ver Receta
        </button>
       </div>
    </div>
  )
}
