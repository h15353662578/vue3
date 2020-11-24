import axios from 'axios'

export const getList = (data) => {
    return axios.request({
        method: 'get',
        url: 'http://localhost:8080/orderUser/findAll',
        data,
    })
}

export const deleteList = (data) => {
    return axios.request({
        method: 'delete',
        url: 'http://localhost:8080/orderUser/deleteOrderUserById?orderId=' + data,
    })
}

export const addList = (data) => {
    return axios.request({
        methoc: 'put',
        url: 'http://localhost:8080/orderUser/addOrderUser',
        data,
    })
}