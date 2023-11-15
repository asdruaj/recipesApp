import User from '../model/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../lib/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export async function register (req, res) {
  try {
    const { email, username, password } = req.body

    const userFound = await User.findOne({ email })

    if (userFound) return res.status(400).json([{ message: 'The Email is Already in Use' }])
    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({
      email,
      username,
      password: passwordHash
    })

    const userSaved = await newUser.save()
    const token = await createAccessToken({ id: userSaved._id })

    res.cookie('token', token)

    res.json({
      id: userSaved._id,
      email: userSaved.email,
      username: userSaved.username,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt
    })
  } catch (error) {
    res.status(500).json([error.message])
  }
}

export async function login (req, res) {
  try {
    const { username, password } = req.body

    const userFound = await User.findOne({ username })

    if (!userFound) return res.status(400).json([{ message: 'User Not Found' }])

    const isMatch = await bcrypt.compare(password, userFound.password)

    if (!isMatch) return res.status(400).json([{ message: 'Invalid Password' }])

    const token = await createAccessToken({ id: userFound._id })

    res.cookie('token', token)
    res.json({
      id: userFound._id,
      email: userFound.email,
      username: userFound.username,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    })
  } catch (error) {
    res.status(500).json([error.message])
  }
}

export async function logout (req, res) {
  res.cookie('token', '', { expires: new Date(0) })
  return res.sendStatus(200)
}

export async function profile (req, res) {
  try {
    const { id } = req.user
    const userFound = await User.findById(id)

    if (!userFound) return res.status(400).json([{ message: 'User Not Found' }])

    res.json({
      id: userFound._id,
      email: userFound.email,
      username: userFound.username,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    })
  } catch (error) {
    return res.status(500).json([error.message])
  }
}

export function verifyToken (req, res) {
  const { token } = req.cookies

  if (!token) return res.status(401).json([{ message: 'No Token Authorization' }])

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json([{ mesage: 'Invalid Token' }])

    const userFound = await User.findById(user.id)

    if (!userFound) return res.status(401).json([{ message: 'No User Found' }])

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
    })
  })
}
