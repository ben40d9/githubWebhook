import ngrok from "ngrok";

import express from "express";

const app = express();
app.use(express.json());

import { url } from "./ngrok.js";

import { gitHubActions, octokit, updateGhWebhookUrl } from "./octokit.js";

(async () => {
  await app.post("/webhook", async (req, res) => {
    res.send(console.log(`this is our req body${req.body.repository}`));
  });

  await app.listen(8180, () => {
    console.log("listening for product updates...");
  });

  //connect to ngrok server and return the tunnel they make
  const tunnelUrl = await url;
  console.log(`This is our ngrok tunnel : ${tunnelUrl}`);

  //get our specific webhook
  const specificHook = await gitHubActions.getRepoWebhook;

  //the hooks data
  console.log(specificHook.data);

  //the OLD url to which the payloads will be delivered (to show change)
  console.log(`the OLD url : ${specificHook.data.config.url}`);

  //get the webhooks config
  const webhookConfig = await gitHubActions.getWebhookConfig;
  console.log(webhookConfig);

  // const updateWebhookConfig = await octokit.request(
  //   "PATCH /repos/{owner}/{repo}/hooks/{hook_id}/config",
  //   {
  //     owner: "**",
  //     repo: "**",
  //     hook_id: "**",
  //     content_type: "json",
  //     //change here
  //     url: `${currentUrl}`,
  //   }
  // );

  // console.log(updateWebhookConfig);

  //change the url that the payloads will be delivered to equal our ngrok tunnel
  specificHook.data.config.url = await tunnelUrl;

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

  //returns a list of webhook deliveries for a webhook configured in a repository
  const listOfDelivered = await gitHubActions.listDeleveriesForARepo;
  // console.log(listOfDelivered);
  //the # of deliveries
  console.log(
    `The amount of webhook deliveries for THIS webhook in this repo is : ${listOfDelivered.data.length}`
  );

  //this will trigger a ping event to be sent to the hook
  const ping = await gitHubActions.pingRepoWebhook;
  console.log(`ping : ${ping}`);

  // await updateGhWebhookUrl(tunnelUrl);

  // console.log(`the NEW url : ${specificHook.data.config.url}`);

  // console.log(`this is the updated config url: ${updatedWebhookConfig.url}`);
})();
