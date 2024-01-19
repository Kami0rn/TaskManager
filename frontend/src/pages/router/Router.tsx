import React from "react";
import { Link } from "react-router-dom";
import "./Router.css"


const Router = () =>  {
  return (
    <div className="allss">
        <Link id='login' to='/login' className="Link"><button>Login</button></Link>
        <Link id='login' to='/register' className="Link"><button>Register</button></Link>
        <Link id='login' to='/createteam/1' className="Link"><button>Create</button></Link>  {/* */}
        <Link id='login' to='/team/1' className="Link"><button>Team</button></Link>
        <Link id='login' to='/profile/1' className="Link"><button>Profile</button></Link>
    </div>
  )
}

export default Router