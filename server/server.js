const express = require('express');
const path = require('path');
const { apiKey } = require('./secrets.js');
const OpenAI = require('openai');


const openai = new OpenAI({ apiKey });
const doChat = (message, conversation) => {
  return openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [...conversation, { role: "user", content: message }],
  }).then(completion => completion.choices[0].message.content);
}

const doTarotConversation = ({ question, cardName }) => {
  const message = `
    I'm doing a tarot reading and my question is "${question}"
    and the card I drew is the ${cardName}.
    What is the interpretation of this reading?
  `
  return doChat(message, []);
}


const port = process.env.PORT || 8007;

const app = express();
app.use(express.json());
// app.use(cors())

app.use(express.static(path.join(__dirname, '../www')));

app.post('/reading', (req, res) => {
  console.log(req.body);
  doTarotConversation(req.body).then(reading => {
    res.status(200).send({ reading });
  });
});

console.log("listening on port", port);
app.listen(port);
