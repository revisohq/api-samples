# PHP

This example shows how to connect to the [Reviso SOAP API](https://www.reviso.com/developer/about-the-soap-api) using PHP.

*NOTE:* The SOAP API is not being actively developed anymore. If at all possible we urge you to take a look at our [JSON based REST API](https://www.reviso.com/developer/about-the-rest-api) instead.

## Usage

The script expects the `AGREEMENT_GRANT_TOKEN` and `APP_SECRET_TOKEN` to be set as environment variables.

Run it from the command line like this: 

```
AGREEMENT_GRANT_TOKEN=your-grant-token \
APP_SECRET_TOKEN=your-app-token \
php -f get-customers.php
```

Note: This assumes you have installed the PHP SOAP extension and has added PHP to your path.
