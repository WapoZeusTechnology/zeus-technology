import React, { Fragment } from "react";
import { zeusNotice } from "@zeus-platform/util";

/**
 * This component performs the loading of the remote Zeus script.
 * @param {Object} props The properties passed to the component
 * @param {string} props.url The URL to load in to the script
 * @param {Array<Object<string,string>>} props.keyValuePairs A list of key-value pairs to attribute to ad slots in DFP.
 * @param {function} props.children The one and only child must be a function which is executed once the script is loaded.
 * @returns This component always returns `null`.
 * @throws This component will throw an error if the `children` passed are inappropriate.
 * @private
 */
export const ZeusLoader = ({ url, keyValuePairs = null, children = null }) => {
  // A safety to make sure we don't run this more than once.
  if (document.getElementById("____zeus_script")) return <Fragment />;

  // Notify the console so that we know that it's happening.
  zeusNotice("Loading the Zeus Loader");

  /* Make sure we have a good bootstrap function. */
  const childFunction = children
    ? children
    : () =>
        window.zeus.run({
          kvpairs: keyValuePairs || []
        });
  if (typeof childFunction !== "function") {
    throw new Error(
      "There must only be one child passed to ZeusLoader, and that child must be a function."
    );
  }

  /* Construct the <script> element, and execute the children when it loads. */
  const newScript = document.createElement("script");
  newScript.src = url;
  newScript.id = "____zeus_script";
  newScript.async = true;
  newScript.onload = () => childFunction();
  document.head.appendChild(newScript);

  // This never actually has any meaningful output, it does all of its business in the document head.
  return <Fragment>{"<!-- Loaded Zeus -->"}</Fragment>;
};
