import { config } from "dotenv";
config()

// import DSPromptBank from "DS_prompt_bank";

import { Configuration, OpenAIApi } from "openai"

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.GPT_KEY
}))

async function SD_prompt_gen(system_prompts, chapter, genre, main_character) {
  system_prompts.push({role: "user", content: `the main character in the painting is ${main_character}, but also include other characters in the chapter`})
  system_prompts.push({role: "user", content: `pick the main scene from this chapter to describe = ${chapter}`})
  system_prompts.push({role: "user", content: `the genre of the story is ${genre}`})
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0613",
    messages: system_prompts
  })
  system_prompts.push(res.data.choices[0].message)
  return res.data.choices[0].message.content
}

export default SD_prompt_gen