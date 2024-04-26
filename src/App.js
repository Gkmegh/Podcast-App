import React, { useEffect } from 'react'
import SignInSignUp from './pages/SignInSignUp'
import {Routes, Route} from 'react-router-dom'
import Profile from './pages/Profile'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { setUser } from './slices/userSlice';
import {useDispatch} from 'react-redux'
import PrivateRoutes from './components/PrivateRoute/PrivateRoutes';
import CreateAPodcastepage from './pages/CreateAPodcaste';
import PodcastsPage from './pages/PodcastsPage';
import PodcastsDetailsPage from './pages/PodcastsDetails';
import CreateEpisodePage from './pages/CreateEpisode';
 
function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if(user){
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc)=>{
            if(userDoc.exists()){
              const userData = userDoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid
                })
              );
            }
          },
          (error)=>{
            console.error("Error fatching user data", error);
          }
        );
        return()=>{
          unsubscribeSnapshot();
        };
      }
    });
    return()=>{
      unsubscribeAuth();
    };
  }, []);

  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<SignInSignUp/>} />
        <Route element={<PrivateRoutes/>} >
          <Route path='/profile' element={<Profile/>} />
          <Route path='/create-a-podcaste' element={<CreateAPodcastepage/>} />
          <Route path='/podcasts' element={<PodcastsPage/>} />
          <Route path='/podcast/:id' element={<PodcastsDetailsPage/>} />
          <Route path='/podcast/:id/create-episode' element={<CreateEpisodePage/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
