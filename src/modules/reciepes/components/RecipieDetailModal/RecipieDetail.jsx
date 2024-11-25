import { useState } from "react";
import { imageBaseURL } from "../../../../services/urls";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import nodata from '../../../../assets/images/nodata.png'
import { toast } from "react-toastify";
import axios from "axios";

export default function RecipieDetail({userImg,userEmail,show,from ,setShow, handleClose ,title, recipieId,recipieImg,isLoading,recipieTag,recipieName,recipiePrice,showAddButton}) {

        const [isLoaded, setIsLoaded] = useState(false)

  

    const handleAddToFavorites = async ()=>{
      
        setIsLoaded(true)
      await  axios.post(`https://upskilling-egypt.com:3006/api/v1/userRecipe/`,
          {recipeId : recipieId},
          {
          
          headers : {
            Authorization : localStorage.getItem('token')
          }
        }
      
      
      ).then((resp)=>{
            console.log(resp);
            setIsLoaded(false)
            setShow(false)
            toast.success('added  to favorites successfully')
            
        }).catch((error)=>{
            console.log(error);
            setIsLoaded(false)
            toast.error(error?.response?.data?.message || 'something went wrong')

        })
        
    }


  return (
    <>

<Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>{title}</Modal.Title>
  </Modal.Header>
  <Modal.Body >


    {

      from != "userList" ? <>
        <div className="text-center">
  {isLoading ? <i className='fa fa-spin fa-spinner'></i>:      <img src={recipieImg  ? `${imageBaseURL}${recipieImg}` : nodata}   className="recipieDetailsImg rounded" />
  }

  </div>
  <h3>{recipieName}</h3>
  <p>{recipieTag}</p>
  <span>{recipiePrice} {recipiePrice ? 'EGP':''}</span>
      </> :<>
      <div className="text-center">
  {isLoading ? <i className='fa fa-spin fa-spinner'></i>:      <img src={userImg  ? `${imageBaseURL}${userImg}` : nodata}   className="recipieDetailsImg rounded" />
  }

  </div>
  <h3>{userEmail}</h3>
  <p>{recipieTag}</p>
  <span>{recipiePrice} {recipiePrice ? 'EGP':''}</span>
      </>

    }


  </Modal.Body>
  <Modal.Footer>
          {
              showAddButton && from != 'userList' ?    <Button className="btn bg-transparent text-dark border-black" onClick={handleAddToFavorites}>

              {isLoaded ? <i className='fa fa-spin fa-spinner'></i> : 'add to favorites'}
            </Button> : ''
          }
 
  </Modal.Footer>
</Modal>  

    </>
  )
}
