import React from "react";
import { Link } from "react-router-dom";
import "./Router.css"


const Router = () =>  {
  return (
    <div className="allss">
        <Link id='login' to='/login' className="Link"><button>Login</button></Link>
    </div>
  )
}

export default Router