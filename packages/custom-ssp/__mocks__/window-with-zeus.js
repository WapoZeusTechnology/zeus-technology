/**
 * THIS IS NOT ACTUAL ZEUS CODE! DO NOT USE THIS AS A SUBSTITUTE FOR YOUR HOSTED ZEUS LIBRARY!
 * -------------------------------------------------------------------------------------------
 * The purpose of this module is to provide a testing interface to Zeus.
 */

import EventEmitter from "eventemitter3";

export class FakeZeus extends EventEmitter {
  constructor() {
    super();
  }
}
