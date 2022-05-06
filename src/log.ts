import { writable } from "svelte/store";

export const log = writable<Array<Array<string>>>(
  JSON.parse(localStorage.getItem("log")) || []
);
//let turn = [];

export const add_log = (...args: Array<string>) => {
  log.update((e) => {
    const last = e[e.length - 1];
    if (e.length == 0 || last.length == 2) {
      e.push([args.join(" ")]);
    }
    if (last.length != 2) {
      last.push(args.join(" "));
    }
    localStorage.setItem("log", JSON.stringify(e));
    return e;
  });
  return;
};
