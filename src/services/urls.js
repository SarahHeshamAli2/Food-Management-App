import axios from "axios"


const baseURL  = 'https://upskilling-egypt.com:3006/api/v1/'

export const axiosInstance = axios.create({
    baseURL 
})

export const privateAxiosInstance = axios.create ({
    baseURL ,
    headers : {Authorization : localStorage.getItem('token')}
})

export const USERs_URLs = {
    USER_LOGIN : 'Users/Login',
    FORGET_PASSWORD : 'Users/Reset/Request',
    RESET_PASSWORD : 'Users/Reset'

}

export const CATEGORY_URLs = {
    GET_CATEGORIES : `Category/`,
    DELETE_CATEGORY :(categoryId)=> `Category/${categoryId}`
}

export const RECIPIE_URLs = {
    GET_RECIPIES : `Recipe/`,
    DELETE_RECIPIE :(recipieId)=> `Recipe/${recipieId}`
}

