import axios from 'axios';

    export default async (req, res) => {
      try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', req.body, {
          headers: {
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`
          }
        });
        res.json({ response: response.data.choices[0].text });
      } catch (error) {
        res.status(500).json({ error: 'Error calling OpenAI API' });
      }
    };
