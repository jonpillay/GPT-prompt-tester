import { config } from "dotenv";
import prompt_gen from "./prompt_gen.js"
import SD_prompt_gen from "./DS_prompt_gen.js";
import DSGenerateImage from "./DS_Client.js";
config()

import { Configuration, OpenAIApi } from "openai"
import { stdin, stdout } from "process";
import readline from "readline";

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.GPT_KEY
}))

const chatUI = readline.createInterface({
  input: stdin,
  output: stdout
})

const starter_prompts = [
  {
    role: "system",
    content: "You are my story writing assistant. I am going to prompt you with simple outline of a chapter and you are going to adapt it into an adventerous tale. Please start at chapter one"
  },
  {
    role: "system",
    content: "The chapter should be between 50-70 words long."
  },
  {
    role: "system",
    content: "The chapter should have a sequential chapter number and a title"
  },
  {
    role: "system",
    content: "Only return one chapter per task"
  },
]

const sd_starter_prompts = [
  {
    role: "system",
    content: "You are my artist assistant. You are going to help me by writing descriptions of scenes from books so I can paint amazing paintings"
  },
  {
    role: "system",
    content: "I am going to give you a chapter from a book, decide what the main scene is and write me a description of that scene starting with the characters in the scene."
  },
  {
    role: "system",
    content: "Be short and concise in your description, return less than 15 words."
  },
]

let example_inputs_dict = {character: "Rapunzel", genre: "western"}

let message_history = prompt_gen(starter_prompts, example_inputs_dict)
console.log(message_history)

chatUI.prompt()
chatUI.on('line', async input => {
  message_history.push({role: "user", content: input})
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0613",
    messages: message_history
  })
  message_history.push(res.data.choices[0].message)
  console.log(res.data.choices[0].message.content)
  const sd_res = await SD_prompt_gen(sd_starter_prompts, res.data.choices[0].message.content, example_inputs_dict["genre"], example_inputs_dict["character"])
  console.log(" ")
  console.log("START OF DS DESCRIPTION")
  console.log(" ")
  console.log(sd_res)
  chatUI.prompt()
})