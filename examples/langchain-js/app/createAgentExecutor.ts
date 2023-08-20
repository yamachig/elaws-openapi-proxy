import origSpecObj from "elaws-openapi-proxy-server/build/openapi.json";
import { ArticlesService } from "elaws-openapi-proxy-server/build/articles/articlesService";
import { LawDataService } from "elaws-openapi-proxy-server/build/lawData/lawDataService";
import { LawListsService } from "elaws-openapi-proxy-server/build/lawLists/lawListsService";
import { UpdateLawListsService } from "elaws-openapi-proxy-server/build/updateLawLists/updateLawListsService";

import { ChatCompletionFunctions } from "openai";
import { createOpenAPIChain } from "langchain/chains/openai_functions";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { LLMChain } from "langchain/chains";
import { DynamicStructuredTool, StructuredTool } from "langchain/tools";
import { AgentExecutor, initializeAgentExecutorWithOptions } from "langchain/agents";
import { z } from "zod";

type ChatOpenAIOptions = ConstructorParameters<typeof ChatOpenAI>[0];

export const createAgentExecutor = async (options: { llmOptions: ChatOpenAIOptions }): Promise<AgentExecutor> => {
    const rawFunctions = {
        GetArticles: (new ArticlesService()).get,
        GetLawData: (new LawDataService()).get,
        GetLawLists: (new LawListsService()).get,
        GetUpdateLawLists: (new UpdateLawListsService()).get,
    };

    const origFunctions = (
        (await createOpenAPIChain(
            origSpecObj as any,
            { llm: null as unknown as ChatOpenAI },
        ))
            .chains[0] as LLMChain<string, ChatOpenAI>
    ).llmKwargs?.functions ?? [];

    const functions: ChatCompletionFunctions[] = [];
    const tools: StructuredTool[] = [];

    for (const fSpec of origFunctions) {

        const {
            params,
            path_params,
        } = fSpec.parameters?.properties;

        const parameters = {
            type: "object",
            properties: {
                ...params?.properties,
                ...path_params?.properties,
            },
            required: [
                ...(params?.required ?? []),
                ...(path_params?.required ?? []),
            ],
        };

        functions.push({
            name: fSpec.name,
            description: fSpec.description,
            parameters,
        });

        const rawFunction = rawFunctions[fSpec.name as keyof typeof rawFunctions];

        tools.push(new DynamicStructuredTool({
            name: fSpec.name,
            description: fSpec.description ?? "",
            func: async (input) => {
                const ret = await rawFunction(input as any);
                return JSON.stringify(ret);
            },
            schema: z.object(Object.fromEntries(Object.keys(parameters.properties).map(key => [key, z.any()]))),
        }));

    }

    const llm = new ChatOpenAI({
        ...options.llmOptions,
        modelKwargs: {
            ...options.llmOptions?.modelKwargs,
            functions: [
                ...(options.llmOptions?.modelKwargs?.functions ?? []),
                ...functions,
            ],
        },
    });

    console.log({ functions });

    return initializeAgentExecutorWithOptions(
        tools,
        llm,
        {
            agentType: "openai-functions",
            verbose: true,
            agentArgs: {
                prefix: "You are a helpful and careful AI assistant designed to answer questions about Japanese laws using the given functions. Keep in mind that the exact text content such as words and characters matter for laws. Do not make up an answer.",
            }
        },
    );
}






