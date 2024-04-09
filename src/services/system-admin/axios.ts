import axios from 'axios'

export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})
