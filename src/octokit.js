//WILL PUT EVERYTHING REGARDING OCTOKIT HERE EVENTUALLY
//for now just putting in index b/c target url is found there

import { Octokit, App } from "octokit";

import { url } from "./ngrok.js";

//import values set in .env
const { GH_TOKEN, GH_REPO_NAME, GH_ACCOUNT } = process.env;
// console.log(GH_TOKEN);

export const octokit = new Octokit({
  auth: `${GH_TOKEN}`,
});

export const createWebhookPush = await octokit.request(
  "POST /repos/{owner}/{repo}/hooks",
  {
    owner: `${GH_ACCOUNT}`,
    repo: `${GH_REPO_NAME}`,
    name: "web",
    active: true,
    events: ["push"],
    config: {
      url: `${url}`,
      content_type: "json",
      insecure_ssl: "0",
    },
  }
);

console.log(createWebhookPush);

// const webConfig = await octokit.request(
//   "GET /repos/{owner}/{repo}/hooks/{hook_id}/config",
//   {
//     owner: `${GH_ACCOUNT}`,
//     repo: `${GH_REPO_NAME}`,
//     hook_id: "HOOK_ID",
//   }
// );

// export const listRepoWebhooks = async () => {
//   await octokit.request("GET /repos/{owner}/{repo}/hooks{?per_page,page}", {
//     owner: `${GH_ACCOUNT}`,
//     repo: "webhookListen",
//   });
// };
// console.log(listRepoWebhooks());

// export const gitHubActions = {
//   createWebhookPush: async () => {
//     await octokit.request("POST /repos/{owner}/{repo}/hooks", {
//       owner: `${GH_ACCOUNT}`,
//       repo: `${GH_REPO_NAME}`,
//       name: "web",
//       active: true,
//       events: ["push"],
//       config: {
//         url: `${url}`,
//         content_type: "json",
//         insecure_ssl: "0",
//       },
//     });
//   },

//   listRepoWebhooks: async () => {
//     await octokit.request("GET /repos/{owner}/{repo}/hooks{?per_page,page}", {
//       owner: `${GH_ACCOUNT}`,
//       repo: `${GH_REPO_NAME}`,
//     });
//     console.log(listRepoWebhooks);
//   },
// };

// console.log(gitHubActions.createWebhookPush());

// async () => {
//   await url;
//   await gitHubActions.createWebhookPush;
//   await gitHubActions.listRepoWebhooks;
//   console.log(gitHubActions.listRepoWebhooks);
// };
