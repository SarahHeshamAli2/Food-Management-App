import{ useContext } from 'react'
import Header from '../../../shared/components/Header/Header'
import girl from '../../../../assets/images/girl.png'
import { AuthContext } from '../../../../context/AuthContext/AuthContext'
import FillRecipies from '../../../shared/components/FillRecipies/FillRecipies'

export default function Dashboard() {

  const {loginData}=useContext(AuthContext)
  
  return (
<>
<Header  img={girl} desc={'This is a welcoming screen for the entry of the application , you can now see the options'} smallTitle={loginData?.userName}  title={'welcome'}/>
<FillRecipies/>
</>
  )
}
