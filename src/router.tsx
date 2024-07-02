import { BrowserRouter, Routes, Route } from "react-router-dom"
import IndexPage from "./views/IndexPage"
import FavoritesPage from "./views/FavoritesPage"
import './index.css'
import Layout from "./layout/Layout"

export default function AppRouter() {
  return (
    <BrowserRouter>

            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/" element={<IndexPage/>} index />
                    <Route path="/favorites" element={<FavoritesPage/>} />
                </Route>
            </Routes>

    </BrowserRouter>
  )
}
