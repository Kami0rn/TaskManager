import React from "react";
import { Link } from "react-router-dom";
import "./Router.css"


const Router = () =>  {
  return (
    <div className="allss">
        <Link id='login' to='/login' className="Link"><button className="btn btn-outline">Login</button></Link>
        <Link id='login' to='/register' className="Link"><button className="btn btn-outline">Register</button></Link>
        <Link id='login' to='/payment' className="Link"><button className="btn btn-outline">payment</button></Link>
        <Link id='login' to='/paymentHistory' className="Link"><button className="btn btn-outline">paymentHistory</button></Link>

    </div>
  )
}

export default Router