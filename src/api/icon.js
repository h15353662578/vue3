import axios from 'axios'

export const getList = (data) => {
  return axios.request({
    method: 'get',
    url: 'http://localhost:8086/user/findAll',
    data
  })
}

export const editList = (data) => {
  return axios.request({
    method: 'post',
    url: 'http://localhost:8086/user/save',
    data,
  })
}

export const likeUser = (data) => {
  return axios.request({
    method: 'get',
    url: 'http://localhost:8086/user/likename',
    data,
  })
}