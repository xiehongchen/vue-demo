

```js
// 1、控制并发
const concurrentPromises = (promises, limit) => {
    return new Promise((resolve, reject) => {
        let i = 0;
        let result = [];
        const executor = () => {
            if (i >= promises.length) {
                return resolve(result);
            }
            const promise = promises[i++];
            Promise.resolve(promise)
                .then(value => {
                    result.push(value);
                    if (i < promises.length) {
                        executor();
                    } else {
                        resolve(result);
                    }
                })
                .catch(reject);
        };
        for (let j = 0; j < limit && j < promises.length; j++) {
            executor();
        }
    });
};

// 2、控制并发的函数
const concurrentPromises = async (promises, limit) => {
  const results = []; // 存储异步任务的结果
  const executing = []; // 存储当前执行的异步任务

  // 递归执行异步任务
  const execute = async (promise) => {
      executing.push(promise); // 添加到执行中的列表
      const result = await promise; // 等待异步任务完成
      results.push(result); // 存储结果
      executing.splice(executing.indexOf(promise), 1); // 从执行中的列表中移除已完成的任务
  };

  // 同时执行指定数量的异步任务
  for (let i = 0; i < limit && i < promises.length; i++) {
      execute(promises[i]);
  }

  // 继续执行剩余的异步任务
  for (let i = limit; i < promises.length; i++) {
      await Promise.race(executing); // 等待已经在执行中的任务完成
      execute(promises[i]); // 开始执行新的任务
  }

  // 等待所有任务完成
  await Promise.all(executing);

  return results; // 返回所有任务的结果
};

// 模拟一组异步任务，每个任务返回一个 Promise，延迟时间随机
const createAsyncTask = (id, delay) => {
  return new Promise(resolve => {
      const startTime = new Date(); // 记录任务开始时间
      setTimeout(() => {
          const endTime = new Date(); // 记录任务完成时间
          console.log(`Task ${id} completed start in ${startTime} milliseconds and stop in ${endTime}`);
          resolve(`Result from Task ${id}`);
      }, delay);
  });
};
// 创建一组异步任务
const promises = [
  createAsyncTask(1, 2000),
  createAsyncTask(2, 3000),
  createAsyncTask(3, 6000),
  createAsyncTask(4, 3000),
  createAsyncTask(5, 5000)
];

// 并发执行 Promise，限制同时执行的数量为 2
concurrentPromises(promises, 2)
.then(results => {
  const startTime = new Date();
  console.log('All tasks completed', startTime);
  console.log('Results:', results);
})
.catch(error => {
  console.error('Error:', error);
});

// 异步函数 a，b，c
function a() {
  return new Promise(resolve => {
      setTimeout(() => {
          console.log('Task a is done');
          resolve();
      }, 1000);
  });
}

function b() {
  return new Promise(resolve => {
      setTimeout(() => {
          console.log('Task b is done');
          resolve();
      }, 5000);
  });
}

function c() {
  return new Promise(resolve => {
      setTimeout(() => {
          console.log('Task c is done');
          resolve();
      }, 1000);
  });
}

// 实现 pLimit 函数
function pLimit(limit) {
  let running = 0;
  const queue = [];

  function executeNext() {
      if (running < limit && queue.length > 0) {
          const task = queue.shift();
          running++;
          task().finally(() => {
              running--;
              executeNext();
          });
      }
  }

  return function (fn, ...args) {
      return new Promise((resolve, reject) => {
          const task = () => fn(...args).then(resolve, reject);
          queue.push(task);
          executeNext();
      });
  };
}

// 使用 pLimit 函数
let countLimit = pLimit(2);
countLimit(a); // 立即执行
countLimit(b); // 立即执行
countLimit(c); // 前两个函数执行完再执行
countLimit(c); 
countLimit(c); 
```