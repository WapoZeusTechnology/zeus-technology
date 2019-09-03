/**
 * This component performs the loading of the remote Zeus script.
 * @param {Object} props The properties passed to the component
 * @param {string} props.url The URL to load in to the script
 * @returns This function returns a `<script />` tag with the URL you provided which will work for Zeus.
 */
export const zeusLoader = ({ url }) =>
  `<script crossorigin="true" src="${url}" async="true" id="__zeus_script"></script><script type="application/javascript">document.getElementById("__zeus_script").onload=function(){window.zeus.run()}</script>`;
