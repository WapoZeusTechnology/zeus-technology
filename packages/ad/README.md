# `@zeus-technology/ad`

The purpose of the `ZeusAd` component is to embed a Zeus-managed advertisement into a React app.

## Usage

```js
const ZeusAd = require('@zeus-technology/ad');

const ArticleTemplate = (props) => (
  <Page {...props}>
    <ZeusAd slotId='ad-slot-name' style={{display:visible?'':'none'}} />
  </Page>
)
```
