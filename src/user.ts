import GUN from "gun";
import "gun/sea";
import { writable } from "svelte/store";

export const db = GUN({ peers: ["http://localhost:3000"] });
export const user = db.user().recall({ sessionStorage: true });

export const username = writable("");

user.get("alias").on((v) => username.set(v));

db.on("auth", async (e) => {
  const alias = await user.get("alias");
  console.log("signed in as", alias);
});
