export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body)
    next()
  } catch (error) {
    console.log(error.issues)
    return res.status(400).json(error.issues.map(issue => ({ message: issue.message })))
  }
}
