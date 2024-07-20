module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  extends: [
    'eslint:recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:jsx-a11y/recommended',
    'next/core-web-vitals',
    'prettier',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'jsx-a11y', 'import', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off', // Next.js doesn't require React to be in scope
    'react/prop-types': 'off',
    'no-console': 'error',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'warn',
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        some: ['nesting', 'id'],
      },
    ],
    'no-console': 'error',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react/button-has-type': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
    },
  },
  // 린트 에러 피하려 추가 
  // 수정 이후에 삭제 예정
  overrides: [
    {
      files: ['src/components/FloatingCard/MobileSize/index.tsx'],
      rules: {
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
      },
    },
  ],
};
