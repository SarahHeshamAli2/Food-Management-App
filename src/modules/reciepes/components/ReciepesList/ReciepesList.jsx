import  { useEffect, useState } from 'react'
import Header from '../../../shared/components/Header/Header'
import TableDetails from '../../../shared/components/TableDetails/TableDetails'
import DeleteConfirm from '../../../shared/components/DeleteConfirm/DeleteConfirm'
import boy from "../../../../assets/images/boy.svg"
import LoadingScreen from '../../../shared/components/LoadingScreen/LoadingScreen'
import {  imageBaseURL, privateAxiosInstance, RECIPIE_URLs } from '../../../../services/urls'
import { toast } from 'react-toastify'
import nodata from '../../../../assets/images/nodata.png'
import Nodata from '../../../shared/components/NoData/Nodata'
import EditToolsDropDown from '../../../shared/components/EditToolsDropDown/EditToolsDropDown'

export default function ReciepesList() {

  const [allRecipies, setAllRecipies] = useState(null)
  const [show, setShow] = useState(false);
  const [recipieId, setRecipieId] = useState(0)

  const handleClose = () => setShow(false);
  function handleShow(id) {
    setShow(true)
    setRecipieId(id)
    
  }
  let deleteSpecificRecipie = () =>{
    privateAxiosInstance.delete(RECIPIE_URLs.DELETE_RECIPIE(recipieId)).then((resp)=>{console.log(resp)
      toast.success('item deleted succussefully')

      setShow(false)
      getAllRecipes()
    }).catch((err)=>{console.log(err.response.data.message);
      setShow(false)
      toast.error(err?.response?.data?.message)
    })
      
    }
  const getAllRecipes =()=> {
    
    
    privateAxiosInstance.get(RECIPIE_URLs.GET_RECIPIES,{
      params : {pageSize :10 , pageNumber :1}
    }).then((resp)=>{console.log(resp);
      setAllRecipies(resp.data.data)
    }).catch((err)=>{console.log(err);
    })
  }

  useEffect(()=>{
    getAllRecipes()
  },[])
 return <>
 <Header  img={boy} title ={'Recipes'} smallTitle ={'items'} desc={'You can now add your items that any user can order it from the Application and you can edit'}/>

<TableDetails btnDetails={'Add New Item'} details={'You can check all details'} caption={'Recipe Table Details'}/>

<DeleteConfirm DeletedItem={deleteSpecificRecipie} handleClose={handleClose}   show ={show} title={'Delete This Recipe  ?'}/>
{allRecipies?.length == 0 ? <Nodata/> : <>
  {allRecipies ? <div className="table-container  table-responsive-sm ">
  <table className="table table-striped">
    <thead >
      <tr className=''>
        <th scope="col">Name</th>
        <th scope="col">Image</th>
        <th scope="col">Price</th>
        <th scope="col">description </th>
        <th scope="col">tag </th>
        <th scope="col">category </th>
        <th scope="col">Actions </th>
      </tr>
    </thead>
    <tbody>
      
    {
    allRecipies?.map((recipie)=>   <tr key={recipie?.id} className='tableR'>
   
    <td>{recipie?.name}</td>
    <td><img src={recipie?.imagePath  ? `${imageBaseURL}${recipie.imagePath}` : nodata}  alt={recipie.name} className=' rounded recipie-image' /></td>
    <td>{recipie?.price} EGP</td>
    <td>{recipie?.description?.split(' ').slice(0,6).join(' ')}</td>
    <td>{recipie.tag?.name}</td>
    <td>{recipie?.category[0]?.name}</td>
   
    <td>

     <EditToolsDropDown handleShow={handleShow} categoryId={recipie.id} />

    </td>
  </tr>)
   }
  
  
    </tbody>
  </table>
  </div> : <LoadingScreen/>}
</>}

 
 </>
}
