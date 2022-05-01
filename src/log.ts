import { writable } from "svelte/store";

export const log = writable<Array<string>>([]);
export const logCount = writable<number>(0);

export const add_log = (...args: Array<string>) => {
  logCount.update((n) => n + 1);
  let count;
  logCount.subscribe((c) => {
    count = c;
  });
  log.update((e) => {
    e.push(count + ". " + args.join(" "));
    return e;
  });
  log.subscribe((i) => {
    localStorage.setItem("log", JSON.stringify(i));
  });
};
