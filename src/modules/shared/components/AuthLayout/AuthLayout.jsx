import { Outlet, useLocation } from 'react-router-dom'
import logo from"../../../../assets/images/4 4.svg"

export default function AuthLayout() {
  const location = useLocation()
  console.log(location.pathname);
  //"col-md-5 bg-white rounded-2 px-5 py-4"
  
  return<>
  <div className='auth-container '>
    <div className="auth-overlay container-fluid">
        <div className="form-container row vh-100 justify-content-center align-items-center">
            <div className={`${location.pathname == '/register' ? 'col-md-8 px-0' : 'col-md-5 px-5'} bg-white rounded-2  py-4`}>
            <div className={`${location.pathname == '/register' ? 'col-md-6' : 'col-md-7'} logo  mx-auto`}>
                <img src={logo} alt="food-logo" className='w-100' />
            </div>
            <Outlet/>

            </div>
    

        </div>
    </div>
  </div>
  
  </>
}
