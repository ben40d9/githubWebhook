import { url } from "./ngrok.js";

import { gitHubActions, octokit } from "./octokit.js";

// export const tunnelToWebhookConfig = async () => {
//   //connect to ngrok server and return the tunnel they make
//   const tunnelUrl = await url;
//   console.log(`This is our ngrok tunnel : ${tunnelUrl}`);

//   //get our specific webhook
//   const specificHook = await gitHubActions.getRepoWebhook;

//   //the OLD url to which the payloads will be delivered (to show change)
//   console.log(`the OLD url : ${specificHook.data.config.url}`);

//   const updatedWebhookConfig = await octokit.request(
//     "PATCH /repos/{owner}/{repo}/hooks/{hook_id}/config",
//     {
//       owner: "ben40d9",
//       repo: "next-blog",
//       hook_id: "393663340",
//       content_type: "json",
//       //change here
//       url: `${tunnelUrl}/webhook`,
//     }
//   );

//   console.log(updatedWebhookConfig.url);
// };

//connect to ngrok server and return the tunnel they make
const tunnelUrl = await url;
console.log(`This is our ngrok tunnel : ${tunnelUrl}`);

//get our specific webhook
const specificHook = await gitHubActions.getRepoWebhook;

//the OLD url to which the payloads will be delivered (to show change)
console.log(`the OLD url : ${specificHook.data.config.url}`);

const updatedWebhookConfig = await octokit.request(
  "PATCH /repos/{owner}/{repo}/hooks/{hook_id}/config",
  {
    owner: "ben40d9",
    repo: "next-blog",
    hook_id: "393663340",
    content_type: "json",
    //change here
    url: `${tunnelUrl}`,
  }
);

console.log(`the NEW url : ${specificHook.data.config.url}`);

console.log(`this is the updated config url: ${updatedWebhookConfig.url}`);

// app.post(
//     ("/patch",
//     async (req, res) => {
//       console.log(req);
//       //connect to ngrok server and return the tunnel they make
//       const tunnelUrl = await url;
//       console.log(`This is our ngrok tunnel : ${tunnelUrl}`);

//       //get our specific webhook
//       const specificHook = await gitHubActions.getRepoWebhook;

//       //the OLD url to which the payloads will be delivered (to show change)
//       console.log(`the OLD url : ${specificHook.data.config.url}`);

//       const updatedWebhookConfig = await octokit.request(
//         "PATCH /repos/{owner}/{repo}/hooks/{hook_id}/config",
//         {
//           owner: "ben40d9",
//           repo: "next-blog",
//           hook_id: "393663340",
//           content_type: "json",
//           //change here
//           url: `${tunnelUrl}/patch`,
//         }
//       );

//       console.log(`the NEW url : ${specificHook.data.config.url}`);

//       console.log(`this is the updated config url: ${updatedWebhookConfig.url}`);
//     })
//   );
//   app.listen(8180, () => {
//     console.log("listening...");
//   });
