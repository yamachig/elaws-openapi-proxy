'use client';
import React from "react";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { createAgentExecutor } from "./createAgentExecutor";

type StartOptions = ConstructorParameters<typeof ChatOpenAI>[0];

const init = async (options: StartOptions) => {

    const executor = await createAgentExecutor({
        llmOptions: {
            modelName: "gpt-4-0613",
            temperature: 0,
            verbose: true,
            ...options,
        }
    });

    (window as any).executor = executor;

};

export default function Page() {
    React.useEffect(() => {
        (window as any).init = init;
        console.log(`\
# How to use

1. run the following code to initialize.

    init({ openAIApiKey: "sk-*******************************" })

2. run the following code to run the LLM agent executor.

    executor.run("デジタル庁設置法（令和三年法律第三十六号）第一条の内容を教えてください。").then(console.log)
`);
    }, []);
    return <h3>Press Ctrl+Shift+J to open the console.</h3>
}
