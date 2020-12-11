import axios from 'axios'


export const addUser = (data) => {
    return axios.request({
        method: 'put',
        url: 'http://localhost:8080/user/addUser',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}