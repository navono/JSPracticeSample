module.exports = {
    "extends": [
        "eslint:recommended",
        // "plugin:node/recommended"
    ],
    parser: 'babel-eslint',
    "plugins": [
        "standard",
        "promise",
        "html",
        "react",
        "babel",
        "node"
    ],
    "env": {
        "browser": true,
        "es6": true,
        // "node": true
        // "commonjs": true,
        // "jquery": true
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    // "ecmaFeatures": {
    //     "modules": true
    // },
    "rules": {
        "node/exports-style": ["error", "module.exports"],
        //关闭额外的分号检查
        //0:关闭，1:警告，2:异常
        "semi": 0,
        //字符串必须使用单引号
        "quotes": [
            "error",
            "single"
        ],
        "no-console": "off",
        "no-unused-vars": 1,
        "indent": [
            "error",
            2
        ]
    }
};