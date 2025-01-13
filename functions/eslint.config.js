import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        project: 'tsconfig.json'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'import': importPlugin
    },
    rules: {
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/prefer-for-of': 'warn',
      '@typescript-eslint/triple-slash-reference': 'error',
      '@typescript-eslint/unified-signatures': 'warn',
      'comma-dangle': ['error', 'always-multiline'],
      'constructor-super': 'error',
      'eqeqeq': ['warn', 'always'],
      'import/no-deprecated': 'warn',
      'import/no-extraneous-dependencies': 'error',
      'import/no-unassigned-import': 'warn',
      'no-cond-assign': 'error',
      'no-duplicate-case': 'error',
      'no-duplicate-imports': 'error',
      'no-empty': [
        'error',
        {
          allowEmptyCatch: true
        }
      ],
      'no-invalid-this': 'error',
      'no-new-wrappers': 'error',
      'no-param-reassign': 'error',
      'no-redeclare': 'error',
      'no-sequences': 'error',
      'no-shadow': [
        'error',
        {
          hoist: 'all'
        }
      ],
      'no-throw-literal': 'error',
      'no-unsafe-finally': 'error',
      'no-unused-labels': 'error',
      'no-var': 'warn',
      'no-void': 'error',
      'prefer-const': 'warn'
    },
    settings: {
      jsdoc: {
        tagNamePreference: {
          returns: 'return'
        }
      }
    }
  }
];
