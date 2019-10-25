import { ZeusCommandFactory } from "../lib/ZeusCommandFactory";

import { FakeZeus } from "window-with-zeus";

const AScriptUrl = "https://npm-test.zeustechnology.io";

describe("ZeusCommandFactory", () => {
  test("Basics", () => {
    expect(typeof ZeusCommandFactory).toBe("object");
  });

  test("ZeusCommandFactory#loadScript()", () => {
    expect(ZeusCommandFactory.hasOwnProperty("loadScript")).toBeTruthy();

    // Let's set up a fake Zeus
    globalThis.zeus = new FakeZeus();
    const customSspCommandHook = jest.fn();
    globalThis.zeus.on("CUSTOM_SSP_COMMAND", customSspCommandHook);

    expect(() => {
      ZeusCommandFactory.loadScript(AScriptUrl);
    }).not.toThrow();
    expect(customSspCommandHook.mock.calls).toEqual([
      [{ command: "loadScript", scriptUrl: AScriptUrl }]
    ]);
  });
});
