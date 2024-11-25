import Header from "../../shared/components/Header/Header";
import boy from "../../../assets/images/boy.svg"
import styles from './favoritelist.module.css'
import nodata from '../../../assets/images/nodata.png'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { imageBaseURL, privateAxiosInstance, USERs_URLs } from "../../../services/urls";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Nodata from "../../shared/components/NoData/Nodata";
import axios from "axios";
export default function FavoriteList() {


    const [favoriteList, setFavoriteList] = useState(null)
    const [recipieId, setRecipieId] = useState(null)
    const [isLoad, setIsLoad] = useState(false)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setRecipieId(id)
        setShow(true);
    }
    const getUserFavorites = ()=> {
        axios.get('https://upskilling-egypt.com:3006/api/v1/userRecipe',{
            headers : {
                Authorization : localStorage.getItem('token')
            }
        }).then((response)=>{
     
            
            setFavoriteList(response?.data?.data)
            
            
            
        }).catch((error)=>{console.log(error);
        })
    }
const removeItemFromList =()=>{
    setIsLoad(true)
    axios.delete(`https://upskilling-egypt.com:3006/api/v1/userRecipe/${recipieId} ` , {
        headers : {
            Authorization : localStorage.getItem('token')
        }
    }).then((response)=>{
        toast.success('item removed from favorites !')
        setShow(false)
        setIsLoad(false)
        getUserFavorites()
    }).catch((error)=>{
        console.log(error);
        setIsLoad(false)

        
    })
}
    useEffect(()=>{
        getUserFavorites()
    },[])
return <>
 <Header  img={boy} title ={'Favorite'} smallTitle ={'items'} desc={'You can now add your items that any user can order it from the Application and you can edit'}/>


{favoriteList?.length > 0 ? <>

    <div className="favoriteContainer container">
    <div className="d-flex flex-wrap "  >


        {
           favoriteList?.map((item)=> <div key={item.id} className={`${styles.favItem} favItem`}>
            <div className="favoriteItem position-relative">
              
            <img src={item?.recipe?.imagePath  ? `${imageBaseURL}${item?.recipe?.imagePath}` : nodata}  alt={item?.recipe?.name} className={`${styles.favImg} w-100`} />        
               
            <div className="caption px-2">
                
            <h4>{item?.recipe?.name}</h4>
           
            <p>{item?.recipe?.description}</p>
            <p>{item?.recipe?.price} EGP</p>
                </div>  

                <div className={styles.removeIcon}>
                    <button className="btn btn-outline-danger" onClick={()=>{handleShow(item?.id)}}> 
                    <i className="fa-regular fa-heart d-flex justify-content-center"></i>

                    </button>
                    </div>      
            </div>
        </div>)
        }
       
    </div>
</div>


      <Modal show={show} onHide={handleClose}>
  
        <Modal.Body className="py-5">Are you sure you want to remove item from favorite list ?</Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            cancel
          </Button>
          <Button variant="danger" onClick={removeItemFromList}>

            {isLoad ?  <i className='fa fa-spin fa-spinner'></i> : 'Remove'}
          </Button>
        </Modal.Footer>
      </Modal>
</> : <Nodata/>}

</>
}
