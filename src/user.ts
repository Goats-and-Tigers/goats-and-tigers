import Cookie from "@gardelin/cookie-wrapper";
import GUN from "gun";
import "gun/sea";
import { writable } from "svelte/store";
import Cookies from "js-cookie";

export const db = GUN({
  peers: ["http://localhost:8080/gun"],
});
export const user = db.user().recall({ sessionStorage: true });

export const username = writable("");

user.get("alias").on((v) => username.set(v));

db.on("auth", async (e) => {
  Cookies.set("u", sessionStorage.getItem("pair"), { expires: 10 });
  const alias = await user.get("alias");
  console.log("signed in as", alias);
});

db.on("hi", () => {
  const u = Cookies.get("u");
  if (u?.length == 0) {
    console.log("not logged in");
  } else {
    sessionStorage.setItem("recall", "true");
    sessionStorage.setItem("pair", u);
    if (!sessionStorage.getItem("auth")) {
      window.location.reload();
      sessionStorage.setItem("auth", "true");
    }
  }
});
