module.exports = {
    "extends": "standard",
    "plugins": [
        "standard",
        "promise"
    ],
    "env": {
    "browser": true,
    "es6": true,
    // "commonjs": true,
    // "jquery": true
    },
    "rules": {
        //关闭额外的分号检查
        //0:关闭，1:警告，2:异常
        "semi": 0,
        //字符串必须使用单引号
        "quotes": [
            "error",
            "single"
        ],
        "no-unused-vars": 1,
        "indent": [
            "error",
            4
        ]
    }
};