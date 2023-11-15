import axios from 'axios'

export const fetchProducts = async () => {
  try {
    const res = await axios.get('https://api.edamam.com/api/food-database/v2/parser?app_id=ddc6358c&app_key=7d1dcad26c3f5603b69f56bcd9dac3a0&nutrition-type=cooking')

    const products = res.data.hints
    console.log(products)

    return products
  } catch (error) {
    console.log(error)
  }
}
