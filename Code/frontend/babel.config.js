module.exports = ({ cache }) => {
    cache(true);

    return {
        presets: ["babel-preset-expo"],
        plugins: [
            "react-native-reanimated/plugin",
            ["@babel/plugin-proposal-private-methods", { loose: true }],
            ["@babel/plugin-proposal-class-properties", { loose: true }],
            [
                "@babel/plugin-proposal-private-property-in-object",
                { loose: true }
            ]
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
