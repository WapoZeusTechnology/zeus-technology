import { ZeusHooks } from "../../ZeusHooks";
import EventEmitter from "eventemitter3";

describe("ZeusHooks.zeusAdRegistered", () => {
  beforeEach(() => {
    globalThis.zeus = new EventEmitter();
  });

  afterEach(() => {
    delete globalThis.zeus;
    jest.clearAllMocks();
  });

  /**
   * Registration with zeus
   *
   * 1. Listens for events on REGISTER_CUSTOM_BIDDER
   * 2. Calls onBiddingStart
   * 3. Verify REGISTER_CUSTOM_BIDDER is emitted with a random id string
   */
  it("Registers with Zeus", async () => {
    const registerCallback = jest.fn();
    globalThis.zeus.on("REGISTER_CUSTOM_BIDDER", registerCallback);

    await ZeusHooks.onBiddingStart({}, () => {});

    expect(registerCallback).toHaveBeenCalledTimes(1);
    expect(registerCallback).toHaveBeenCalledWith({
      adapterId: expect.any(String)
    });
  });

  /**
   * Happy path for a custom bidder.
   *
   * 1. Create a usercallback function that will be called when bidding is started, and will return
   * as a resolved promise indicating user bidding was a success
   * 2. Listen for CUSTOM_BIDDING_FINISHED so we can check that event is emitted properly at the
   * end of the bidding cycle.
   * 3. Call the hook to setup bidding
   * 4. Verify callbacks weren't called yet since bidding hasn't started.
   * 5. emit CUSTOM_BIDDING_START to start the bid cycle
   * 6. Wait for bidding cycle to finish.
   * 7. Verify all callbacks and that zeus would be informed of success.
   */
  it("Resolves and notifies zeus when bidding callback is successfull", async () => {
    const adapter = { foo: "bar" };
    const slots = [{ id: "foo" }, { id: "bar" }];
    // Save the adapter ID passed to register custom bidder so we can verify the id passed on
    // CUSTOM_BIDDING_FINSIEHD event back to zeus.
    let adapterId = null;
    globalThis.zeus.on(
      "REGISTER_CUSTOM_BIDDER",
      obj => (adapterId = obj.adapterId)
    );

    // Setup callbacks
    const userCallback = jest.fn(() => Promise.resolve());
    let biddingFinishedCallback = null;
    // Creating a promise so we have something to wait for. We need to wait until custom bidding
    // finished was emitted, then we can check the callbacks
    const biddingFinishedPromise = new Promise(resolve => {
      biddingFinishedCallback = jest.fn(resolve);
    });
    globalThis.zeus.on("CUSTOM_BIDDING_FINISHED", biddingFinishedCallback);

    // Setup the hook
    ZeusHooks.onBiddingStart(adapter, userCallback);

    // Verify nothing was called
    expect(userCallback).not.toHaveBeenCalled();
    expect(biddingFinishedCallback).not.toHaveBeenCalled();

    // Start bidding and wait for bidding process to finish
    globalThis.zeus.emit("CUSTOM_BIDDING_START", slots);
    await biddingFinishedPromise;

    // Verify callbacks were called as expected
    expect(userCallback).toHaveBeenCalledTimes(1);
    expect(userCallback).toHaveBeenCalledWith(adapter, ["foo", "bar"]);
    expect(biddingFinishedCallback).toHaveBeenCalledTimes(1);
    expect(biddingFinishedCallback).toHaveBeenCalledWith({
      adapterId,
      success: true
    });
  });

  /**
   * Error path for a custom bidder.
   *
   * 1. Create a usercallback function that will be called when bidding is started, and will return
   * as a rejected promise indicating user bidding was a failure
   * 2. Listen for CUSTOM_BIDDING_FINISHED so we can check that event is emitted properly at the
   * end of the bidding cycle.
   * 3. Call the hook to setup bidding
   * 4. Verify callbacks weren't called yet since bidding hasn't started.
   * 5. emit CUSTOM_BIDDING_START to start the bid cycle
   * 6. Wait for bidding cycle to finish.
   * 7. Verify all callbacks and that zeus would be informed of failure and any errors returned
   * from the user callback are passed to zeus.
   */
  it("Resolves and notifies zeus when bidding callback is unsuccessful", async () => {
    const adapter = { foo: "bar" };
    const error = new Error("Something happened.");
    const slots = [{ id: "foo" }, { id: "bar" }];
    // Save the adapter ID passed to register custom bidder so we can verify the id passed on
    // CUSTOM_BIDDING_FINSIEHD event back to zeus.
    let adapterId = null;
    globalThis.zeus.on(
      "REGISTER_CUSTOM_BIDDER",
      obj => (adapterId = obj.adapterId)
    );

    // setup callbacks
    const userCallback = jest.fn(() => Promise.reject(error));
    let biddingFinishedCallback = null;
    // Creating a promise so we have something to wait for. We need to wait until custom bidding
    // finished was emitted, then we can check the callbacks
    const biddingFinishedPromise = new Promise(resolve => {
      biddingFinishedCallback = jest.fn(resolve);
    });
    globalThis.zeus.on("CUSTOM_BIDDING_FINISHED", biddingFinishedCallback);

    // Setup the hook
    ZeusHooks.onBiddingStart(adapter, userCallback);

    // Verify nothing was called
    expect(userCallback).not.toHaveBeenCalled();
    expect(biddingFinishedCallback).not.toHaveBeenCalled();

    // Start bidding and wait for bidding process to finish
    globalThis.zeus.emit("CUSTOM_BIDDING_START", slots);
    await biddingFinishedPromise;

    // Verify callbacks were called as expected
    expect(userCallback).toHaveBeenCalledTimes(1);
    expect(userCallback).toHaveBeenCalledWith(adapter, ["foo", "bar"]);
    expect(biddingFinishedCallback).toHaveBeenCalledTimes(1);
    expect(biddingFinishedCallback).toHaveBeenCalledWith({
      adapterId,
      success: false,
      error
    });
  });
});
