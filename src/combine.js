import ngrok from "ngrok";

import express from "express";

const app = express();
app.use(express.json());

import { url } from "./ngrok.js";

import { gitHubActions, octokit, updateGhWebhookUrl } from "./octokit.js";

// async function updatedWebhookConfig(poop) {
//   await octokit.request("PATCH /repos/{owner}/{repo}/hooks/{hook_id}/config", {
//     owner: "ben40d9",
//     repo: "next-blog",
//     hook_id: "393663340",
//     content_type: "json",
//     //change here
//     url: `${poop}/webhook`,
//   });
// }

(async () => {
  await app.post("/webhook", async (req, res) => {
    // const stringIfied = await JSON.stringify(req);
    // await res.send(stringIfied);
    await res.send(req);
  });

  await app.listen(8180, () => {
    console.log("listening for product updates...");
  });

  //connect to ngrok server and return the tunnel they make
  const tunnelUrl = await url;
  console.log(`This is our ngrok tunnel : ${tunnelUrl}`);

  //get our specific webhook
  const specificHook = await gitHubActions.getRepoWebhook;

  //the OLD url to which the payloads will be delivered (to show change)
  console.log(`the OLD url : ${specificHook.data.config.url}`);

  //get the webhooks config
  const webhookConfig = await gitHubActions.getWebhookConfig;
  console.log(webhookConfig);

  // await updatedWebhookConfig(tunnelUrl);

  await updateGhWebhookUrl(tunnelUrl);

  console.log(`the NEW url : ${specificHook.data.config.url}`);

  console.log(`this is the updated config url: ${updatedWebhookConfig.url}`);
})();
