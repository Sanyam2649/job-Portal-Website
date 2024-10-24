import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const JobFilter = () => {
    const [jobType, setJobType] = useState('');
    const [location, setLocation] = useState('');
    const [available, setAvailable] = useState(false);
    const [salaryRange, setSalaryRange] = useState('');
    const [jobListings, setJobListings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/jobs/show');
                setJobListings(response.data.jobs || []);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setError('Failed to fetch jobs');
            }
        };
        fetchJobs();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    const filteredJobs = jobListings.filter(job => {
        const matchesJobType = jobType ? job.jobType.toLowerCase() === jobType.toLowerCase() : true;
        const matchesLocation = location ? job.location.toLowerCase().includes(location.toLowerCase()) : true;
        const matchesAvailable = available ? job.available === available : true;
        const matchesSalary = salaryRange ? job.salary <= parseInt(salaryRange, 10) : true;

        return matchesJobType && matchesLocation && matchesAvailable && matchesSalary;
    });

    return (
        <div className="font-sans">
            <header className="flex justify-between items-center p-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold"> Career4U</h1>
                <nav className='gap-4 flex flex-row'>
                    <button className="bg-black text-white rounded text-center px-4 py-2 hover:bg-gray-600">
                        <Link to="/">Home</Link>
                    </button>
                    <button className="bg-black text-white rounded text-center px-4 py-2 hover:bg-gray-600">
                        <Link to="/job-list">JobList</Link>
                    </button>
                </nav>
            </header>
            <div className="flex p-4">
                <div className="w-1/4 p-4 border-r border-gray-300">
                    <h2 className="text-lg mb-2">Filters</h2>
                    <label className="block mb-2">
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={available}
                            onChange={(e) => setAvailable(e.target.checked)}
                        /> Available
                    </label>
                    <label className="block mb-2">Job Type</label>
                    <select
                        className="w-full p-2 border border-gray-300 mb-4"
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                    >
                        <option value="">Select Job Type</option>
                        <option value="full time">Full-Time</option>
                        <option value="part time">Part-Time</option>
                        <option value="contract">Contract</option>
                    </select>
                    <label className="block mb-2">Location</label>
                    <input
                        type="text"
                        placeholder="Enter location"
                        className="w-full p-2 border border-gray-300 mb-4"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <label className="block mb-2">Salary</label>
                    <input
                        type="number"
                        placeholder="Enter salary"
                        className="w-full p-2 border border-gray-300 mb-4"
                        value={salaryRange}
                        onChange={(e) => setSalaryRange(e.target.value)}
                    />
                </div>
                <main className="w-3/4 p-4 flex flex-wrap gap-4">
                    {filteredJobs.map((job, index) => (
                        <div key={index} className="w-1/2 p-4 border border-gray-300 rounded">
                            <h3 className="text-lg mb-2">{job.title}</h3>
                            <p className="mb-2">{job.company} - {job.location}</p>
                            <p className="mb-4">{job.description}</p>
                            <p className='mb-4'>{job.jobType}</p>
                            <p className='mb-4'>{job.available}</p>
                            <p className='mb-4'>{job.salary}</p>
                        </div>
                    ))}
                </main>
            </div>
        </div>
    );
}

export default JobFilter;
