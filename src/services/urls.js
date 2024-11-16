import axios from "axios"


const baseURL  = 'https://upskilling-egypt.com:3006/api/v1/'
export const imageBaseURL = 'https://upskilling-egypt.com:3006/'

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


   HANDLE_CATEGORIES : `Category/`,
    ToGGLE_CATEGORY :(categoryId)=> `Category/${categoryId}`
}

export const RECIPIE_URLs = {
    GET_RECIPIES : `Recipe/`,
    DELETE_RECIPIE :(recipieId)=> `Recipe/${recipieId}`
}

