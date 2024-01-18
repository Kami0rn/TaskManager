import React from "react";
import { Link } from "react-router-dom";
import "./Router.css"


const Router = () =>  {
  return (
    <div className="allss">
        <Link id='login' to='/login' className="Link"><button>Login</button></Link>
        <Link id='login' to='/register' className="Link"><button>Register</button></Link>
        <Link id='login' to='/workspace' className="Link"><button>Workspace</button></Link>
        <Link id='login' to='/setting' className="Link"><button>Setting</button></Link>
        <Link id='login' to='/project' className="Link"><button>project</button></Link>
        <Link id='login' to='/projectS' className="Link"><button>projectS</button></Link>
    </div>
  )
}

export default Router