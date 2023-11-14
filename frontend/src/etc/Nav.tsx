import React from 'react'
import styles from './Nav.module.css'
import { Link ,NavLink } from "react-router-dom";
import { useState } from 'react'
import { useCustomer } from '../context/context';



function Nav() {
  const { customer } = useCustomer(); // Access the customer context using the useCustomer hook

  const handleBurgerClick = () => {
    console.log('Customer Context:', customer);
  };
  return (
    <nav id={styles.navbar}>
        <div >
          <Link to='/' id={styles.burger} onClick={handleBurgerClick}>
            <img  src="/NavImage/burger.png" alt="" />
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
                <a href='#' >{customer ? customer.FirstName : 'Guest'}</a>
                <img src="/NavImage/Vector.png" />
            </div>
        </div>
    </nav>
  )
}

export default Nav