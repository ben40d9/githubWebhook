import { Octokit, App } from "octokit";

import { GH_ACCOUNT, GH_REPO_NAME, GH_TOKEN } from "./hidden/index.js";

// //import dotenv
// import * as dotenv from "dotenv";
// dotenv.config();

// //import values set in .env
// const { GH_TOKEN, GH_REPO_NAME, GH_ACCOUNT } = process.env;

export const octokit = new Octokit({
  auth: `${GH_TOKEN}`,
});

//all webhook actions
export const gitHubActions = {
  //create webhook
  // createWebhookPush: await octokit.request("POST /repos/{owner}/{repo}/hooks", {
  //   owner: `${GH_ACCOUNT}`,
  //   repo: `${GH_REPO_NAME}`,
  //   name: "web",
  //   active: true,
  //   events: ["push"],
  //   config: {
  //     url: `${url}`,
  //     content_type: "json",
  //     insecure_ssl: "0",
  //   },
  // }),

  // list repo webhooks
  listRepoWebhooks: await octokit.request(
    "GET /repos/{owner}/{repo}/hooks{?per_page,page}",
    {
      owner: `${GH_ACCOUNT}`,
      repo: `${GH_REPO_NAME}`,
    }
  ),

  //test push to webhook
  testPushToRepoWebhook: await octokit.request(
    "POST /repos/{owner}/{repo}/hooks/{hook_id}/tests",
    {
      owner: `${GH_ACCOUNT}`,
      repo: `${GH_REPO_NAME}`,
      hook_id: "393663340",
    }
  ),

  //returns a list of webhook deliveries for a webhook configured in a repository
  listDeleveriesForARepo: await octokit.request(
    "GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries{?per_page,cursor,redelivery}",
    {
      owner: `${GH_ACCOUNT}`,
      repo: `${GH_REPO_NAME}`,
      hook_id: "393663340",
    }
  ),

  // delete a specific webhook from repo
  // deleteSpecificRepoWebhook: await octokit.request(
  //   "DELETE /repos/{owner}/{repo}/hooks/{hook_id}",
  //   {
  //     owner: `${GH_ACCOUNT}`,
  //     repo: `${GH_REPO_NAME}`,
  //     //need to ask or have user give hook_id
  //     //(maybe have to list webhooks first then )
  //     hook_id: "393663274",
  //   }
  // ),

  // get a repo webhook
  getRepoWebhook: await octokit.request(
    "GET /repos/{owner}/{repo}/hooks/{hook_id}",
    {
      owner: `${GH_ACCOUNT}`,
      repo: `${GH_REPO_NAME}`,
      hook_id: "393663340",
    }
  ),

  //get a webhook configuration for a repo
  getWebhookConfig: await octokit.request(
    "GET /repos/{owner}/{repo}/hooks/{hook_id}/config",
    {
      owner: `${GH_ACCOUNT}`,
      repo: `${GH_REPO_NAME}`,
      hook_id: "393663340",
    }
  ),

  //ping a repository webhook
  pingRepoWebhook: await octokit.request(
    "POST /repos/{owner}/{repo}/hooks/{hook_id}/pings",
    {
      owner: `${GH_ACCOUNT}`,
      repo: `${GH_REPO_NAME}`,
      hook_id: "393663340",
    }
  ),

  //update a webhook configuration for a repo
  // updateWebhookConfig: await octokit.request(
  //   "PATCH /repos/{owner}/{repo}/hooks/{hook_id}/config",
  //   {
  //     owner: `${GH_ACCOUNT}`,
  //     repo: `${GH_REPO_NAME}`,
  //     hook_id: "393663340",
  //     content_type: "json",
  //     //change here
  //     url: "https://example.com/webhook",
  //   }
  // ),
};

// const pooer = gitHubActions.listRepoWebhooks.data.forEach((item) => {
//   console.log(item.id);
// });
// console.log(pooer);

// const one = pooer.forEach((poo) => {
//   [...poo];
// });
// console.log(one)
