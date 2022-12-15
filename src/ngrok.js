import ngrok from "ngrok";

const { GH_TOKEN } = process.env;

export const url = await ngrok.connect({
  proto: "http", // http|tcp|tls, defaults to http
  addr: 8180, // port or network address, defaults to 80
  authtoken: `${GH_TOKEN}`, // your authtoken from ngrok.com
});

// console.log(url);
