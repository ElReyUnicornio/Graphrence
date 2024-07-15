import { invoke } from '@tauri-apps/api/tauri';

async function greet(name: string, callback: (msg: string) => any) {
    callback(await invoke("greet", { name }));
}

export { greet };