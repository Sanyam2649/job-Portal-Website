import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter,Routes,Route} from  'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import JobFilter from "./pages/Filter";
import JobList from './pages/jobList';
import Profile from './pages/Profile';
const App = () => {
  return (
  <div>
    <ToastContainer/>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/advance-search" element={<JobFilter/>}/>
      <Route path="/job-list"element={<JobList/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
