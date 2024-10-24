
import axios from 'axios';
import { toast } from "react-toastify";

// userActions.js
export const userSignInAction = (formData) => async (dispatch) => {
    dispatch({ type: 'USER_SIGNIN_REQUEST' });
    try {
        const { data } = await axios.post("http://localhost:9000/api/signin", formData);
        dispatch({ type: 'USER_SIGNIN_SUCCESS', payload: data });
        localStorage.setItem('userToken', data.token);
        toast.success("Login Successfully!");
    } catch (error) {
        toast.error(`Login error: ${error.response.data.message || error.message}`);
        dispatch({ type: 'USER_SIGNIN_FAIL', payload: error.response.data.message || error.message });
    }
};


export const userSignUpAction = (user) => async (dispatch) => {
    dispatch({ type: 'USER_SIGNUP_REQUEST' });
    try {
        const { data } = await axios.post("http://localhost:9000/api/signup", user);
        dispatch({ type: 'USER_SIGNUP_SUCCESS', payload: data });
        toast.success("Register Successfully!");
    } catch (error) {
        toast.error(`Signup error: ${error.response.data.message || error.message}`);
        dispatch({ type: 'USER_SIGNUP_FAIL', payload: error.response.data.message || error.message });
    }
    
};

export const userLogoutAction = () => async (dispatch) => {
    dispatch({ type: 'USER_LOGOUT_REQUEST' });  
    try {
        localStorage.removeItem('userInfo');
        const { data } = await axios.get("http://localhost:9000/api/logout");
        dispatch({ 
            type: 'USER_LOGOUT_SUCCESS', 
            payload: data 
        });
        toast.success("Logged out successfully!"); 
    } catch (error) {
        dispatch({ 
            type: 'USER_LOGOUT_FAIL', 
            payload: error.response?.data?.error ?? "Logout failed" 
        });
        toast.error(error.response?.data?.error ?? "Logout failed");  
    }
};