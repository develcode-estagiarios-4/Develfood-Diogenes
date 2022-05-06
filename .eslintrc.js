module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
};




// module.exports = {
//   root: true,
//   parser: "@typescript-eslint/parser",
//   plugins: ["@typescript-eslint"],
//   rules: {
//     "@typescript-eslint/rule-name": "error",
//     "@typescript-eslint/adjacent-overload-signatures": "error",
//     "@typescript-eslint/no-empty-interface": [
//       "error",
//       {
//         "allowSingleExtends": false
//       }
//     ],
//   },
//   extends: [
//     "eslint:recommended",
//     "plugin:@typescript-eslint/recommended",
//     "plugin:@typescript-eslint/recommended-requiring-type-checking"
//   ],
//   overrides: [
//     {
//       files: ['*.ts', '*.tsx', '*.tsx text eol=lf'],
//       rules: {
//         '@typescript-eslint/no-shadow': ['error'],
//         'no-shadow': 'off',
//         'no-undef': 'off',
//       },
//     },
//   ],
// };