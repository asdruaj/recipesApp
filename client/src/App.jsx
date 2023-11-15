import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import Recipes from './pages/Recipes'
import RecipeForm from './pages/RecipeForm'
import Profile from './pages/Profile'
import Store from './pages/Store'
import PrivateRoutes from './PrivateRoutes'
import { AuthProvider } from './context/AuthContext'
import RecipesByUser from './pages/RecipesByUser'
import { RecipesProvider } from './context/RecipesContext'
import NavBar from './components/NavBar'
import Recipe from './pages/Recipe'
import About from './pages/About'

function App () {
  return (
    <AuthProvider>
      <RecipesProvider>

        <NavBar />
        <Routes>
          <Route element={<HomePage />} path='/' />
          <Route element={<Login />} path='/login' />
          <Route element={<Register />} path='/register' />
          <Route element={<Recipes />} path='/recipes' />
          <Route element={<Recipe />} path='/recipes/:id' />
          <Route element={<About />} path='/about' />
          <Route element={<Store />} path='/store' />

          <Route element={<PrivateRoutes />}>
            <Route element={<RecipeForm />} path='/new-recipe' />
            <Route element={<Profile />} path='/profile' />
            <Route element={<RecipesByUser />} path='/profile/recipes' />
            <Route element={<RecipeForm />} path='/profile/recipes/:id' />
          </Route>

        </Routes>
      </RecipesProvider>
    </AuthProvider>

  )
}

export default App
