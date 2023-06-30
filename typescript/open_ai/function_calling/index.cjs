"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Configuration, OpenAIApi } from "openai";
// import dotenv from "dotenv";
var dotenv = require("dotenv");
dotenv.config();
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
// const chatCompletion = await openai.createChatCompletion({
//   model: "gpt-3.5-turbo",
//   messages: [{ role: "user", content: "Hello world" }],
// });
// console.log(chatCompletion.data.choices[0].message);
var msg = process.env.OPENAI_API_KEY;
console.log(msg);
