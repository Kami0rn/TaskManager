import React from "react";
import { Link } from "react-router-dom";
import "./Router.css"


const Router = () =>  {
  return (
    <div className="allss">
<<<<<<< Updated upstream
        <Link id='login' to='/login' className="Link"><button>Login</button></Link>
        <Link id='login' to='/register' className="Link"><button>Register</button></Link>
        <Link id='dashboard' to='/dashboard' className="Link"><button>Dashboard</button></Link>
        <Link id='dashboard' to='/projectPage' className="Link"><button>projectPage</button></Link>
=======
        <Link id='login' to='/login' className="Link"><button className="btn btn-outline">Login</button></Link>
        <Link id='login' to='/register' className="Link"><button className="btn btn-outline">Register</button></Link>
        <Link id='login' to='/payment' className="Link"><button className="btn btn-outline">payment</button></Link>
        <Link id='login' to='/paymentHistory' className="Link"><button className="btn btn-outline">paymentHistory</button></Link>
        <Link id='login' to='/comment' className="Link"><button className="btn btn-outline">Comment</button></Link>
        <Link id='login' to='/comment_2' className="Link"><button className="btn btn-outline">Comment_2</button></Link>

>>>>>>> Stashed changes
    </div>
  )
}

export default Router