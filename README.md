# united-church-admin

A sample admin interface for the united-church-platform built with [react-admin](https://marmelab.com/react-admin) and [ra-feathersjs-oauth](https://github.com/sopherapps/ra-feathers-oauth)

## Demo

Find the live demo [here](https://sopherapps.github.io/united-church-admin).

This uses a demo featherjs back end hosted by [heroku](https://united-church-api.herokuapp.com/docs).

The code for the back end can be found in [this github repo](https://github.com/sopherapps/united-church-api).

## Developing

You will need have [nodejs](https://nodejs.org) v+10 installed.

The app was bootstrapped using 'create-react-app' and naturally, [yarn](https://yarnpkg.com/lang/en/docs/install) was the preferred package manager but npm also works fine.

1. Clone the repo

    ```bash
    git clone https://github.com/sopherapps/united-church-admin
    ```

2. Install dependencies

    ```bash
    cd united-church-admin && yarn install
    ```

3. Set up back end, start its server and note its running url. The instructions for setting up the back-end can be found on [this github repo](https://github.com/sopherapps/united-church-api).

4. Change the apiUrl in [App.tsx](./src/App.tsx) to the url of your back end

    ```typescript
    import UploadIcon from "@material-ui/icons/CloudUpload";

    // change this url here to your own.
    const apiUrl = "https://united-church-api.herokuapp.com";

    // make the config progressively adaptible
    const feathersClient = createFeathersClient(apiUrl, {
    storageKey: "united-church-demo"
    });

    ```

5. Set up your Google app so that Google Sign In is set up. Here are the [instructions](https://developers.google.com/identity/sign-in/web/sign-in#before_you_begin).
6. Change the googleClientId in the [GoogleLogin](./src/components/screens/GoogleLosing.tsx) to your new Google Client ID

    ```typescript
    import Grid from "@material-ui/core/Grid";

    // change this value to your own Google Client ID
    const googleClientId =
      "hjfhahfafjhsjkhafjsyfarhfuiarhiua6724953.apps.googleusercontent.com";

    const GoogleLogin = ({ userLogin }: { [key: string]: any }) => {
    ```

7. Start the front end app and a browser tab should automatically open at the url [http://localhost:3000](http://localhost:3000)

    ```bash
    yar start
    ```

## Related Projects

1. [UnitedCHURCH app](https://github.com/sopherapps/united-church)
2. [UnitedCHURCH back end](https://github.com/sopherapps/united-church-api)

## License

Copyright (c) 2019 [Martin Ahindura](https://github.com/Tinitto) Licensed under the [MIT License](./LICENSE)
