import React from 'react'
import Header from '../../../shared/components/Header/Header'
import girl from '../../../../assets/images/girl.png'

export default function Dashboard({loginData}) {
  return (
   <Header  img={girl} desc={'This is a welcoming screen for the entry of the application , you can now see the options'} smallTitle={loginData?.userName}  title={'welcome'}/>
  )
}
