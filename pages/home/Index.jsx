import About from '@/components/About'
import Campaigns from '@/components/Campaigns'
import Caroucel from '@/components/Caroucel'
import MenuWrapper from '@/components/product/MenuWrapper'
import Reservation from '@/components/Reservation'
import React from 'react'


const Index = () => {
  return (
    <div>
      <Caroucel/>
      <Campaigns/>
      <MenuWrapper/>
      <About/>
      <Reservation/>
     
    </div>
  )
}

export default Index