const OpenAI = require('openai');
const Business = require('../models/Business');

const openai = new OpenAI(process.env.OPENAI_API_KEY);

const processBusinessQuery = async (query) => {
  try {
    // Get relevant business data
    const businesses = await Business.find({});
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are Bizy, a helpful assistant for the Weston and Mount Dennis Business Directory. You have access to information about local businesses and can help users find what they're looking for. Business data: ${JSON.stringify(businesses)}`
        },
        {
          role: 'user',
          content: query
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error processing query:', error);
    throw error;
  }
};

module.exports = {
  processBusinessQuery
};