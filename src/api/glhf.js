import axios from 'axios';

    export default async (req, res) => {
      try {
        const response = await axios.post('https://glhf.chat/api/openai/v1/query', req.body);
        res.json({ response: response.data.result });
      } catch (error) {
        res.status(500).json({ error: 'Error calling GLHF Chat API' });
      }
    };