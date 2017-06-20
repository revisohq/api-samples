# Reviso API Grant Access Example

This demonstrates how to obtain tokens that can be used to interact with the public Reviso REST and SOAP APIs.

The example is a Web Application written in .Net Core. It is meant as a supplement to the detailed instructions provided on the [Reviso Developer Website](https://www.reviso.com/developer/connect).

To go straight to the interesting part you should check out the [`Controllers/HomeController.cs`](Controllers/HomeController.cs).

Feel free to use the example as a starting point for your integration, but remember that it only contains the minimum code needed to go through the grant access flow. You probably want to add more stuff like logging, error handling and persistance.

## Prerequisites

Before diving into the code you should [sign up for a free Developer Agreement](https://www.reviso.com/developer) and register your application.

## Installation

### 1. Clone the repo

```sh
git clone git@github.com:revisohq/api-samples.git
```

### 2. Navigate to the project root

```sh
cd api-samples/grant-access
```

### 3. Add your Reviso application tokens

Copy `appsettings.json.example` to `appsettings.json` and update the placeholder values with your test tokens.

### 4. Restore NuGet packages

```sh
dotnet restore
```

### 5. Run the project

```sh
dotnet run
```

### 6. Open the application in a browser
