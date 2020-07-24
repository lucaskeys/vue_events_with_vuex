import axios from 'axios';
import NProgress from 'nprogress'


const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000
  // throws an error if the API call takes longer than 10sec
})

apiClient.interceptors.request.use(config => {
  NProgress.start()
  return config
})

apiClient.interceptors.response.use(response => {
  NProgress.done()
  return response
})

// API calls
export default {
  getEvents(perPage, page) {
    return apiClient.get('/events?_limit' + perPage + '&_page=' + page) 
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  postEvent(event) {
    return apiClient.post('/events/', event)
  }
}