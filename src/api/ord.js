import axios from 'axios'

export const getList = (data) => {
    return axios.request({
        method: 'get',
        url: 'http://localhost:8080/order/findList',
        data,
    })
}

export const deleteList = (data) => {
    return axios.request({
        method: 'delete',
        url: 'http://localhost:8080/order/deleteOrderById?orderId=' + data,
    })
}