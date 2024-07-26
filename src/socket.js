import { reactive } from "vue";
import { io } from "socket.io-client";
import { auto } from "@popperjs/core";

export const state = reactive({
    connected: false,
    fooEvents: [],
    barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? "https://192.168.13.1:789" : "https://192.168.13.1:789";

export const socket = io(URL, { autoConnect: true, path: "/11/" });

// socket.on("connect", () => {
//     state.connected = true;
// });

// socket.on("disconnect", () => {
//     state.connected = false;
// });