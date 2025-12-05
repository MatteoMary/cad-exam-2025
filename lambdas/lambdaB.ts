import { Handler } from "aws-lambda";

export const handler: Handler = async (event: any) => {
  console.log("Event ", JSON.stringify(event));

};
