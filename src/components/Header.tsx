import { useEffect, useMemo, useState, ChangeEvent, FormEvent } from "react";
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore";

export default function Header() {

  const [searchFilters, setSearchFilters] = useState({
    ingredient: '',
    category: ''
  })
  const {pathname} = useLocation();
  const isHome = useMemo( () => pathname === '/', [pathname]);
  const fetchCategories = useAppStore(state => state.fetchCategories)
  const searchRecipies = useAppStore(state => state.searchRecipies)
  const categories = useAppStore( state => state.categories.drinks);
  const showNotification = useAppStore( state => state.showNotification);

  useEffect( () => {
    fetchCategories();
  }, [])

  const handleChange = ( e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
      setSearchFilters({
        ...searchFilters,
        [e.target.name] : e.target.value
      })
  }

  const handleSubmit = ( e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // hacer la busqueda con los filtros

    if ( Object.values(searchFilters).includes('') ) {
      showNotification({error: true, text: 'Todos los campos son obligatorios'});
      return;
    }

    // Consultar las recetas
    searchRecipies(searchFilters);
  }

  return (
    <header className={ isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}>
        <div className="mx-auto container px-5 py-16">
            <div className=" flex justify-between items-center">
                <div>
                    <img className="w-32 " src="/logo.svg" alt="logotipo" />
                </div>


                <nav className="flex gap-4">
                  <NavLink 
                    to={'/'}
                    className={({isActive}) => 
                      isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                    }
                  >Inicio</NavLink>

                  <NavLink 
                    to={'/favorites'}
                    className={({isActive}) => 
                      isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                    }
                  >Favoritos</NavLink>
                </nav>
            </div>

            {isHome && (
              <form  
                onSubmit={handleSubmit}
                className="md:w1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
              >
                  <div className="space-y-4">
                    <label 
                      htmlFor="ingredient"
                      className="block text-white uppercase font-extrabold text-lg"
                    >Nombre o Ingredientes</label>

                    <input 
                      type="text"
                      id="ingredient"
                      name="ingredient"
                      className="p-3 w-full rounded-lg focus:outline-none" 
                      placeholder="Nombre o ingrediente. Ej. Vodka, Tequila, Coffee"
                      onChange={ handleChange }
                      value={ searchFilters.ingredient}
                    />
                  </div>

                  <div className="space-y-4">
                    <label 
                      htmlFor="category"
                      className="block text-white uppercase font-extrabold text-lg"
                    >Categoria</label>

                    
                    <select 
                      id="category"
                      name="category"
                      className="p-3 w-full rounded-lg focus:outline-none" 
                      onChange={ handleChange }
                      value={ searchFilters.category}
                    >
                      <option value=''>-- Seleccione ---</option>
                      {categories.map(category => (
                        <option key={category.strCategory} value={category.strCategory}>
                          {category.strCategory}
                        </option>
                      ))}
                    </select>
                  </div>

                  <input 
                    type="submit" 
                    value='Buscar'
                    className="uppercase text-white font-extrabold cursor-pointer bg-orange-700 hover:bg-orange-900 w-full p-2 rounded-lg"
                  />
              </form>
            )}
        </div>
    </header>
  )
}
