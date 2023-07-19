import { writable } from "svelte/store";

type Toast = {
  id: string;
  message: string;
}

export const toasts = writable<Toast[]>([]);

export function toast(message: string) {
  const id = Math.random().toString(36).substring(2, 7);
  toasts.update((state) => [{ id, message }, ...state])
  setTimeout(() => removeToast(id), 3000)
}

function removeToast(id: string) {
  toasts.update((state) => {
    return state.filter((toast) => toast.id !== id);
  })
}