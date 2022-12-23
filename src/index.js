import ngrok from "ngrok";

import { gitHubActions, octokit } from "./octokit.js";

import { url } from "./ngrok.js";

(async () => {
  await url();
  console.log(url);

  // const specificHook = await gitHubActions.getRepoWebhook;
  // console.log(specificHook);

  const listOfWebhooks = await gitHubActions.listRepoWebhooks;
  await console.log(listOfWebhooks);

  // await gitHubActions.deleteSpecificRepoWebhook;
  await console.log(gitHubActions.listRepoWebhooks.data.length);

  const testPush = gitHubActions.testPushToRepoWebhook;
  console.log(testPush.status);

  // const pooer = await gitHubActions.listRepoWebhooks.data.forEach((item) => {
  //   console.log(item.id);
  // });
  // console.log(pooer);
})();
