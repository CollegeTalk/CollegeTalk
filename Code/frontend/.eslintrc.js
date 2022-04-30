module.exports = {
    env: {
        "react-native/react-native": true // whitelist all browser-like globals
    },
    extends: [
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "airbnb",
        "prettier",
        "plugin:jest/recommended",
        "plugin:import/typescript"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["react-native", "@typescript-eslint", "jest"],
    rules: {
        "react/jsx-filename-extension": [
            2,
            { extensions: [".js", ".jsx", ".ts", ".tsx"] }
        ],
        "react/jsx-uses-react": "off",
        "react/jsx-props-no-spreading": "off",
        "react/react-in-jsx-scope": "off",
        "react/no-unstable-nested-components": "off",
        "react/require-default-props": "off",
        "react/function-component-definition": [
            "error",
            {
                namedComponents: "arrow-function",
                unnamedComponents: "arrow-function"
            }
        ],
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                js: "never",
                jsx: "never",
                ts: "never",
                tsx: "never"
            }
        ],
        "@typescript-eslint/no-unused-vars": "warn",
        "no-unused-vars": "off",
        "no-undef": "off",
        "no-console": [
            process.env.RN_ENV === "production" ||
            process.env.RN_ENV === "staging"
                ? "error"
                : "warn",
            { allow: ["warn", "error", "info"] }
        ]
    },
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"]
            }
        }
    }
};
