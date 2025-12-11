/* eslint-disable import/extensions, import/no-absolute-path */
import { SQSHandler } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { DBAuctionItem , AuctionItem, AuctionType } from "../shared/types";

const ddbClient = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);



export const handler: SQSHandler = async (event) => {
  console.log("Event ", JSON.stringify(event));

  for (const record of event.Records) {
    const auctionItem = JSON.parse(record.body) as AuctionItem;

    const auctionTypeAttr =
  (record.messageAttributes?.auction_type?.stringValue ?? "Public") as AuctionType;

    for (const record of event.Records) {
  const auctionItem = JSON.parse(record.body) as AuctionItem;

  const auctionTypeAttr =
    (record.messageAttributes?.auction_type?.stringValue ?? "Public") as AuctionType;

  if (auctionItem.marketValue < auctionItem.minimumPrice) {
    console.log(
      "Invalid auction item – marketValue < minimumPrice",
      JSON.stringify(auctionItem)
    );
    throw new Error("Invalid auction item: marketValue less than minimumPrice");
  }

  const dbItem: DBAuctionItem = {
    ...auctionItem,
    auctionType: auctionTypeAttr,
  };
}


const dbItem: DBAuctionItem = {
  ...auctionItem,
  auctionType: auctionTypeAttr,
};

    console.log("DB item", JSON.stringify(dbItem));

    const command = new PutCommand({
      TableName: process.env.TABLE_NAME,
      Item: dbItem,
    });

    await ddbDocClient.send(command);
  }
};



function createDDbDocClient() {
  const ddbClient = new DynamoDBClient({ region: process.env.REGION });
  const marshallOptions = {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  };
  const unmarshallOptions = {
    wrapNumbers: false,
  };
  const translateConfig = { marshallOptions, unmarshallOptions };
  return DynamoDBDocumentClient.from(ddbClient, translateConfig);
}
