import { config } from "dotenv";
import prompt_gen from "./prompt_gen.js"
import sd_prompt_gen from "./sd_prompt_gen.js";
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
    content: "You are my story writing assistant. I am going to tell you what my next task will be. I want you to write me a chapter for each task which is connected to the last task and forms an overarching story of my day. I want it to be adventurous so it motivates me to complete my tasks"
  },
  {
    role: "system",
    content: "Be aware of the overarching story"
  },
  {
    role: "system",
    content: "after I submit each task, return a chapter in the story, between 50-70 words long. This needs a chapter number and also a chapter title"
  },
]

const sd_starter_prompts = [
  {
    role: "system",
    content: "I want you to take a look at this chapter from a book and decide what the main scene would be"
  },
  {
    role: "system",
    content: "I then want you to write me a set of prompts to be used by a text-image AI model like Dall-E to get the best image for that scene"
  },
  {
    role: "system",
    content: "pleae only concentrate on one scene in the chapter. Do not describe several different events. I only want to draw a single image."
  },
  {
    role: "system",
    content: "this is an example of a good prompt for you to emulate - 'Cute small cat sitting in a movie theater eating chicken wiggs watching a movie ,unreal engine, cozy indoor lighting, artstation, detailed, digital painting,cinematic,character design by mark ryden and pixar and hayao miyazaki, unreal 5, daz, hyperrealistic, octane render'"
  },
  {
    role: "system",
    content: "this is an example of a good prompt for you to emulate - 'houses in front, houses background, straight houses, digital art, smooth, sharp focus, gravity falls style, doraemon style, shinchan style, anime style'"
  },
  {
    role: "system",
    content: "the prompt should initially define a clear sytle that can then be used again to create images in different setting with the same style applied"
  },
  {
    role: "system",
    content: "please look back over the message history we have. If there style prompts defined before, reuse them so we can get consistency between images"
  },
]

let example_inputs_dict = {character: "Matilda", genre: "horror", author: "Raymond Chandler"}

let message_history = prompt_gen(starter_prompts, example_inputs_dict)

chatUI.prompt()
chatUI.on('line', async input => {
  message_history.push({role: "user", content: input})
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: message_history
  })
  message_history.push(res.data.choices[0].message)
  console.log(res.data.choices[0].message.content)
  const sd_res = await sd_prompt_gen(sd_starter_prompts, res.data.choices[0].message.content)
  console.log(sd_res)
  chatUI.prompt()
})