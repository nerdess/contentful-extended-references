This project was bootstrapped with [Create Contentful App](https://github.com/contentful/create-contentful-app).

## What it does

🔴🔴🔴 **PLEASE READ THIS CAREFULLY TO GET HIS CONTENTFUL APP TO WORK** 🔴🔴🔴 

This Contentful app allows to add additional information to a field that uses "References, many".

<img width="927" alt="Bildschirmfoto 2025-03-20 um 12 31 43" src="https://github.com/user-attachments/assets/5ff231a0-53ac-4070-82f6-f9f05811fd2b" />


The field ids of the additional need to be defined wherever this extension is used

<img width="864" alt="Bildschirmfoto 2025-03-20 um 12 53 35" src="https://github.com/user-attachments/assets/865b04fb-d6f5-471f-8d3c-29312addd542" />

🔴 **IMPORTANT**🔴  The app relies on a fork of the Contentful field-editors in order to work. 

This fork can be found here: https://github.com/urbanmedia/background.contentful.field-editors

The installation process is a bit tricky and **only works using yarn**.

**These are the steps:**

1. Clone this repo as well as https://github.com/urbanmedia/background.contentful.field-editors

2. Run `yarn install` on both

3. In the field-editors repo go to these folders and run `yarn link` in each folder one by one:

```
/packages/reference 
 /node_modules/react 
/node_modules/react-dom
 /node_modules/@contentful/app-sdk 
/node_modules/contentful-management
```

4. Then go to the clone of this repo and run

```
yarn link "@contentful/field-editor-reference"
yarn link "react"
yarn link "react-dom"
yarn link "@contentful/app-sdk "
yarn link "contentful-management"
```

5. Finally, you should be able to `run yarn` start!









## How to use

Execute create-contentful-app with npm, npx or yarn to bootstrap the example:

```bash
# npx
npx create-contentful-app --typescript

# npm
npm init contentful-app -- --typescript

# Yarn
yarn create contentful-app --typescript
```

## Available Scripts

In the project directory, you can run:

#### `npm start`

Creates or updates your app definition in Contentful, and runs the app in development mode.
Open your app to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

#### `npm run upload`

Uploads the build folder to contentful and creates a bundle that is automatically activated.
The command guides you through the deployment process and asks for all required arguments.
Read [here](https://www.contentful.com/developers/docs/extensibility/app-framework/create-contentful-app/#deploy-with-contentful) for more information about the deployment process.

#### `npm run upload-ci`

Similar to `npm run upload` it will upload your app to contentful and activate it. The only difference is  
that with this command all required arguments are read from the environment variables, for example when you add
the upload command to your CI pipeline.

For this command to work, the following environment variables must be set:

- `CONTENTFUL_ORG_ID` - The ID of your organization
- `CONTENTFUL_APP_DEF_ID` - The ID of the app to which to add the bundle
- `CONTENTFUL_ACCESS_TOKEN` - A personal [access token](https://www.contentful.com/developers/docs/references/content-management-api/#/reference/personal-access-tokens)

## Libraries to use

To make your app look and feel like Contentful use the following libraries:

- [Forma 36](https://f36.contentful.com/) – Contentful's design system
- [Contentful Field Editors](https://www.contentful.com/developers/docs/extensibility/field-editors/) – Contentful's field editor React components

## Using the `contentful-management` SDK

In the default create contentful app output, a contentful management client is
passed into each location. This can be used to interact with Contentful's
management API. For example

```js
// Use the client
cma.locale.getMany({}).then((locales) => console.log(locales));
```

Visit the [`contentful-management` documentation](https://www.contentful.com/developers/docs/extensibility/app-framework/sdk/#using-the-contentful-management-library)
to find out more.

## Learn More

[Read more](https://www.contentful.com/developers/docs/extensibility/app-framework/create-contentful-app/) and check out the video on how to use the CLI.

Create Contentful App uses [Create React App](https://create-react-app.dev/). You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started) and how to further customize your app.
