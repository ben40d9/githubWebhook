import ngrok from "ngrok";

//import dotenv
import * as dotenv from "dotenv";
dotenv.config();

//make var for our token so it is hidden
import { NGROK_TOKEN } from "./hidden/index.js";

//connect to ngrok server and return the tunnel they make
export const url = await ngrok.connect({
  proto: "http", // http|tcp|tls, defaults to http
  addr: 8180, // port or network address, defaults to 80
  authtoken: `${NGROK_TOKEN}`, // your authtoken from ngrok.com
});
