import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      name,
      Role,
      Location,
      TimeStamp,
      Applylink,
      Aboutlink,
      YearsOfExperience,
      salary
    } = req.body;

    // Validate required fields
    if (!name || !Role || !Location || !TimeStamp || !Applylink || !Aboutlink || !YearsOfExperience || !salary) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Read existing jobs
    const jobsFilePath = path.join(process.cwd(), 'data', 'oneforall.json');
    const existingJobs = JSON.parse(fs.readFileSync(jobsFilePath, 'utf8'));

    // Create new job object
    const newJob = {
      name,
      Role,
      Location,
      TimeStamp,
      Applylink,
      Aboutlink,
      YearsOfExperience: parseInt(YearsOfExperience),
      salary
    };

    // Add new job to the beginning of the array (most recent first)
    existingJobs.unshift(newJob);

    // Write back to file
    fs.writeFileSync(jobsFilePath, JSON.stringify(existingJobs, null, 2));

    return res.status(200).json({
      success: true,
      message: 'Job added successfully',
      job: newJob
    });

  } catch (error) {
    console.error('Add job error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
} 