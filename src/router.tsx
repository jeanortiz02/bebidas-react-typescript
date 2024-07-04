import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import IndexPage from "./views/IndexPage"
import './index.css'
import Layout from "./layout/Layout"

const FavoritesPage = lazy(() => import('./views/FavoritesPage'))


export default function AppRouter() {
  return (
    <BrowserRouter>

            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/" element={<IndexPage/>} index />
                    <Route path="/favorites" element={
                      <Suspense fallback="Cargando....">
                        <FavoritesPage/>
                      </Suspense>
                    } />
                </Route>
            </Routes>

    </BrowserRouter>
  )
}
