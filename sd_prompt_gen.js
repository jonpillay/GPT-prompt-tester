import { config } from "dotenv";
config()

import { Configuration, OpenAIApi } from "openai"

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.GPT_KEY
}))

async function sd_prompt_gen(system_prompts, chapter) {
  system_prompts.push({role: "user", content: chapter})
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: system_prompts
  })
  system_prompts.push(res.data.choices[0].message)
  return res.data.choices[0].message.content
}

export default sd_prompt_gen