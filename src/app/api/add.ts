import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const flaskResponse = await axios.post('http://127.0.0.1:5000/add', req.body);
    res.status(flaskResponse.status).json(flaskResponse.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios error
      res.status(error.response?.status || 500).json(error.response?.data || 'An error occurred.');
    } else {
      // Handle other types of errors
      res.status(500).json('An error occurred.');
    }
  }
};
