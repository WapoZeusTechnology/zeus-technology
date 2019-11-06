import { ZeusCommands } from "../lib/ZeusCommands";

import { FakeZeus } from "window-with-zeus";

const AScriptUrl = "https://npm-test.zeustechnology.io";

describe("ZeusCommands", () => {
  test("Basics", () => {
    expect(typeof ZeusCommands).toBe("object");
  });

  test("ZeusCommands#loadScript()", () => {
    expect(ZeusCommands.hasOwnProperty("loadScript")).toBeTruthy();

    // Let's set up a fake Zeus
    globalThis.zeus = new FakeZeus();
    const customSspCommandHook = jest.fn();
    globalThis.zeus.on("CUSTOM_LOAD_SCRIPT", customSspCommandHook);

    expect(async () => {
      await ZeusCommands.loadScript(AScriptUrl, "some-script-id");
    }).not.toThrow();
    expect(customSspCommandHook.mock.calls).toEqual([
      [{ scriptUrl: AScriptUrl, scriptId: "some-script-id" }]
    ]);
  });
});
