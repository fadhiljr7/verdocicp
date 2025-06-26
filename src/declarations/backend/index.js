import {Actor, HttpAgent} from "@dfinity/agent";
import { idlFactory } from "./backend.did.js";
import {canisterId} from "../../backend_id";

const agent = new HttpAgent({
    //host: "http://127.0.0.1:4943",
    host: "https://ic0.app", 
});

// if (import.meta.env.MODE === 'development'){
//     await agent.fetchRootKey().catch(err => {
//         console.warn('unable to fetch root key. this happen in local development')
//         console.error(err);
//     });
// }

export const backend = Actor.createActor(idlFactory, {
    agent,
    canisterId,
});