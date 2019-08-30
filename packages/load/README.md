# `@zeus-platform/load`

The purpose of the `ZeusLoader` component is to create and initialize the Zeus manager. This component interfaces with the hosted Zeus libraries to control bidding, key-value-pair management, as well as the delivery and display of creatives.

This component should be used in conjunction with the `ZeusAd` component, which will embed the advertisement element in to a given React application.

## Usage

In simple cases, this module can be used only with a simple `url` prop.

```jsx
import { ZeusLoader } from "@zeus-platform/load";

const PageTemplate = (props) => (
  <Page {...props}>
    <ZeusLoader url="https://test.zeustechnology.com" />
  </Page>
)
```

If you have a simple case, but wish to provide a list of key-value pairs, simply provide them using the `keyValuePairs` prop.

 ```jsx
import { ZeusLoader } from "@zeus-platform/load";

const PageTemplate = (props) => (
  <Page {...props}>
    <ZeusLoader keyValuePairs={[{key:"value}]} url="https://test.zeustechnology.com" />
  </Page>
)
```
