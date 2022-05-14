import { browser } from '$app/env';
import { writable } from 'svelte/store';

let Log: any;
let Add_log;
if (browser) {
	Log = writable<Array<Array<string>>>(JSON.parse(localStorage.getItem('log') as string) || []);
	//let turn = [];

	Add_log = (...args: Array<string>) => {
		Log.update((e: any) => {
			const last = e[e.length - 1];
			if (e.length == 0 || last.length == 2) {
				e.push([args.join(' ')]);
			} else if (last?.length != 2) {
				last.push(args.join(' '));
			}
			localStorage.setItem('log', JSON.stringify(e));
			return e;
		});
		return;
	};
}

export const log = Log;
export const add_log = Add_log;
