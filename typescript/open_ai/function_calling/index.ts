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
  {
    name: "get_capital",
    description: "指定された国の首都を取得する",
    parameters: {
      type: "object",
      properties: {
        country: {
          type: "string",
          description: "国名。e.g. フランス",
        },
      },
    },
    required: ["country"],
  },
];

const messages: Messages = [
  {
    role: "user",
    content: "明日（2023/7/8）の東京の天気わかりますか？",
  },
];

const messages2: Messages = [
  {
    role: "user",
    content: "日本の首都はどこですか？",
  },
];

// 外部APIの定義（今回はモック）
const getWeather = (location: string, date: string) => {
  return { date, location, weather: "晴れ" };
};

// 外部APIの定義（今回はモック）
const getCapital = (country: string) => {
  return { country, capital: "東京都" };
};

const completionFunction = async () => {
  // API実行
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages2,
    functions,
  });
  // console.log(completion.data.choices[0]);

  if (completion.data.choices[0].finish_reason === "function_call") {
    let res;
    // コールするfunction
    const functionCall = completion.data.choices[0].message.function_call;

    if (functionCall.name === "get_weather") {
      // 引数をparse
      const { location, date } = JSON.parse(functionCall.arguments);

      // 引数を使用して外部APIを実行
      res = await getWeather(location, date);
      // console.log(res); // { date: '2023/07/08', location: '東京都', weather: '晴れ' }
    } else if (functionCall.name === "get_capital") {
      // 引数をparse
      const { country } = JSON.parse(functionCall.arguments);

      // 引数を使用して外部APIを実行
      res = await getCapital(country);
      // console.log(res);  // { country: '日本', capital: '東京都' }
    } else {
      throw new Error(`Unknown function: ${functionCall}`);
    }

    // messages配列に新たなオブジェクトの要素を追加
    messages2.push({
      role: "function",
      content: JSON.stringify(res),
      name: functionCall.name,
    });

    // API実行
    const res2 = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages2,
      functions,
    });

    // API側に回答を生成してもらう（ただし、リクエスト回数が1回増えてしまう）
    console.log(res2.data.choices[0]);
  }
};

completionFunction();
