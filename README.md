## Inputs for AI Tastic Tales user input prompts

- Name/Character:

User can enter their own name or the name of a famous character

- Genre/Author:

User can enter either a Genre or a Author they would like. Entering none will just
result in Tastic telling you an story that is adventrorous but neutral in genre

## Prompt Generator -

- Receives a dictionary/hash of the Name/Character/Genre/Author
- Pushes onto the message_history array relevent promts in relation to the user input 
- Returns a completed message_history array
- The dictionary can either come from Command Line prompts, or come from the React Front-End