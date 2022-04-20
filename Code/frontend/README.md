# CollegeTalk Frontend

The deployed frontend can be found here: https://expo.dev/@collegetalk/collegetalk

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
