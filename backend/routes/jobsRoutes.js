const express = require('express');
const router = express.Router();
const { singleJob, createJob, updateJob, showJobs, deleteJob} = require('../controllers/jobsController');
const { isAuthenticated } = require('../middleware/auth');

// Create a job
router.post('/jobs', createJob);

// Get details of a single job
router.get('/job/:id', singleJob);

// Update a job (Authenticated users only)
router.put('/job/update/:job_id', isAuthenticated, updateJob);

// Delete a job (Authenticated users only)
router.delete('/job/delete/:job_id', isAuthenticated, deleteJob);

// Show all jobs
router.get('/jobs/show', showJobs);

module.exports = router;
