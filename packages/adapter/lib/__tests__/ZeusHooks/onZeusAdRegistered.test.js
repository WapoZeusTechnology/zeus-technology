import { ZeusHooks } from "../../ZeusHooks";
import EventEmitter from "eventemitter3";

describe("ZeusHooks.zeusAdRegistered", () => {
  afterEach(() => {
    delete globalThis.zeus;
    jest.clearAllMocks();
  });

  it("Registers the hook with the eventemitter when called", () => {
    globalThis.zeus = { on: jest.fn() };

    ZeusHooks.onZeusAdRegistered({}, () => {});

    expect(globalThis.zeus.on).toHaveBeenCalledWith(
      "NODE_CONNECTED",
      expect.any(Function)
    );
  });

  it('Calls the provided callback with node ids when "NODE_CONNECTED" is emitted', () => {
    globalThis.zeus = new EventEmitter();
    const adapter = { runCommand: jest.fn(cmd => cmd()) };
    const callback = jest.fn();

    ZeusHooks.onZeusAdRegistered(adapter, callback);

    globalThis.zeus.emit("NODE_CONNECTED", { id: "foo" });

    expect(callback).toHaveBeenCalledWith(adapter, "foo");
  });

  it("Calls callback with node ids for all connected nodes if connect is called after zeus loads", () => {
    globalThis.zeus = new EventEmitter();
    globalThis.zeus.adNodes = [{ id: "foo" }];
    const adapter = { runCommand: jest.fn(cmd => cmd()) };
    const callback = jest.fn();

    ZeusHooks.onZeusAdRegistered(adapter, callback);
    expect(callback).toHaveBeenCalledWith(adapter, "foo");
  });
});
