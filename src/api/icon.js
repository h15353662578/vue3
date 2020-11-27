// import request from '@/utils/request'
import axios from 'axios'

// export function getIconList(params) {
//   return request({
//     url: '/icon/getList',
//     method: 'get',
//     params,
//   })
// }

export const deleteList = (data) => {
  return axios.request({
    method: 'DELETE',
    url: 'http://localhost:8080/user/deleteUserById?id=' + data,
  })
}


export const getList = (data) => {
  return axios.request({
    method: 'get',
    url: 'http://localhost:8080/user/findAll',
    data
  })
}

export const saveList = (data) => {
  return axios.request({
    method: 'post',
    url: 'http://localhost:8080/user/save',
    data,
  })
}