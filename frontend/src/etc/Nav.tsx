import React from 'react'
import styles from './Nav.module.css'
import { Link ,NavLink } from "react-router-dom";
import { useState } from 'react'
import { useUser } from '../context/context';
import raw from '../etc/raw.jpg';



function Nav() {
  const { user } = useUser(); // Access the customer context using the useCustomer hook

  const handleBurgerClick = () => {
    console.log('User Context:', user);
  };
  return (
    <nav id={styles.navbar}>
        <div >
          <Link to='/router' id={styles.burger} onClick={handleBurgerClick}>
            <img  src={raw} alt="" />
          </Link>
        </div>
      
        <div id={styles.walletNprofile}>
            <div id={styles.wallet}>
                <Link to='/' id={styles.wallbox} >
                    <h1 id={styles.box} >$1000</h1>
                    <img src="/NavImage/walletIcon.png" id={styles.box} />
                </Link>
            </div >
            <div id={styles.profile}>
                <a href='#' >{user ? user.FullName : 'Guest'}</a>
                <img src="/NavImage/Vector.png" />
            </div>
        </div>
    </nav>
  )
}

export default Nav