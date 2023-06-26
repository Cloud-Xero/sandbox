import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import crypto from "crypto";

// GraphQLスキーマ言語を記述してスキーマを構築する
// スキーマはあくまで定義のみで実際のデータ操作は行わない
const schema = buildSchema(`
  input MessageInput {
    content: String
    author: String
  }

  type Message {
    id: ID!
    content: String
    author: String
  }

  type Query {
    getMessage(id: ID!): Message
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`);

interface MessageInput {
  content: string;
  author: string;
}

class Message {
  id: string;
  content: string;
  author: string;

  constructor(id: string, { content, author }: MessageInput) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}

// データの入れ物
const fakeDatabase: Record<string, MessageInput> = {};

// リゾルバ関数（特定のフィールドのデータを返す関数であり、実際のデータ操作を行う部分）
const root = {
  getMessage: ({ id }: { id: string }) => {
    if (!fakeDatabase[id]) {
      throw new Error(`no message exists with id ${id}`);
    }

    return new Message(id, fakeDatabase[id]);
  },

  createMessage: ({ input }: { input: MessageInput }) => {
    // ランダムなIdを生成
    const id = require("crypto").randomBytes(10).toString("hex");

    fakeDatabase[id] = input;

    return new Message(id, input);
  },

  updateMessage: ({ id, input }: { id: string; input: MessageInput }) => {
    if (!fakeDatabase[id]) {
      throw new Error("no message exists with id" + id);
    }
    // 古いデータの書き換え
    fakeDatabase[id] = input;
    return new Message(id, input);
  },
};

// Expressでサーバーを立てる
// graphql: true としたため、GraphQLを利用できる
const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
