import axios from "axios";

const responseGenerator = async (userMessage: string) => {
    const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        method: 'post',
        data: { contents: [{ parts: [{ text: userMessage }] }] },
    });
    return response.data.candidates[0].content.parts[0].text;
};

export { responseGenerator }