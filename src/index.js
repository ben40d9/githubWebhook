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

  // const specificHook = await gitHubActions.getRepoWebhook;
  // console.log(specificHook);

  const listOfWebhooks = await gitHubActions.listRepoWebhooks;
  // await console.log(listOfWebhooks);

  // await gitHubActions.deleteSpecificRepoWebhook;
  await console.log(gitHubActions.listRepoWebhooks.data.length);

  // const testPush = gitHubActions.testPushToRepoWebhook;
  // console.log(testPush.status);

  const listOfDelivered = await gitHubActions.listDeleveriesForARepo;
  console.log(listOfDelivered.data.length);

  // const pooer = await gitHubActions.listRepoWebhooks.data.forEach((item) => {
  //   console.log(item.id);
  // });
  // console.log(pooer);
})();
