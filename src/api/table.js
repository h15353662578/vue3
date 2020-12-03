import axios from 'axios'

export const getList = (data) => {
  return axios.request({
    method: 'get',
    url: 'http://localhost:8080/store/findAll',
    data,
  })
}

export const deleteList = (data) => {
  return axios.request({
    method: 'delete',
    url: 'http://localhost:8080/store/deleteStoreById?id=' + data
  })
}

export const editList = (data) => {
  return axios.request({
    method: 'post',
    url: 'http://localhost:8080/store/saveStore',
    data,
  })
}


