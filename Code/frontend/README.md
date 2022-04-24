# CollegeTalk Frontend

This is the mobile frontend for CollegeTalk, made using React Native.

The deployed frontend can be found here: https://expo.dev/@collegetalk/collegetalk

## Running the mobile app.

To run the app on your mobile device, you will need the Expo app installed.

To run the app in a local environment, follow the instructions in the home directory README.md.

Otherwise, the app can be run on your phone by scanning the QR code can be found here: https://expo.dev/@collegetalk/collegetalk


## Developer Notes

### Adding a New Screen

Please follow the steps below when adding a new screen to the `./src/screens` folder:

1. Create the screen `.tsx` file, and name it `{ScreenName}Screen.tsx`.

2. Add the following type to the `./types.tsx` Typescript file under the `RootTabParamList` type: `{ScreenName}: undefined;`

3. Modify the `./src/navgiation/LinkingConfiguration.ts` file to add a route to the screen:

    ```typescript
        <ScreenName>: {
            screens: {
                <ScreenName>: "<screenName>"
            }
        }
    ```

4. Add the screen component to the `./src/navigation/index.tsx` file.