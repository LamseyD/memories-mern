import axios from 'axios'
//api connector here


const API = axios.create({ baseURL: 'https://mern-mem.herokuapp.com/'})


//send token to backend for middleware
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')){
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  } //put authorization for header

  return req;
})

export const fetchPosts = () => API.get('/post')

export const createPost = (newPost) => API.post('/post', newPost) 

export const updatePost = (id, updatedPost) => API.patch(`/post/${id}`, updatedPost)

export const deletePost = (id) => API.delete(`/post/${id}`)

export const likePost = (id) => API.patch(`/post/${id}/likePost`)

export const signIn = (formData) => API.post('/user/signin', formData)

export const signUp = (formData) => API.post('/user/signup', formData)