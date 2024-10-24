import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { userSignInAction } from '../actions/userAction';
import { Link } from 'react-router-dom';
import Footer from "../Component/Footer"

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.signIn);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated); // Log to verify state
    if (isAuthenticated) {
        navigate('/job-list');
    }
}, [isAuthenticated, navigate]);


  const validate = async () => {
    try {
      await validationSchema.validate({ email, password }, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const formErrors = err.inner.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
      }, {});
      setErrors(formErrors);
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = await validate();
    if (isValid) {
      dispatch(userSignInAction({ email, password }));
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex justify-between items-center p-4 bg-white shadow-md'>
        <div className='flex items-center'>
          <span className='text-xl font-semibold'>Career4U</span>
        </div>
        <div>
          <button className='mr-4 px-4 py-2 border rounded'>
            <Link to="/">Home</Link>
          </button>
          <button className='mr-4 px-4 py-2 border rounded'>
            <Link to="/register">Register</Link>
          </button>
        </div>
      </div>

      <div className='flex-grow flex items-center justify-center'>
        <div className='bg-white p-8 w-96'>
          <h2 className="text-2xl font-semibold mb-6 text-center">Login to Your Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 border rounded-full focus:outline-none ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <div className="text-red-500">{errors.email}</div>}
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 border rounded-full focus:outline-none ${errors.password ? 'border-red-500' : ''}`}
              />
              {errors.password && <div className="text-red-500">{errors.password}</div>}
            </div>
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember Me
              </label>
              <a href="#" className="text-orange-500">Forgot Password?</a>
            </div>
            <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-full">Login</button>
          </form>
        </div>
      </div>

      <div className="flex justify-between items-center p-4 bg-white shadow-md">
       <Footer/>
      </div>
    </div>
  );
};

export default Login;
