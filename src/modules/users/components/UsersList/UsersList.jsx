import Header from "../../../shared/components/Header/Header";
import boy from "../../../../assets/images/boy.svg"
import TableDetails from "../../../shared/components/TableDetails/TableDetails";
import EditToolsDropDown from "../../../shared/components/EditToolsDropDown/EditToolsDropDown";
import LoadingScreen from "../../../shared/components/LoadingScreen/LoadingScreen";
import { imageBaseURL, privateAxiosInstance, USERs_URLs } from "../../../../services/urls";
import nodata from '../../../../assets/images/nodata.png'
import {   useEffect, useState } from "react";
import DeleteConfirm from "../../../shared/components/DeleteConfirm/DeleteConfirm";
import { toast } from "react-toastify";
import axios from "axios";
export default function UsersList() {
  const [userList, setUserList] = useState(null)
  const [show, setShow] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [userId, setUserId] = useState(0);
  let [currPage , setCurrPage] = useState(0)

  const scroll = () =>{
    const table = document.getElementById('userTable')
    const tableOffset = table.offsetTop
  console.log(table.offsetTop);
  scrollTo({top : tableOffset })
  
} 
   
  const nextBtn = (e) => {
    if(currPage < numberOfPages?.length) {
      getAllUsers(currPage+1,30,setNumberOfCurrentPage(e.target.innerText) )
      scroll()
    } 
    else {
return      
    }
  }

  const prevBtn = (e)=> {
    getAllUsers(currPage-1,30,setNumberOfCurrentPage(e.target.innerText) ) 
    scroll()
  }

  const [numberOfPages, setNumberOfPages] = useState(null);
  const handleClose = () => setShow(false);
  function handleShow(id) {
    setShow(true)
    setUserId(id)
    console.log(id);
   
    
    
  }
  const [numberOfCurrentPage,setNumberOfCurrentPage]= useState(0)
const getUserEmail =(e)=> {
console.log(e.target.value);
getAllUsers(1,30,e.target.value)

}

  const getAllUsers = (pageNumber,pageSize,userName)=>{
axios.get(`https://upskilling-egypt.com:3006/api/v1/Users` , {headers : {Authorization : localStorage.getItem('token') },


params : {pageNumber :pageNumber , pageSize :pageSize , userName:userName}}



).then((response)=>{console.log(response.data.data);
  setUserList(response.data.data)
  setNumberOfPages(Array(response?.data?.totalNumberOfPages).fill().map((_,i)=>i+1))
  setCurrPage(response?.data?.pageNumber)

}).catch((error)=>{
  console.log(error);
  
})


  }


  const deleteUser = ()=>{
    setIsLoad(true)
    axios.delete(`https://upskilling-egypt.com:3006/api/v1/Users/${userId}`,{
      headers : {Authorization : localStorage.getItem('token')}
    }).then((response)=>{
      setIsLoad(false)
      console.log(response);
      setShow(false)
      getAllUsers(30)
      toast.success('user deleted successfully')
    }).catch((error)=>{
      console.log(error);
      setIsLoad(false)
      setShow(false)
      
    })
  }
  useEffect(()=>{

    getAllUsers(1,30)
  },[])
return <>
 <Header  img={boy} title ={'Users'} smallTitle ={'List'} desc={'You can now add your items that any user can order it from the Application and you can edit'}/>

<TableDetails caption={'User Table Details'} details={'You can check all details'} btn={false}/>



 <>

  {userList ? <div className="table-container  table-responsive-sm ">
    <div className="col-md-6">
    <input type="text" placeholder='search by user name' className='form-control my-2'  onChange={(e)=>getUserEmail(e)}/>
    </div>


    {
      userList.length >0 ?   <>
      
      <table id="userTable" className="table table-striped">
      <thead >
        <tr className=''>
          <th scope="col">Name</th>
          <th scope="col">Image</th>
          <th scope="col">Email</th>
          <th scope="col">Phone  </th>
          <th scope="col">Country </th>
             <th scope="col">Actions </th>
  
        </tr>
      </thead>
      <tbody>
      <DeleteConfirm isLoading={isLoad} DeletedItem={deleteUser} handleClose={handleClose}   show ={show} title={'Delete This user  ?'}/>
  
      {
      userList?.map((user)=>   <tr key={user?.id} className='tableR'>
     
      <td>{user?.userName}</td>
      <td><img src={user?.imagePath  ? `${imageBaseURL}${user.imagePath}` : nodata}  alt={user.name} className=' rounded recipie-image' /></td>
      <td>{user?.email}  </td>
      <td>{user?.phoneNumber}</td>
      <td>{user?.country}</td>
     
      <td>
  
       <EditToolsDropDown  handleShow={()=>{handleShow(user?.id)}} from={'userList'}  />
   
      </td>
    </tr>)
     }
  
    
      </tbody>
    </table>
  
    <nav aria-label="Page navigation example">
    <ul className="pagination">
      <li className="page-item">
        <a className="page-link" onClick={(e)=>prevBtn(e)} aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
  
      {numberOfPages?.map((numberOfPage)=>     
      <li  key={numberOfPage}  onClick={(e)=> getAllUsers(numberOfPage,30,setNumberOfCurrentPage(e.target.innerText),scroll())}   className="page-item">
        
        <a className={`page-link ${numberOfPage == numberOfCurrentPage || currPage == numberOfPage? "active"   :  ''}`} >{numberOfPage}  </a>
       
        </li>
  
     
  )}
  
      <li className="page-item">
        <a  className="page-link" onClick={(e)=>nextBtn(e)} aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav> 
      </>: ''
    }

  </div> : <LoadingScreen/>}
</>
</>
}
