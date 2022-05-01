import { writable } from "svelte/store";

export const log = writable<Array<string>>([]);

export const add_log = (...args: Array<string>) => {
  log.update((e) => {
    e.push(args.join(" "));
    return e;
  });
  log.subscribe((i) => {
    localStorage.setItem("log", JSON.stringify(i));
  });
};
