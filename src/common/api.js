import axios from "axios"
console.log("process.env.NODE_ENV ", process.env.NODE_ENV)
console.log(
  "process.env.VUE_APP_BACKEND_HOST ",
  process.env.VUE_APP_BACKEND_HOST
)
const api = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_HOST,
})

export default api
