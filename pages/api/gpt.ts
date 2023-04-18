// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const params = JSON.parse(req.body);

  console.log(params, process.env.OPEN_AI_KEY);
  const configuration = new Configuration({
    organization: "org-H4nEDwmNkTLoJNLSPUomrJ7O",
    apiKey: process.env.OPEN_AI_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: params.chatSettings.model,
    prompt: params.userInput,
    temperature: params.chatSettings.temperature,
    max_tokens: params.chatSettings.maxTokens,
  });
  console.log(response.data);
  res.status(200).json(response.data.choices[0]);
}
