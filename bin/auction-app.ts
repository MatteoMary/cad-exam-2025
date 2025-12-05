#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AuctionStack } from "../lib/auction-stack";

const app = new cdk.App();
new AuctionStack(app, "AuctionStack", {
  env: { region: "eu-west-1" },
});
