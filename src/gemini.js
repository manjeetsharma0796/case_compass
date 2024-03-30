const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const API_KEY = "AIzaSyCDqAf-nnoCxt7UR6_QNHXeKXPBfTttJPc";
const MODEL_NAME = "gemini-1.0-pro";
// Access your API key as an environment variable (see "Set up your API key" above)

// ...
const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

const genAI = new GoogleGenerativeAI(API_KEY, generationConfig, safetySettings);
async function promptInput(req, res) {
  // For text-only input, use the gemini-pro model
  const { prompt } = req.body;
  console.log(prompt);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const result = await model.generateContent(
    `You are an Indian lawyer, respond to the question by giving legal advice, writing article numbers and suggesting similar case laws:${prompt}`
  );
  try {
    const response = await result.response;
    const text = response.text();
    console.log(text);
    res.send(JSON.stringify(text));
  } catch (error) {
    const text =
      "The Information provided by you is insufficient/ Infringes upon user privacy.";
    res.send(JSON.stringify(text));
  }
}

const prompt = "who is jjk k ?";
// promptInput(prompt);

module.exports = { promptInput };
