import propmtModel from "../models/prompt.model.js";
import 'dotenv/config'
import Groq from 'groq-sdk'

const ai = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

const main = async (content, history) => {

    const history = Array.isArray(history) ? history : []

    const response = await ai.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: 'you are a helpfull assistant'
            },
            ...history,
            {
                role: 'user',
                content: content
            }
        ],
        model: 'openai/gpt-oss-120b'
    })

    return response.choices[0].message.content || ''
}

const sendPrompt = async (req, res) => {
    const { content, history } = req.body;
    const userId = req.userId


    if (!content || !content.trim()) {
        return res.status(400).json({
            success: false,
            message: 'Enter you prompt'
        })
    }

    try {
        const userPrompt = await propmtModel.create({
            userId,
            role: 'user',
            content
        })
        const aiResponse = await main(content, history)

        const aiMessage = await propmtModel.create({
            userId,
            role: 'assistant',
            content: aiResponse
        })

        return res.status(200).json({
            success: true,
            reply: aiMessage
        })
    }
    catch (err) {
        console.log('ai response failed', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })

    }
}

const getData = async (req, res) => {
    const userId = req.userId

    const data = await propmtModel.findOne({ userId: userId })

    if (!data) {
        res.status(401).json({
            success: false,
            message: 'Not found'
        })
    }

    res.status(200).json({
        success: true,
        message: 'Data fetched successfully',
        data: data
    })

}

export default { sendPrompt, getData }