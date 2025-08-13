import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'oneforall.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const jobData = JSON.parse(fileContents);
    
    res.status(200).json(jobData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load job data' });
  }
}
