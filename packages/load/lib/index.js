/**
 * This component performs the loading of the remote Zeus script.
 * @param {Object} props The properties passed to the component
 * @param {string} props.url The URL to load in to the script
 * @returns This function returns a `<script />` tag with the URL you provided which will work for Zeus.
 */
export const zeusLoader = ({ url }) =>
  `<scipt src="${url}" async="true" id="__zeus_script" />`;
