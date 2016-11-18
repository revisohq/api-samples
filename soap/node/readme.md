# node.js

These samples demonstrate how to interact with the [Reviso SOAP API](https://soap.reviso.com/api1/) from Node.js.

_NOTE:_ The SOAP API is not being actively developed anymore. If at all possible we urge you to take a look at our [JSON based REST API](https://www.reviso.com/developer/about-the-rest-api) instead.

## Usage

To run the examples you first need to install the dependencies:

```
npm install
```

The scripts expect the `AgreementGrantToken` and `AppSecretToken` to be set as environment variables like this:

```
AGREEMENT_GRANT_TOKEN=your-grant-token APP_SECRET_TOKEN=your-app-token node get-all-products.js
```

## Further reading

Check out our [introduction to the SOAP API](https://www.reviso.com/developer/about-the-soap-api) for a quick overview.
