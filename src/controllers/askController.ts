import { Response, Request } from "express";
import Groq from "groq-sdk";

export const askController = async (req: Request, res: Response) => {
    try {
        const groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
        const prompt = req.body.prompt;
        const chatCompletion = await groqClient.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama3-8b-8192",
        });

        if (chatCompletion instanceof Groq.APIError) {
            res.status(chatCompletion.status).json({
                message: "Error From LLM",
                errorName: `${chatCompletion.name}`,
            });
        }
        res.status(200).json({
            response: `${chatCompletion.choices[0].message.content}`,
        });
    } catch (err) {
        console.log(err);
    }
};
