import axios from 'axios'

export const getList = (data) => {
    return axios.request({
        method: 'get',
        url: 'http://localhost:8086/user/findAll',
        data,
    })
}

export const editList = (data) => {
    return axios.request({
        method: 'post',
        url: 'http://localhost:8086/order/saveOrder',
        data,
    })
}


export const deleteList = (data) => {
    return axios.request({
        method: 'delete',
        url: 'http://localhost:8086/order/deleteOrderById?orderId=' + data,
    })
}

export const addUser = (data) => {
    return axios.request({
        method: 'put',
        url: 'http://localhost:8086/user/addUser',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
