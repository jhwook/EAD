module.exports = {
  parser: "@typescript-eslint/parser",
  // parserOptions: {
  //   project: 'tsconfig.json',
  //   sourceType: 'module',
  // },
  plugins: ["@typescript-eslint/eslint-plugin", "prettier"],
  extends: [
    "airbnb-base",
    "plugin:jsx-a11y/recommended",
    "plugin:import/errors", // 설치한 경우
    "plugin:import/warnings", // 설치한 경우
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  // ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    "@typescript-eslint/no-explicit-any": "off",
    "default-param-last": 0,
    "linebreak-style": 0,
    "import/prefer-default-export": 0,
    "import/extensions": 0,
    "no-use-before-define": 0,
    "import/no-unresolved": 0,
    // 'react/react-in-jsx-scope': 0,
    "import/no-extraneous-dependencies": 0, // 테스트 또는 개발환경을 구성하는 파일에서는 devDependency 사용을 허용
    "no-shadow": 0,
    // "react/prop-types": 0,
    // "react/jsx-filename-extension": [
    //   2,
    //   { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    // ],
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
