module.exports = {
  root: true,
  extends: '@react-native',
  parserOptions: {
    requireConfigFile: false,
  },
  rules: {
    'react-hooks/exhaustive-deps': 'warn', // exhaustive-deps 룰을 warning으로 설정
  },
};
