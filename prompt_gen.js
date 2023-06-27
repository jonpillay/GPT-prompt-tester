function prompt_gen(starter_prompts, inputs_dict) {

  const promptResults = JSON.parse(JSON.stringify(starter_prompts)) 

  for (let key in inputs_dict) {
    if (key == 'name') {
      promptResults.unshift({
        role: "system",
        content: `My name is ${inputs_dict[key]} I want you to make me the main character`
      })
    } else if (key == 'character') {
      promptResults.unshift({
        role: "system",
        content: `I want the famous ${inputs_dict[key]} to be the main character`
      })
    } else if (key == 'genre') {
      promptResults.unshift({
        role: "system",
        content: `I want the genre to be ${inputs_dict[key]}`
      }) 
    } else if (key == 'author') {
      promptResults.unshift({
        role: "system",
        content: `I want you to write in the style of ${inputs_dict[key]}`
      })
    } else if (key == 'location') {
      promptResults.unshift({
        role: "system",
        content: `I want the location to be ${inputs_dict[key]}`
      })
    } else if (key == 'prompt') {
      promptResults.unshift({
        role: "user",
        content: `${inputs_dict[key]}`
      })
    } else if (key == 'messageHistory') {
      promptResults.unshift({
        role: "user",
        content: `${inputs_dict[key]}`
      })
    }
  }
  // console.log(promptResults)
  return promptResults
}

export default prompt_gen