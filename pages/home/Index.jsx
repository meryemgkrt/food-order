import About from '@/components/About'
import Campaigns from '@/components/Campaigns'
import Caroucel from '@/components/Caroucel'
import Customer from '@/components/customer/Customer'
import Footer from '@/components/layout/Footer'
import MenuWrapper from '@/components/product/MenuWrapper'
import Reservation from '@/components/Reservation'
import React from 'react'


const Index = () => {
  return (
    <div className="scrollbar-custom">
      <Caroucel/>
      <Campaigns/>
      <MenuWrapper/>
      <About/>
      <Reservation/>
      <Customer/>
      
     
     
    </div>
  )
}

export default Index