export const loadJobReducer = (state = { jobs: [] }, action) => {
    switch (action.type) {
        case 'JOB_LOAD_REQUEST':
            return { loading: true };
        case 'JOB_LOAD_SUCCESS':
            return {
                loading: false,
                success: action.payload.success,
                page: action.payload.page,
                pages: action.payload.pages,
                count: action.payload.count,
                setUniqueLocation: action.payload.setUniqueLocation,
                jobs: action.payload.jobs,
            };
        case 'JOB_LOAD_FAIL':
            return {
                loading: false,
                error: action.payload,
            };
        case 'JOB_LOAD_RESET':
            return {};
        default:
            return state;
    }
};

export const loadJobSingleReducer = (state = { job: {} }, action) => {
    switch (action.type) {
        case 'JOB_LOAD_SINGLE_REQUEST':
            return { loading: true };
        case 'JOB_LOAD_SINGLE_SUCCESS':
            return {
                loading: false,
                success: action.payload.success,
                singleJob: action.payload.job,
            };
        case 'JOB_LOAD_SINGLE_FAIL':
            return { loading: false, error: action.payload };
        case 'JOB_LOAD_SINGLE_RESET':
            return {};
        default:
            return state;
    }
};

export const registerAjobReducer = (state = {}, action) => {
    switch (action.type) {
      case 'POST_JOB_REQUEST':
        return { loading: true };
      case 'POST_JOB_SUCCESS':
        return { loading: false, success: true, job: action.payload };
      case 'POST_JOB_FAIL':
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
export const deleteJobReducer = (state = {}, action) => {
    switch (action.type) {
        case 'DELETE_JOB_REQUEST':
            return { loading: true };
        case 'DELETE_JOB_SUCCESS':
            return {
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
            };
        case 'DELETE_JOB_FAIL':
            return {
                loading: false,
                error: action.payload,
            };
        case 'DELETE_JOB_RESET':
            return {};
        default:
            return state;
    }
};
