import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { db } from './user';

let Log: any = {
	subscribe: () => {},
	update: () => {},
	set: () => {}
};

let Add_log = (multi: boolean, ..._msg: Array<string>) => {};

const arr_to_obj = (arr: Array<Array<string>>) => {
	let obj: { [key: number]: any } = {};
	arr.map((c, i) => {
		obj[i] = JSON.stringify(c);
	});

	return obj;
};
if (browser) {
	Log = writable<Array<Array<string>>>(JSON.parse(localStorage.getItem('log') as string) || []);
	//let turn = [];

	Add_log = (multi: boolean, ...args: Array<string>) => {
		Log.update((e: any) => {
			const last = e[e.length - 1];
			if (e.length == 0 || last.length == 2) {
				e.push([args.join(' ')]);
			} else if (last?.length != 2) {
				last.push(args.join(' '));
			}
			if (multi) {
				db.get(('log_' + localStorage.getItem('game_id')) as string).set(last[last.length - 1]);
			}
			localStorage.setItem('log', JSON.stringify(e));
			return e;
		});
		return;
	};
}

export const log = Log;
export const add_log = Add_log;
