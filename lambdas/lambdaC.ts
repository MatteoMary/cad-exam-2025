import { SNSHandler, SNSEvent } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const ddbDocClient = createDDbDocClient();

export const handler: SNSHandler = async (event: SNSEvent) => {
  console.log("Bid event received by lambdaC:", JSON.stringify(event));

  for (const record of event.Records) {
    const snsMessage = record.Sns.Message;
    const bid = JSON.parse(snsMessage);
    const dbItem = {
      ...bid,
      timestamp: new Date().toString(),
    };

    console.log("Writing bid to Bids table:", JSON.stringify(dbItem));

    await ddbDocClient.send(
      new PutCommand({
        TableName: process.env.BIDS_TABLE_NAME,
        Item: dbItem,
      })
    );
  }
};

function createDDbDocClient() {
  const ddbClient = new DynamoDBClient({ region: process.env.REGION });
  const marshallOptions = {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  };
  const unmarshallOptions = { wrapNumbers: false };
  const translateConfig = { marshallOptions, unmarshallOptions };
  return DynamoDBDocumentClient.from(ddbClient, translateConfig);
}