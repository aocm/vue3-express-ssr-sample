import axios from 'axios'

const getData = async (url, status400Message = '') => {
  try {
    const request = {
      method: 'get'
    }
    request.headers = {
      'Content-Type': 'application/json'
    }
    const response = await axios(url, request)
    return response.data
  } catch (error) {
    const response = error.response
  }
}
const postData = async (url, data = null, status400Message = '') => {
  const request = {
    method: 'post'
  }
  if (data) {
    request.headers = {
      'Content-Type': 'application/json'
    }
    request.data = data
  }
  try {
    const response = await axios(url, request)
    return response.data
  } catch (error) {
    const response = error.response
    if (response.status === 400 && status400Message) throw new Error(status400Message)
    if (response.status >= 400) throw new Error(response.statusText || response.data.message)
  }
}

export {
  getData,
  postData,
}
