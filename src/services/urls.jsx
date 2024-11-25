import axios from "axios"
if(localStorage.getItem('token') ) {
    console.log('eshta');
    
}
else {
    console.log('mesh eshta');
    
}

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
    RESET_PASSWORD : 'Users/Reset',
    VERIFY_USER : 'Users/verify',
    REGISTER_USER : 'Users/Register',
    CHANGE_PASSWORD : 'Users/ChangePassword',
    GET_CURRENT_USER : 'Users/currentUser',
    ADD_TO_FAVORITES : 'userRecipe',
    GET_FAVORITE_LIST :'userRecipe',
REMOVE_FAVORITE_ITEM : (id)=> `userRecipe/${id}`,
GET_USER_BY_ID : (id)=> `Users/${id}`,
GET_ALL_USERS : 'Users',
DELETE_USER : (id)=> `Users/${id}`,

}
export const FAVORITES = {
    ADD_FAV_LIST : 'userRecipe/'
}


export const CATEGORY_URLs = {


   HANDLE_CATEGORIES : `Category/`,
    ToGGLE_CATEGORY :(categoryId)=> `Category/${categoryId}`
}

export const RECIPIE_URLs = {
    GET_RECIPIES : `Recipe/`,
    GET_RECIPIE_BY_ID : (id)=> `Recipe/${id}`,
    UPDATE_RECIPIE : (id)=> `Recipe/${id}`,
    ADD_RECIPIE : `Recipe/`,
    DELETE_RECIPIE :(recipieId)=> `Recipe/${recipieId}`
}


export const TAGS_URL = {
    GET_TAGS : `tag/`
    
}


