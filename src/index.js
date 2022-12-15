import ngrok from "ngrok";

import { createWebhookPush } from "./octokit.js";

import { url } from "./ngrok.js";

import { gitHubActions } from "./octokit.js";

(async () => {
  await url;
  await createWebhookPush();
})();
