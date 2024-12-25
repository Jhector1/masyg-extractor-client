import { fileURLToPath } from 'url';
import path from 'path';

// __filename and __dirname setup for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  root: true,
  plugins: ['prettier', 'react', '@typescript-eslint', 'import', 'react-hooks'],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'airbnb-base',
    'airbnb-typescript',
    'plugin:prettier/recommended', // Ensures Prettier overrides Airbnb rules
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: 'detect', // Automatically detects the React version
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json', // Resolves TypeScript aliases
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // Ensure these file types resolve
      },
    },
  },
  ignorePatterns: ['node_modules/', 'dist/'], // Ignore build and dependency files
  rules: {
    'prettier/prettier': 'error', // Enforce Prettier formatting
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['vite.config.ts', '**/*.test.tsx', '**/*.spec.tsx'] },
    ],
    'react/react-in-jsx-scope': 'off', // React 17+ no longer requires React in scope
    'react/jsx-uses-react': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-underscore-dangle': 'off', // Covered by @typescript-eslint/naming-convention
    'no-param-reassign': 'off', // Allow parameter reassignment
    'no-restricted-syntax': 'off', // Allow use of all syntax
    'no-plusplus': 'off', // Allow unary operators
    'class-methods-use-this': 'off', // Allow class methods without `this`
    'react/prop-types': 'off', // PropTypes are unnecessary with TypeScript
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase'],
      },
      {
        selector: 'variable',
        types: ['boolean', 'string', 'number', 'array', 'function'],
        format: ['camelCase', 'UPPER_CASE'],
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },
    ],
    // Additional flexibility rules
    'import/extensions': 'off', // Avoid errors with file extensions in imports
    'react/function-component-definition': 'off', // Allow flexible function declarations
  },
};
