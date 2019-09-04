# `@zeus-platform/load`

The purpose of the `zeusLoader` function is to simplify the loading of the Zeus library. This function interfaces with the hosted Zeus libraries which control bidding, key-value-pair management, as well as the delivery and display of creatives.

This function itself only deals with the `<script />` element which loads the hosted Zeus Technology script, and it should be used in conjunction with the `ZeusAd` React component, which will embed the advertisement element in to a given React application.

## Note on performance

Regardless of how you load Zeus Technology into your site, be certain to always have Zeus Technology as the first tag that runs on your site. This way, Zeus can start loading its code and have the bidding engine ready by time `ZeusAd` components or `zeus-ad` HTML tags are created in the DOM.

## Usage

In cases of statically rendered React, where `HtmlWebpackPlugin` is being used, we recommend passing the output of this function as a template parameter. In more complex situations, such as server-side rendering, you may be able to run this function a single time for all users.

```js
// webpack.config.js
const { zeusLoader } = require('@zeus-technology/load')
// ...

module.exports = {

  // ...

  plugins: [
    new webpack.HtmlWebpackPlugin({
      template: 'src/index.html',
      zeusTag: zeusLoader({
        url: `https://my-site-name.zeustechnology.${ dev ? 'io' : 'com' }/main.js`
      })
    }),
  ]
}
```

Then, in your template...

```html
<!DOCTYPE html>
<html>
  <head>
  <%= htmlWebpackPlugin.options.zeusTag %>
  ...
```
