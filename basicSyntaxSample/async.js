/*
 * @Author: Ping Qixing
 * @Date: 2017-06-19 20:17:45
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-19 20:40:51
 * @Description
 */

function timeout (ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}

async function asyncPrint (value, ms) {
    await timeout(ms);
    console.log(value);
}

// asyncPrint('hello', 2000);

async function f () {
    // return 'hello ping!';
    throw new Error('出错啦！')
}

// f().then(
//     v => console.log(v),
//     e => console.log(e));

f().then(v => console.log(v))
   .catch(e => console.log(e));

// 继发执行
// async function logInOrder (urls) {
//     for (const url of urls) {
//         const response = await fetch(url);
//         console.log(await response.text());
//     }
// }

// 并发执行
// async function logInOrder (urls) {
//   // 并发读取远程URL
//     const textPromises = urls.map(async url => {
//         const response = await fetch(url);
//         return response.text();
//     });

//   // 按次序输出
//     for (const textPromise of textPromises) {
//         console.log(await textPromise);
//     }
// }
