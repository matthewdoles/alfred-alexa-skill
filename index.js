const Alexa = require('ask-sdk');
const Twitter = require('twitter');
let voice_name = "Matthew";

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    let speechText = "<voice name='" + voice_name + "'>Hello Matthew. How may I help you?</voice>";
    let repromptText = "<voice name='" + voice_name + "'>Sorry sir, I did not receive any instructions. Shall I prepare the batmobile?</voice>";
    handlerInput.attributesManager.setSessionAttributes({type: "help"});
    return handlerInput.responseBuilder.speak(speechText);
  }
};
const FallIntent = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "FallIntent");
  },
  handle(handlerInput) {
    let speechText = "<voice name='" + voice_name + "'>Why do we fall sir? <break time='2s'/> So that we can learn to pick ourselves up!</voice>";
    return handlerInput.responseBuilder.speak(speechText);
  }
};
const DolesTweetIntent = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "DolesTweetIntent");
  },
  async handle(handlerInput) {
    const speechText = await getTweet();
    return handlerInput.responseBuilder.speak(speechText);
  }
};
const HelpIntent = {
  canHandle(handlerInput) {
    return (
    handlerInput.requestEnvelope.request.type === "IntentRequest" && 
      handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent" );
  },
  handle(handlerInput) {
  let speechText = "<voice name='" + voice_name + "'>Sorry sir, I am a work in progress. You should work on building out my functionality.</voice>";
  handlerInput.attributesManager.setSessionAttributes({type: "help"});
  return handlerInput.responseBuilder.speak(speechText);
  }
};
const UnhandledHandler = {
  canHandle(handlerInput) {
    return true;
  },
  handle(handlerInput, error) {
     let speechText = "<voice name='" + voice_name + "'>Sorry sir, I am not quite sure what to do.</voice>";
     console.log(error);
     return handlerInput.responseBuilder.speak(speechText).getResponse();
  }
};
function getTweet() {
  return new Promise((resolve, reject) => {
    var client = new Twitter({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token_key: process.env.ACCESS_TOKEN_KEY,
      access_token_secret: process.env.ACCESS_TOKEN_SECRET
    });
    client.get('statuses/user_timeline', { screen_name: 'mdoles27', count: 1, include_rts: true, exclude_replies: false, tweet_mode:'extended'})
    .then(function (tweets) {
      var speechText = "<voice name='" + voice_name + "'>Your last tweet was <break time='1s'/> " + tweets[0].full_text + " <break time='1s'/>";
      if (tweets[0].favorite_count < 3) {
        speechText += "Your tweet got favorited only " + tweets[0].favorite_count + " time. It's okay though, you aren't one to need the validation of others.</voice>";
      }
      else {
        speechText += "Your tweet got favorited " + tweets[0].favorite_count + " times. You're so cool!</voice>";
      }
      console.log(speechText);
      resolve(speechText);
    })
    .catch(function (error) {
      reject(console.log(error));
    })
  });
}
exports.handler = Alexa.SkillBuilders.custom().addRequestHandlers(
  LaunchRequestHandler,
  FallIntent,
  DolesTweetIntent,
  HelpIntent,
  UnhandledHandler)
  .addErrorHandlers(UnhandledHandler).lambda();
