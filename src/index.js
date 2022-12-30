import ngrok from "ngrok";

import express from "express";

const app = express();

import { url } from "./ngrok.js";

// import { NGROK_TOKEN } from "./hidden/index.js";

// //import dotenv
// import * as dotenv from "dotenv";
// dotenv.config();

// //make var for our token so it is hidden
// const NGROK_TOKEN = process.env.NGROK_TOKEN;

import { gitHubActions, octokit } from "./octokit.js";

(async () => {
  //connect to ngrok server and return the tunnel they make
  const currentUrl = await url;
  console.log(`This is our ngrok tunnel : ${currentUrl}`);

  //get our specific webhook
  const specificHook = await gitHubActions.getRepoWebhook;

  //the hooks data
  console.log(specificHook.data);

  //the OLD url to which the payloads will be delivered (to show change)
  console.log(`the OLD url : ${specificHook.data.config.url}`);

  //change the url that the payloads will be delivered to equal our ngrok tunnel
  specificHook.data.config.url = await url;

  //url should be changed now
  await console.log(
    `url should be changed now : ${specificHook.data.config.url}`
  );

  // console.log(specificHook.data);

  //amount of webhooks for this repo
  await console.log(
    `The amount of webhooks for this repo is : ${gitHubActions.listRepoWebhooks.data.length}`
  );

  //this will trigger the hook with the latest push to the current repository(has to be sub to push events)
  const testPush = gitHubActions.testPushToRepoWebhook;
  console.log(`The test push status is : ${testPush.status}`); //Status: 204 => No Content

  console.log(testPush);

  // //returns a list of webhook deliveries for a webhook configured in a repository
  // const listOfDelivered = await gitHubActions.listDeleveriesForARepo;
  // // console.log(listOfDelivered);
  // //the # of deliveries
  // console.log(
  //   `The amount of webhook deliveries for THIS webhook in this repo is : ${listOfDelivered.data.length}`
  // );
  //test

  //this will trigger a ping event to be sent to the hook
  const ping = await gitHubActions.pingRepoWebhook;
  console.log(`ping : ${ping}`);

  app.listen(8180, () => {
    console.log("listening...");
  });
})();
