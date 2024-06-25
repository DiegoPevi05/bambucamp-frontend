import {Suspense} from 'react';
import Providers from './components/Providers';
import Home from './pages/home';
import Booking from './pages/booking';
import  LoadingComponent from './components/ui/Loader';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import ForgotPassword from './pages/forgot-password';


function App() {

  return (
    <Suspense fallback={<LoadingComponent isLoading={true}/>}>
      <Providers>
        <Router>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/signin' element={<SignIn/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/booking' element={<Booking/>} />
            <Route path='/forgot-password' element={<ForgotPassword/>} />
            <Route path='/validate-code' element={<ForgotPassword/>} />
            <Route path='/validated-account' element={<ForgotPassword/>} />
            <Route path='/change-password' element={<ForgotPassword/>} />
          </Routes>
        </Router>
      </Providers>
    </Suspense>
  )
}

export default App
