import { imageBaseURL } from '../../../../services/urls';
import logo from '../../../../assets/images/aazen4lhc.webp'
import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';
export default function Navbar() {
const {   loginData , profileImage
} = useContext(AuthContext)


  
    
 return <>
 <div className="profileInfo d-flex align-items-center justify-content-end  p-2 navbar rounded mt-3">
 <img src={profileImage  !=null ? imageBaseURL +profileImage : logo } alt="profile avatar" className='navbarProfileImage'/>


  <h6 className='mx-2'>{loginData?.userName}</h6>
 </div>
 
 </>
}
