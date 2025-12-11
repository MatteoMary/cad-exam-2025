import { SQSHandler } from "aws-lambda";

export const handler: SQSHandler = async (event) => {
  console.log("Faulty messages received by lambdaB:", JSON.stringify(event));

  for (const record of event.Records) {
    console.log("Faulty auction item body:", record.body);
    console.log("Faulty auction item attributes:", record.messageAttributes);
  }
};