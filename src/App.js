import './App.css';
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const SignUpWithEmail = lazy(() => import('./Pages/SignUpWithEmail'));
const UsersList = lazy(() => import('./Pages/UsersList'));
const Home = lazy(() => import('./Pages/Home'));
const PhoneAuth = lazy(() => import('./Pages/PhoneAuth'));
const SignInWithEmail = lazy(() => import('./Pages/SignInWithEmail'));
const EditUsers = lazy(() => import('./Pages/EditUsers'));
const AddRole = lazy(() => import('./Pages/AddRole'));
const Layout = lazy(() => import('./Layout'));
const CreateTrip = lazy(() => import('./Pages/CreateTrip'));


function App() {
  return (
    <div className="App-header">
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route element={<Layout/>}>
        <Route path='/users' element={<UsersList/>}/>
        <Route path='/sign-up-with-email' element={<SignUpWithEmail/>}/>
        <Route path='/sign-in-with-email' element={<SignInWithEmail/>}/>
        <Route path='/sign-up-with-phone' element={<PhoneAuth/>}/>
        <Route path='/add-role' element={<AddRole/>}/>
        <Route path='/edit-users' element={<EditUsers/>}/>
        <Route path='/create-trip' element={<CreateTrip/>}/>

        </Route>
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
      <Toaster position="top-right" duration="5000"/>
      </Suspense>   
    </div>
  );
}

export default App;
