import  { useContext,useEffect,useState } from 'react'
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
import useRecipes from '../../../CustomHooks/useRecipes'
import RecipieDetail from '../RecipieDetailModal/RecipieDetail'
import { PaginationContext } from '../../../../context/PaginationContext'
import useCategories from '../../../CustomHooks/useCategories'
import useTags from '../../../CustomHooks/useTags'

export default function ReciepesList() {
  

    const {categories}=useCategories()
    console.log(categories);
    
    const{tagsList}=useTags()




  
  const{numberOfPages,prevBtn,nextBtn}=useContext(PaginationContext)
  const{recipiesList,trigger,fetchFunction,currPage,setCatValue,catValue ,categoryValue,tagValue}=useRecipes()
  console.log(recipiesList);
  
  const [categoryName, setCategoryName] = useState('')



  const [show, setShow] = useState(false);
  const [recipieId, setRecipieId] = useState(0)

  const [numberOfCurrentPage,setNumberOfCurrentPage]= useState(0)
  const [nameValue,setNameValue]= useState('')

const getCategoryById = (id)=>{
  privateAxiosInstance.get(`https://upskilling-egypt.com:3006/api/v1/Category/${id}`).then((res)=>{
    setCategoryName(res.data.name)
  }).catch((error)=>{console.log(error);
  })
}







  const handleClose = () => setShow(false);
  function handleShow(id) {
    setShow(true)
    setRecipieId(id)
    
  }
  let deleteSpecificRecipie = () =>{
    privateAxiosInstance.delete(RECIPIE_URLs.DELETE_RECIPIE(recipieId)).then(()=>{
      toast.success('item deleted succussefully')
        trigger()
      setShow(false)
    }).catch((err)=>{console.log(err.response.data.message);
      setShow(false)
      toast.error(err?.response?.data?.message)
    })
      
    }
    



  const getNameValue = async (e)=>{
    fetchFunction(1,5,e.target.value,catValue,tagValue)
setNameValue(e.target.value)
    

  }

  const getCategoryValue = (e)=>{
    setCatValue({category:e.target.value , tag:tagValue?tagValue:''})

    fetchFunction(1,9,nameValue,e.target.value,tagValue)
    
      if(e.target.value == '' ) {
        setCatValue({category:'',tag:tagValue})
      }

      getCategoryById(e.target.value)
    

  }
  const getTagValue = (e)=>{


      
    setCatValue({tag:e.target.value,category:categoryValue ? categoryValue : ''})

    if(e.target.value == '') {
      setCatValue({tag:'',category:categoryValue})
    }
    

    fetchFunction(1,9,nameValue,categoryValue,e.target.value)



  }
useEffect(()=>{

  if(catValue.get('category')) {
    getCategoryById(categoryValue)

  }
},[])
 return <>
 <Header  img={boy} title ={'Recipes'} smallTitle ={'items'} desc={'You can now add your items that any user can order it from the Application and you can edit'}/>
<TableDetails btn={true} nav={true} btnDetails={'Add New Item'} details={'You can check all details'} caption={'Recipe Table Details'}/>
<DeleteConfirm DeletedItem={deleteSpecificRecipie} handleClose={handleClose}   show ={show} title={'Delete This Recipe  ?'}/>
 <>
  {recipiesList?.data
 ? 
 <>

 <div className="searchContainer row my-3">


 
    <div className="col-md-6">
    <input type="text" placeholder='search here' value={nameValue} className='form-control' onChange={(e)=>getNameValue(e)} />
    </div>
    <div className="col-md-2">
    <select onChange={(e)=>{getTagValue(e)}}  placeholder='Recipe name' type="text" className='form-control' 
        >
                      <option value=''>Tag</option>

          <>
        {tagsList?.map(({name,id})=> <option key={id} value={id} selected={tagValue == id}>
{name}


</option>)}
        
          </>
           </select>    </div>
    <div className="col-md-2">
    <select onChange={(e)=>{getCategoryValue(e)}}  type="text" className='form-control' 
        >

          
                      <option value=''>{ 'category'}</option>

          <> 


          {categories?.data?.map((category) =>     <  option selected={category?.id == categoryValue } key={category?.id} value={  category?.id} > 
        
          {category?.name? category?.name: categoryName}</option>)}
      
        
          </>
           </select>    </div>
 </div>












{
  recipiesList?.data?.length > 0 ?  <div className="table-container  table-responsive-sm ">
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
    recipiesList?.data?.map((recipie)=>   <tr key={recipie?.id} className='tableR'>
    <td>{recipie?.name}</td>
    {console.log(recipie?.imagePath)
    }
    <td><img src={recipie?.imagePath  ? `${imageBaseURL}${recipie.imagePath}` : nodata}  alt={recipie.name} className=' rounded recipie-image' /></td>
    <td>{recipie?.price}  </td>
    <td>{recipie?.description?.split(' ').slice(0,6).join(' ')}</td>
    <td>{recipie.tag?.name} </td>
    <td>{recipie?.category[0]?.name}</td>

   
    <td>

     <EditToolsDropDown from={'recipe'} nav={true} handleShow={handleShow} categoryId={recipie.id} />
 
    </td>


  </tr>)
  
   }
   
      <RecipieDetail />

  
    </tbody>
  </table>
  <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" onClick={(e)=>prevBtn(fetchFunction,currPage,setNumberOfCurrentPage,e)}   aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>

    {numberOfPages?.map((numberOfPage)=>  
       
    <li  key={numberOfPage}  onClick={(e)=> fetchFunction(numberOfPage,9 , setNumberOfCurrentPage(e.target.innerText) , 
    )}   className="page-item">
   
      <a   className={`page-link ${numberOfPage == numberOfCurrentPage || currPage == numberOfPage && currPage !=1? "active" :''}`} >{numberOfPage}  </a>
     
      </li>

   
)}

    <li className="page-item">
      <a className="page-link" onClick={(e)=>nextBtn(currPage,numberOfPages,fetchFunction,setNumberOfCurrentPage,e)}  aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>

</nav>

  </div>  : <Nodata/>
}


 </>
 
 
: <LoadingScreen/>}
</>

 
 </>
}
