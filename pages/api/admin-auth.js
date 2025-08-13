import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { adminId, password } = req.body;

    if (!adminId || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Admin ID and password are required' 
      });
    }

    // Read admin credentials from adminDetails.json
    const adminFilePath = path.join(process.cwd(), 'data', 'adminDetails.json');
    const adminData = JSON.parse(fs.readFileSync(adminFilePath, 'utf8'));

    // Check if admin ID exists and password matches
    if (adminData[adminId] && adminData[adminId] === password) {
      return res.status(200).json({ 
        success: true, 
        message: 'Authentication successful' 
      });
    } else {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid admin ID or password' 
      });
    }
  } catch (error) {
    console.error('Admin auth error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
} 