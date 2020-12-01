import axios from 'axios'

export const getList = (data) => {
  return axios.request({
    method: 'get',
    url: 'http://localhost:8080/user/findAll',
    data
  })
}

export const editList = (data) => {
  return axios.request({
    method: 'post',
    url: 'http://localhost:8080/user/save',
    data,
  })
}