module.exports = (api) => {
    api.cache(true);
    return {
        presets: ["babel-preset-expo", "@babel/preset-env"],
        plugins: [
            "react-native-reanimated/plugin",
            ["@babel/plugin-proposal-private-methods", { loose: true }]
        ]
    };
};
