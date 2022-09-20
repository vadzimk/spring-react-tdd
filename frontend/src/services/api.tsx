import axios from 'axios'

export const signup = (user:any) => {
    return axios.post('/api/1.0/users', user)
}

