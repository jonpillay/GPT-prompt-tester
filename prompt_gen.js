let starter_prompts = [
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
  }
  ]


function prompt_gen(starter_prompts, inputs_dict) {

  const promptResults = JSON.parse(JSON.stringify(starter_prompts)) 

  for (let key in inputs_dict) {
    if (key == 'name') {
      promptResults.push({
        role: "system",
        content: `My name is ${inputs_dict[key]} I want you to make me the main character in this story`
      })
    } else if (key == 'character') {
      promptResults.push({
        role: "system",
        content: `I want the famous ${inputs_dict[key]} to be the main character in this story`
      })
    } else if (key == 'genre') {
      promptResults.push({
        role: "system",
        content: `I want the genre of this story to be ${inputs_dict[key]}`
      }) 
    } else if (key == 'author') {
      promptResults.push({
        role: "system",
        content: `I want you to write this story in the style of ${inputs_dict[key]}`
      })
    }
  }
  return promptResults
}

export default prompt_gen