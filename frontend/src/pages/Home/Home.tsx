import React from "react";
import { useNavigate, Link } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/register');
  };

  return (
    <div className="bg mt-14 bg-zinc-800 h-screen flex flex-col">
      <div className="topHeader flex flex-col my-20 items-center">
        <div className="flex flex-col items-center">
          <h1 className="font-semibold text-amber-600 my-20 text-4xl">
            Empower your team with Syncify
          </h1>
          <h4 className="text-white my-20">
            Unlock Your Team's Potential - Where Ideas Take Flight and Projects
            Soar!
          </h4>
          <div className="flex flex-col w-fit ">
            <button className="bg-gradient-to-b from-amber-500 to-orange-600  rounded bg-amber-600 p-4 font-semibold" onClick={handleSignUpClick}>
              Sign up for free
            </button>
            <Link to="/login" className="m-5 text-white">
              login
            </Link>
          </div>
        </div>
      </div>
      <div className="bodyPart"></div>
    </div>
  );
}

export default Home;
