import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState, useEffect} from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../services/userService';
import { loginUser } from '../store/userSlice';

const Dashboard = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/")
    } else {
      dispatch(loginUser());
    }
  }, [dispatch, isAuthenticated]);

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserData();
        console.log(data)
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);


  
  return (
    <section className='dashboard-Mytask'>
      <div className='d-flex align-items-center justify-content-between mb-4'>
          <h6 className='m-0'><strong>All User Details</strong></h6>
      </div>
       
       <div>
          <div className='Profile-area'>

            <div className='row d-flex'>

              {userData && userData.map(user => (
                <div key={user.id} className="user-card col-6">

                      <div className='d-flex align-items-center gap-4'>

                        <div>
                          <img src={user.avatar} alt="Profile Picture" className="profile-image-box" />
                        </div>

                        <div>
                          <div className="d-flex align-items-center gap-3 mb-2">
                            <Icon icon="ph:user-bold" />
                            <p className="p-0 m-0">{user.first_name} {user.last_name}</p>
                          </div>
                          <div className="d-flex align-items-center gap-3 mb-2">
                            <Icon icon="ic:outline-email" />
                            <p className="p-0 m-0">{user.email}</p>
                          </div>
                        </div>

                    </div>
                  
                </div>
              ))}

            </div>
            
          </div>
          
      </div>
      
    </section>
  );
};

export default Dashboard;