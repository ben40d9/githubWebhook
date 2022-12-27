import ngrok from "ngrok";

//import dotenv
import * as dotenv from "dotenv";
dotenv.config();

//make var for our token so it is hidden
const NGROK_TOKEN = process.env.NGROK_TOKEN;

import { gitHubActions, octokit } from "./octokit.js";

(async () => {
  //connect to ngrok server and return the tunnel they make
  const url = await ngrok.connect({
    proto: "http",
    addr: 8180,
    authtoken: `${NGROK_TOKEN}`,
  });
  console.log(url);

  const listOfWebhooks = await gitHubActions.listRepoWebhooks;
  // await console.log(listOfWebhooks);

  const specificHook = await gitHubActions.getRepoWebhook;
  console.log(specificHook);

  // await gitHubActions.deleteSpecificRepoWebhook;
  await console.log(
    `The amount of webhooks for this repo is : ${gitHubActions.listRepoWebhooks.data.length}`
  );

  const testPush = gitHubActions.testPushToRepoWebhook;
  console.log(`The test push status is : ${testPush.status}`); //Status: 204 => No Content

  const listOfDelivered = await gitHubActions.listDeleveriesForARepo;
  console.log(
    `The amount of webhook deliveries for THIS webhook in this repo is : ${listOfDelivered.data.length}`
  );

  const ping = await gitHubActions.pingRepoWebhook;
  console.log(ping);

  // const pooer = await gitHubActions.listRepoWebhooks.data.forEach((item) => {
  //   console.log(item.id);
  // });
  // console.log(pooer);
})();
