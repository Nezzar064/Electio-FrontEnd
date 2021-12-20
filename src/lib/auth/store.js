import { persist, localStorage } from "@macfja/svelte-persistent-store"
import { writable } from "svelte/store"

export let isAuthenticated = persist(writable(false), localStorage(), 'isAuthenticated')

