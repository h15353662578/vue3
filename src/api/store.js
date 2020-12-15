import axios from 'axios'

export const addStore = (data) => {
    return axios.request({
        method: 'put',
        url: 'http://localhost:8086/store/addStore',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
