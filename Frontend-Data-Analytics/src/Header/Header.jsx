//import { useState } from 'react'
import './Header.css'
import ActiveUser from './ActiveUser.jsx'
import Logo from './Logo.jsx'
import SearchBar from './SearchBar.jsx'

const Header = () => {

  return (
    <div className='Header-Flex-Box'>
        <div className='Logo-Section'>
            <Logo/>
        </div>
        <div className='Active-User-Section'>
            <ActiveUser/>
        </div> 
        <div className='SearchBox-Section'>
            <SearchBar/>
        </div>
    </div>
     
  )
}
 
export default Header
