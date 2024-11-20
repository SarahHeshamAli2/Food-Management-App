import { imageBaseURL } from '../../../../services/urls';
import logo from '../../../../assets/images/aazen4lhc.webp'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
export default function Navbar({loginData,profileImage,isLoading}) {
console.log();



  
    
 return <>
 <div className="profileInfo d-flex align-items-center justify-content-end  p-2 navbar rounded mt-3">
 <img src={profileImage  !=null ? imageBaseURL +profileImage : logo } alt="profile avatar" className='navbarProfileImage'/>


  <h6 className='mx-2'>{loginData?.userName}</h6>
 </div>
 
 </>
}
