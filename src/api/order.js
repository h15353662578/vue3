import axios from 'axios'

export const getList = (data) => {
    return axios.request({
        method: 'get',
        url: 'http://localhost:8086/order/findAll',
        data,
    })
}
