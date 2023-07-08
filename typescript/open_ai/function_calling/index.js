"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// 関数リストの定義
const functions = [
    {
        name: "get_weather",
        description: "指定された場所と日付の天気を取得する",
        parameters: {
            type: "object",
            properties: {
                location: {
                    type: "string",
                    description: "都道府県や市、町の名前。e.g. 東京都文京区",
                },
                date: {
                    type: "string",
                    description: "Date formatted in YYYY/mm/dd",
                },
            },
        },
        required: ["location", "date"],
    },
];
const messages = [
    {
        role: "user",
        content: "明日（2023/7/8）の東京の天気わかりますか？",
    },
];
// 外部APIの定義（今回はモック）
const getWeather = (location, date) => {
    return { date, location, weather: "晴れ" };
};
const completionFunction = () => __awaiter(void 0, void 0, void 0, function* () {
    // API実行
    const completion = yield openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
        functions,
    });
    // console.log(completion.data.choices[0]);
    if (completion.data.choices[0].finish_reason === "function_call") {
        // コールするfunction
        const functionCall = completion.data.choices[0].message.function_call;
        // 引数をparse
        const { location, date } = JSON.parse(functionCall.arguments);
        // 引数を使用して外部APIを実行
        const weather = yield getWeather(location, date);
        console.log(weather);
        // messages配列に新たなオブジェクトの要素を追加
        messages.push({
            role: "function",
            content: JSON.stringify(weather),
            name: functionCall.name,
        });
        // API実行
        const res = yield openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages,
            functions,
        });
        console.log(res.data.choices[0]);
    }
});
completionFunction();
