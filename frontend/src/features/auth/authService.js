import axios from 'axios'

const API_URL = '/api/users' //register user

//Register User
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
  // {   _id: user._id,
  //     name: user.name,
  //     email: user.email,
  //     token: generateToken(user._id)
  // }
}

//Logout User
const logout = () => localStorage.removeItem('user')

// Login User
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
  // {   _id: user._id,
  //     name: user.name,
  //     email: user.email,
  //     token: generateToken(user._id)
  // }
}

const authService = {
  register,
  logout,
  login,
}

export default authService
