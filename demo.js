'use strict';
/*
 * @Author: Ping Qixing
 * @Date: 2017-06-02 20:59:16
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-03 20:51:17
 * @ Ctrl + Alt + i
 */

/**
 * Ctrl + Alt + d
 *
 * @returns
 */
function getUserName (local) {
    if (local === true) {
        return 'Ping';
    }
    return 'Qixing';
}

/**
 * 首先得安装Settings Sync
 * Shift + Alt + u 上传VSCode的配置信息到Github
 * Shift + Alt + d 下载VSCode的配置
 *
 * Ctrl + K + 0 收起代码块
 * Ctrl + K + j 展开代码块
 *
 */
const a = '1';
console.log(a);
console.log(getUserName(true));
