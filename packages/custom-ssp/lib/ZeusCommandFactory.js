export const ZeusCommandFactory = {
  loadScript: scriptUrl =>
    globalThis.zeus.emit("CUSTOM_SSP_COMMAND", {
      command: "loadScript",
      scriptUrl
    })
};
