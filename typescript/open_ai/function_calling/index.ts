const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

type Messages = {
  role: string;
  content: string;
  name?: string;
}[];

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

const messages: Messages = [
  {
    role: "user",
    content: "明日（2023/7/8）の東京の天気わかりますか？",
  },
];

// 外部APIの定義（今回はモック）
const getWeather = (location: string, date: string) => {
  return { date, location, weather: "晴れ" };
};

const completionFunction = async () => {
  // API実行
  const completion = await openai.createChatCompletion({
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
    const weather = await getWeather(location, date);
    console.log(weather); // { date: '2023/07/08', location: '東京都', weather: '晴れ' }

    // `${date}の${location}天気は${weathre}です`　// ex 2023/07/08の東京の天気は晴れです.

    // messages配列に新たなオブジェクトの要素を追加
    messages.push({
      role: "function",
      content: JSON.stringify(weather),
      name: functionCall.name,
    });

    // API実行
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
      functions,
    });

    // API側に回答を生成してもらう（ただし、リクエスト回数が1回増えてしまう）
    console.log(res.data.choices[0]);
  }
};

completionFunction();
