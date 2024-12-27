const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "write a script to generate 30 second video on topic : interesting historical story along with AI image prompt in realistic format for each scene and give me result in json format with imageprompt and content text as field"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"video_script\": [\n    {\n      \"scene\": 1,\n      \"duration\": 5,\n      \"imageprompt\": \"A bustling, sun-drenched marketplace in ancient Alexandria, Egypt. Merchants hawk their wares from colorful stalls, people dressed in tunics and sandals mingle, a grand library with towering columns is visible in the background. Focus on the vibrancy and activity of daily life. Realistic, detailed, wide-angle view.\",\n      \"content_text\": \"Ancient Alexandria, a vibrant hub of trade and knowledge. Here, in the 3rd century BC, a remarkable librarian named Callimachus toiled.\"\n    },\n     {\n      \"scene\": 2,\n      \"duration\": 6,\n      \"imageprompt\": \"Close up on an ancient papyrus scroll, the writing on it in faded ink is visible, the scroll is partially unrolled, a feather quill and a pot of dark ink are placed nearby on a wooden table. Detailed focus on the texture of the papyrus and the written words. Realistic, shallow depth of field.\",\n      \"content_text\": \"Callimachus wasn't just a librarian; he was a scholar obsessed with organizing the vast collection of the Library of Alexandria.\"\n    },\n    {\n      \"scene\": 3,\n      \"duration\": 7,\n      \"imageprompt\": \"Callimachus, a middle-aged man with a receding hairline and scholarly robes, is standing next to a series of large papyrus rolls, he is gesturing with his hand as if explaining a concept. The library in the background is filled with shelves full of scrolls.  Realistic, slightly low angle.\",\n      \"content_text\": \"He created the Pinakes, the world's first known library catalog, meticulously organizing thousands of scrolls by subject and author.\"\n    },\n    {\n      \"scene\": 4,\n     \"duration\": 6,\n      \"imageprompt\": \"An aerial view of the great library of Alexandria. The architecture is impressive, with grand columns and multiple wings, scrolls are stored within shelves in a well organized manner. Focus on the size and layout of the library, reflecting the scale of the endeavor. Realistic, atmospheric perspective.\",\n      \"content_text\": \"This wasn't just a list; it was a comprehensive guide to the world's knowledge at the time,  a foundation for future libraries and archives.\"\n    },\n     {\n      \"scene\": 5,\n      \"duration\": 6,\n       \"imageprompt\": \"A modern-day library, a book with its spine visible and pages slightly open is focused in foreground. In the background a modern day user is researching books on a tablet. Reflect on how ancient organization methods led to the modern information management. Realistic, soft lighting.\",\n      \"content_text\": \"Callimachus' work, though ancient, still impacts how we organize and access information today. A true testament to the power of organization and the pursuit of knowledge.\"\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
  
