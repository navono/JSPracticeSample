/*
 * @Author: Ping Qixing
 * @Date: 2017-06-15 13:35:51
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-15 14:15:54
 * @Description
 */

// 验证两个运算数和运算结果
function trusty (left, right, result) {
    if (
        Number.isSafeInteger(left) &&
        Number.isSafeInteger(right) &&
        Number.isSafeInteger(result)
    ) {
        return result;
    }

    throw new RangeError('Operation cannot be trusted');
}

// Test code
trusty(9007199254740993, 990, 9007199254740993 - 990)
