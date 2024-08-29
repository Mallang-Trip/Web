module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "@typescript-eslint", "import"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-unused-vars": "error",
  },
  overrides: [
    {
      files: ["*.js", "*.jsx"], // JS 및 JSX 파일에만 적용할 설정
      rules: {
        "@typescript-eslint/no-var-requires": "off", // JS에서는 require 허용
        "@typescript-eslint/explicit-module-boundary-types": "off", // JS에서는 함수 반환 타입 명시 비활성화
      },
    },
    {
      files: ["*.ts", "*.tsx"], // TS 및 TSX 파일에만 적용할 설정
      rules: {
        "@typescript-eslint/explicit-function-return-type": "warn", // TS에서 함수 반환 타입 권장
      },
    },
  ],
};
