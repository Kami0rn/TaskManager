import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface User {
  ID: string;
  Username: string;
  lname: string;
  username: string;
  email: string;
  avatar: string;
}

function Profile() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [user, setUser] = useState<User>({
    ID: '',
    Username: '',
    lname: '',
    username: '',
    email: '',
    avatar: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    fetch('http://localhost:8080/users/profile', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.status === 'ok') {
          setUser(result.user);
          setIsLoaded(false);
        } else if (result.status === 'forbidden') {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: 'error',
          }).then(() => {
            navigate('/login');
          });
        }
      })
      .catch(error => console.log('error', error));
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };


  return (
    <div>
      <div>{user.ID}</div>
      <div>{user.Username}</div>
      <div>{user.lname}</div>
      <div>{user.username}</div>
      <div>{user.email}</div>
      <div>
        <img src={user.avatar} alt="User Avatar" width={100} />
      </div>
      <div>
        <button onClick={logout} className='text-red-700'>logout</button>
        <Link to='/Project' className='m-5 text-teal-600'>Project</Link>
      </div>
    </div>
  );
}

export default Profile;
