module.exports = ({ cache }) => {
    cache(true);

    return {
        presets: ["babel-preset-expo"],
        plugins: [
            "@babel/plugin-transform-flow-strip-types",
            "react-native-reanimated/plugin"
        ],
        env: {
            development: {
                plugins: [
                    [
                        "inline-dotenv",
                        {
                            path: ".env.development"
                        }
                    ]
                ]
            },
            staging: {
                plugins: [
                    [
                        "inline-dotenv",
                        {
                            path: ".env.staging"
                        }
                    ]
                ]
            },
            production: {
                plugins: [
                    [
                        "inline-dotenv",
                        {
                            path: ".env.production"
                        }
                    ]
                ]
            }
        }
    };
};
