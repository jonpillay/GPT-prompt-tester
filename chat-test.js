import { config } from "dotenv";
config()

import { Configuration, OpenAIApi } from "openai"
import { stdin, stdout } from "process";
import readline from "readline"

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.GPT_KEY
}))

const chatUI = readline.createInterface({
  input: stdin,
  output: stdout
})

openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content: "You are my story writing assistant. I give you my todo list everyday and you write an adventurous story based on my list of tasks. I want these to be exciting stories which will motivate me to get through the list"
    },
    {
      role: "system",
      content: "The Todo list will be given to you in the form of a comma separated list of strings. I want you to take each string and turn it into a single chapter in the story. Each chapter should be between 90-110 words and fit into the overarching story"
    },
    {
      role: "system",
      content: "return a list or comma separated strings. Each element will be a chapter each"
    },
    {
      role: "system",
      content: "Write in the style of Stephen King"
    },
    {
      role: "user",
      content: "['take kids to school', 'hangout washing', 'go shoppiing for bacon', 'cook and eat bacon', 'pick kids up from school', 'play football']"
    }
  ]
}).then(res => {
  console.log(res.data.usage)
  console.log(res.data.choices)
})