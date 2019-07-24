## Alfred - Alexa Skill

Alfred is my personally crafted assistant, and served as an experimental introduction into programming Alexa Custom Skills. This skill currently contains two custom Intents:

#### Fall Intent: 
Utterance: 'I wanted to save Gotham. I failed.' Response: 'Why do we fall sir? So that we can learn to pick ourselves up!' Alfred, being inspired by Bruce Wayne's very own butler, repeats these encouraging words as quoted from the 2005 Batman Begins movie. This intent accepts a couple other utterances such as 'I failed' and 'I have failed'.

#### Doles Tweet Intent: 
This is where things got a bit more experimental, this intent leverages [Twitter for Node.js](https://www.npmjs.com/package/twitter) to retrieve and read my latest tweet. Furthermore, I've added logic to customize Alfred's response based upon the number of times the tweet was favorited. 

Consuming the Twitter API was a rewarding experience. While there were several avenues I could and may still pursue with Alfred, this particular experiment is what inspired me to create [Whose Tagline Is It Anyway](https://github.com/matthewdoles/whose-tagline-is-it-anyway). 

#### Resources:
Salesforce Trail: [Innovate with Alexa and Amazon Web Services](https://trailhead.salesforce.com/en/content/learn/trails/innovate-with-alexa-and-amazon-web-services)
Vivek Kapoor Udemy Course: [Practical Hands-on Guide for Amazon Alexa Skill Development](https://www.udemy.com/build-your-rad-personal-assistant-with-amazon-alexa-custom-skills/learn/lecture/8519268#overview)
