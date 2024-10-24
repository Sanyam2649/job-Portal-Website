const Job = require('../models/jobModel');
const ErrorResponse = require('../utils/errorResponse');

// Create job
exports.createJob = async (req, res, next) => {
    try {
        const newJob = new Job(req.body);
        await newJob.save();
        res.status(201).json({ success: true, job: newJob });
    } catch (error) {
        console.error(error);
        next(new ErrorResponse('Failed to create job', 500));
    }
};

// Get single job
exports.singleJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return next(new ErrorResponse('Job not found', 404));
        }
        res.status(200).json({ success: true, job });
    } catch (error) {
        console.error(error);
        next(new ErrorResponse('Error fetching job', 500));
    }
};

// Update job by id
exports.updateJob = async (req, res, next) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.job_id, req.body, { new: true });
        if (!job) {
            return next(new ErrorResponse('Job not found', 404));
        }
        res.status(200).json({ success: true, job });
    } catch (error) {
        console.error(error);
        next(new ErrorResponse('Error updating job', 500));
    }
};

// Delete job by id
exports.deleteJob = async (req, res, next) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.job_id);
        if (!job) {
            return next(new ErrorResponse('Job not found', 404));
        }
        res.status(200).json({ success: true, message: 'Job deleted.' });
    } catch (error) {
        console.error(error);
        next(new ErrorResponse('Error deleting job', 500));
    }
};

// Show jobs
exports.showJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find();
        res.status(200).json({ success: true, jobs });
    } catch (error) {
        console.error(error);
        next(new ErrorResponse('Failed to fetch jobs', 500));
    }
};

exports.applyForJob = async (req, res) => {
    try {
        const userId = req.user.id;
        const jobId = req.params.jobId;

        const user = await User.findById(userId);
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        user.jobsHistory.push({
            title: job.title,
            description: job.description,
            salary: job.salary,
            location: job.location,
        });

        await user.save();

        res.status(200).json({ message: 'Job application successful', job });
    } catch (error) {
        console.error("Error during job application:", error);
        res.status(500).json({ message: 'Server error' });
    }
};
