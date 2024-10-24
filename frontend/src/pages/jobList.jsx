import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogoutAction } from '../actions/userAction'; // Make sure this is the correct path to your action

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/jobs/show');
                if (response.data && response.data.jobs) {
                    setJobs(response.data.jobs);
                } else {
                    console.error('Invalid response structure:', response);
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };
        fetchJobs();
    }, []);

    const handleLogout = () => {
        // Perform logout action
        dispatch(userLogoutAction());
        // Clear user data from local storage or session storage
        localStorage.removeItem('userToken');
        navigate('/');
    };

    const handleApply = async (jobId) => {
        try {
            const token = localStorage.getItem('userToken');
            if (!token) {
                alert("Please log in to apply for jobs.");
                navigate('/login');
                return;
            }
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.post(`http://localhost:9000/api/apply/${jobId}`, {}, config);
            alert(response.data.message); // Notify the user of a successful application
        } catch (error) {
            console.error("Error applying for job:", error.response?.data || error.message);
            alert("Error applying for job");
        }
    };
    
    return (
        <div className="mx-auto p-4 flex flex-col">
            {/* Navbar */}
            <div className="flex justify-between items-center py-2">
                <div className="text-2xl font-bold">Career4U</div>
                <div className='flex gap-4 mr-4'>
                    <button onClick={handleLogout} className="bg-black text-white rounded text-center px-6 py-2 hover:bg-gray-600">
                        LogOut
                    </button>
                    <button className="bg-black text-white rounded text-center px-4 py-2 hover:bg-gray-600">
                        <Link to="/profile">Profile</Link>
                    </button>
                </div>
            </div>
            {/* Job Listings */}
            <h2 className="text-2xl font-bold mb-4 text-center">All Jobs</h2>
            <div className="flex flex-col gap-4">
                {jobs && jobs.length > 0 ? (
                    jobs.map(job => (
                        <div key={job._id} className="border rounded-lg p-6 shadow-lg w-full flex justify-between">
                            <div className="w-2/3">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                                <p className="text-base text-gray-600 mb-2">{job.description.substring(0, 100)}...</p>
                            </div>
                            <div className="w-1/3 text-right">
                                <p className="text-xl font-medium text-gray-700 mb-1">{job.company}</p>
                                <p className="text-lg text-green-500 font-semibold mb-1">Salary: ${job.salary}</p>
                                <p className="text-sm text-gray-500 mb-4">Location: {job.location}</p>
                                <button
                                    className="bg-blue-600 text-white rounded px-6 py-2 mt-2 hover:bg-blue-800"
                                    onClick={() => handleApply(job._id)}
                                >
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-700">No jobs available</p>
                )}
            </div>
        </div>
    );
};

export default JobList;
