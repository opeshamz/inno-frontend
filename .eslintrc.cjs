module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:prettier/recommended",
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json", "./tsconfig.node.json"],
        tsconfigRootDir: __dirname,
    },

    plugins: ["@typescript-eslint", "react", "react-refresh", "prettier"],
    rules: {
        "react-refresh/only-export-components": "warn",
        "react/react-in-jsx-scope": 0,
        "prettier/prettier": 0,
        "@typescript-eslint/no-non-null-assertion": 0,
        "@typescript-eslint/no-non-null-asserted-optional-chain": 0,
    },
};
