import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredJobs = jobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const recentJobs = filteredJobs.slice(0, 3);

    return (
        <div className="mx-auto p-4 flex flex-col">
            <div className="flex justify-between items-center py-4">
                <div className="text-2xl font-bold">Career4U</div>
                <div className='flex gap-4 mr-4'>
                    <button className="bg-black text-white rounded text-center px-6 py-2 hover:bg-gray-600">
                        <Link to="/login">Login</Link>
                    </button>
                    <button className="bg-black text-white rounded text-center px-4 py-2 hover:bg-gray-600">
                        <Link to="/register">Register</Link>
                    </button>
                </div>
            </div>
            <div className="my-4 flex flex-col gap-2 text-center">
                <input
                    type="text"
                    placeholder="Search for jobs..."
                    className="w-full p-2 border rounded text-black"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button className=" py-2 text-black  rounded px-4  hover:bg-black hover:text-white">
                    <Link to="/advance-search">Advance Search</Link>
                </button>
            </div>
            <div className="my-4">
                <h2 className="text-xl font-bold mb-4 text-center">Featured Jobs</h2>
                <div className="flex flex-col gap-4">
                    {recentJobs && recentJobs.length > 0 ? (
                        recentJobs.map(job => (
                            <div key={job._id} className="border rounded-lg p-4 shadow-lg w-full">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                                <p className="text-base text-gray-600 mb-2">{job.description.substring(0, 100)}...</p>
                                <p className="text-lg font-semibold text-green-500 mb-1">Salary: ${job.salary}</p>
                                <p className="text-sm text-gray-500 mb-4">Location: {job.location}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-700">No jobs available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
