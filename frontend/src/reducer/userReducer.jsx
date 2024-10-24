// sign In reducer
const initialState = {
    loading: false,
    userInfo: null,
    isAuthenticated: false,
    error: null,
};

export const userReducerSignIn = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_SIGNIN_REQUEST':
            return { ...state, loading: true };
        case 'USER_SIGNIN_SUCCESS':
            return {
                ...state,
                loading: false,
                userInfo: action.payload,
                isAuthenticated: true
            };
        case 'USER_SIGNIN_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'USER_SIGNIN_RESET':
            return initialState;
        default:
            return state;
    }
};

// sign up reducer
export const userReducerSignUp = (state = {}, action) => {
    switch (action.type) {
        case 'USER_SIGNUP_REQUEST':
            return { loading: true };
        case 'USER_SIGNUP_SUCCESS':
            return {
                loading: false,
                userSignUp: action.payload,
            };
        case 'USER_SIGNUP_FAIL':
            return { loading: false, error: action.payload };
        case 'USER_SIGNUP_RESET':
            return {};
        default:
            return state;
    }
};

// user profile reducer
export const userReducerProfile = (state = { user: null }, action) => {
    switch (action.type) {
        case 'USER_LOAD_REQUEST':
            return { loading: true, user: null };
        case 'USER_LOAD_SUCCESS':
            return {
                loading: false,
                user: action.payload.user,
            };
        case 'USER_LOAD_FAIL':
            return { loading: false, user: null, error: action.payload };
        case 'USER_LOAD_RESET':
            return {};
        default:
            return state;
    }
};

// log out reducer
export const userReducerLogout = (state = {}, action) => {
    switch (action.type) {
        case 'USER_LOGOUT_REQUEST':
            return { loading: true };
        case 'USER_LOGOUT_SUCCESS':
            return {
                loading: false,
                user: action.payload,
            };
        case 'USER_LOGOUT_FAIL':
            return { loading: false, error: action.payload };
        case 'USER_LOGOUT_RESET':
            return {};
        default:
            return state;
    }
};

// apply for a job reducer
export const userApplyJobReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_APPLY_JOB_REQUEST':
            return { loading: true };
        case 'USER_APPLY_JOB_SUCCESS':
            return {
                loading: false,
                userJob: action.payload,
            };
        case 'USER_APPLY_JOB_FAIL':
            return { loading: false, error: action.payload };
        case 'USER_APPLY_JOB_RESET':
            return {};
        default:
            return state;
    }
};

// all users reducer
export const allUserReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case 'ALL_USER_LOAD_REQUEST':
            return { loading: true, users: [] };
        case 'ALL_USER_LOAD_SUCCESS':
            return {
                loading: false,
                users: action.payload.users,
            };
        case 'ALL_USER_LOAD_FAIL':
            return { loading: false, users: [], error: action.payload };
        case 'ALL_USER_LOAD_RESET':
            return {};
        default:
            return state;
    }
};
