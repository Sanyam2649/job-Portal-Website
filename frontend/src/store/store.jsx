import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension'; // Ensure this is installed
import { 
    deleteJobReducer, 
    loadJobReducer, 
    loadJobSingleReducer, 
    registerAjobReducer 
} from '../reducer/jobReducer.jsx';
import { 
    createJobTypeReducer, 
    loadJobTypeReducer 
} from '../reducer/jobTypeReducer.jsx';
import { 
    allUserReducer, 
    userApplyJobReducer, 
    userReducerLogout, 
    userReducerProfile, 
    userReducerSignIn, 
    userReducerSignUp 
} from '../reducer/userReducer.jsx';

// Combine reducers
const rootReducer = combineReducers({
    loadJobs: loadJobReducer,
    jobTypeAll: loadJobTypeReducer,
    signIn: userReducerSignIn,
    logOut: userReducerLogout,
    userProfile: userReducerProfile,
    singleJob: loadJobSingleReducer,
    userJobApplication: userApplyJobReducer,
    allUsers: allUserReducer,
    signUp: userReducerSignUp,
    registerJob: registerAjobReducer,
    deleteJob: deleteJobReducer,
    createJobType: createJobTypeReducer
});

// Middleware
const middleware = [thunk];
// Create store with DevTools
const store = createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(...middleware)) // Wrap middleware with DevTools
);

export default store;
