import axios from 'axios'

export const getList = (data) => {
    return axios.request({
        method: 'get',
        url: 'http://localhost:8086/order/findList',
        data,
    })
}

export const deleteList = (data) => {
    return axios.request({
        method: 'delete',
        url: 'http://localhost:8086/order/deleteOrderById?orderId=' + data,
    })
}

export const editList = (data) => {
    return axios.request({
        method: 'post',
        url: 'http://localhost:8086/order/saveOrder',
        data,
    })
}
