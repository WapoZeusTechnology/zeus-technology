import { zeusNotice } from "./zeus-notice";
export const loadOptionalModule = moduleName => {
  let reqResult = undefined;

  try {
    reqResult = require(moduleName);
  } catch (e) {
    zeusNotice(
      `Failed to load optional module «${moduleName}». This may result in unexpected behavior.`
    );
    console.error(e);
  }

  return reqResult;
};
