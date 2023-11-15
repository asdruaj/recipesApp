import Recipe from '../model/recipes.model.js'

export async function getRecipes (req, res) {
  try {
    const recipes = await Recipe.find().populate('user', ['username', 'email']).sort({ createdAt: -1 })

    res.json(recipes)
  } catch (error) {
    res.status(500).json([error.message])
  }
}

export async function getRecipe (req, res) {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('user', ['username', 'email'])

    if (!recipe) return res.status(404).json([{ message: 'Recipe not Found' }])

    res.json(recipe)
  } catch (error) {
    res.status(500).json([error.message])
  }
}
export async function getRecipesByUser (req, res) {
  try {
    const recipes = await Recipe.find({
      user: req.user.id
    }).populate('user', ['username', 'email']).sort({ createdAt: -1 })

    res.json(recipes)
  } catch (error) {
    res.status(500).json([error.message])
  }
}

export async function createRecipe (req, res) {
  try {
    const { title, description, ingredients, time, preparation, category } = req.body

    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      time,
      preparation,
      category,
      user: req.user.id
    })

    const recipeSaved = await newRecipe.save()
    res.json(recipeSaved)
  } catch (error) {
    return res.status(500).json([error.message])
  }
}

export async function updateRecipe (req, res) {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body)

    if (!recipe) return res.status(400).json([{ message: 'Recipe not Found' }])
    return res.json(recipe)
  } catch (error) {
    return res.status(500).json([error.message])
  }
}
export async function deleteRecipe (req, res) {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id)

    if (!recipe) return res.status(400).json([{ message: 'Recipe not Found' }])
    return res.status(204).json(recipe)
  } catch (error) {
    return res.status(500).json([error.message])
  }
}
