import axios from 'axios';
export const postJobAction = (jobData) => async (dispatch) => {
    try {
      dispatch({ type: 'POST_JOB_REQUEST' });
      const { data } = await axios.post('/api/jobs', jobData);
      dispatch({ type: 'POST_JOB_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'POST_JOB_FAIL',
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };
  