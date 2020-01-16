/**
 * These are publically available commands that will be available on the ZeusAdapter. All of the
 * commands in this list will be added to the ZeusAdapter object and available for users to call.
 */

import { delay, timeout } from "./utils";

// let inBidding = false;
const SCRIPT_LOAD_WAIT_DELAY = 20; // Time between checks for the script
const SCRIPT_WAIT_TIMEOUT = 10000; // Time until bailing on waiting for the script to load
const scriptDone = id => !!document.getElementById(id);

export const ZeusCommands = {
  loadScript: async (scriptUrl, scriptId) => {
    globalThis.zeus.emit("CUSTOM_LOAD_SCRIPT", {
      scriptId,
      scriptUrl
    });

    // Waits until the script has been found on the page. Searches by scriptId for an element
    // to be put on the dom.
    const waitForScript = async () => {
      // Sit in a wait loop until the script is ready.
      while (!scriptDone(scriptId)) {
        await delay(SCRIPT_LOAD_WAIT_DELAY);
      }
    };

    // Wait for script or cancel if a timeout occurs
    return Promise.race([
      waitForScript(),
      timeout(
        "Timeout waiting for script [some-script-id] to be added to dom.",
        SCRIPT_WAIT_TIMEOUT
      )
    ]);
  }
};

Object.freeze(ZeusCommands);
