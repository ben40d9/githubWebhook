import ngrok from "ngrok";

import express from "express";

const app = express();

// import { NGROK_TOKEN } from "./hidden/index.js";

// //import dotenv
// import * as dotenv from "dotenv";
// dotenv.config();

// //make var for our token so it is hidden
// const NGROK_TOKEN = process.env.NGROK_TOKEN;

import { gitHubActions, octokit } from "./octokit.js";

(async () => {
  //connect to ngrok server and return the tunnel they make
  const url = await ngrok.connect({
    proto: "http",
    addr: 8180,
    authtoken: "2INNlEthLOiiKCffVd9oZtFF0oM_7wSKZn8bJKCbWjqtSGXFR",
  });
  console.log(`This is our ngrok tunnel: ${url}`);

  const specificHook = await gitHubActions.getRepoWebhook;
  console.log(specificHook);

  await console.log(
    `The amount of webhooks for this repo is : ${gitHubActions.listRepoWebhooks.data.length}`
  );

  //this will trigger the hook with the latest push to the current repository(has to be sub to push events)
  const testPush = gitHubActions.testPushToRepoWebhook;
  console.log(`The test push status is : ${testPush.status}`); //Status: 204 => No Content

  //returns a list of webhook deliveries for a webhook configured in a repository
  const listOfDelivered = await gitHubActions.listDeleveriesForARepo;
  // console.log(listOfDelivered);
  //the # of deliveries
  console.log(
    `The amount of webhook deliveries for THIS webhook in this repo is : ${listOfDelivered.data.length}`
  );

  //this will trigger a ping event to be sent to the hook
  const ping = await gitHubActions.pingRepoWebhook;
  console.log(`ping: ${ping}`);

  //
  app.listen(8180, () => {
    console.log("listening...");
  });
})();
