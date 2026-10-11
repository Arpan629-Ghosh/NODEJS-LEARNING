import path from "node:path";
import fs from "node:fs";
import fsPromises from "node:fs/promises";

const DEMO_FOLDER_PATH = path.join(process.cwd(), "file-system", "fs-demo");
const SYNC_FILE_PATH = path.join(DEMO_FOLDER_PATH, "sync.txt");
const CALLBACK_FILE_PATH = path.join(DEMO_FOLDER_PATH, "callback.txt");

const PROMISE_FILE_PATH = path.join(DEMO_FOLDER_PATH, "promise.txt");

type FileResult = {
  style: string;
  fileName: string;
  content: string;
  sizeInBytes: number;
};
// fs - file system module allows us to work with the file system on our computer. It provides methods for reading, writing, and manipulating files and directories.

// sync apis: fs.readFileSync(), fs.writeFileSync(), fs.appendFileSync(), fs.unlinkSync(), fs.mkdirSync(), fs.rmdirSync(), fs.readdirSync()

// callback apis: fs.readFile(), fs.writeFile(), fs.appendFile(), fs.unlink(), fs.mkdir(), fs.rmdir(), fs.readdir()

// promise apis: fs.promises.readFile(), fs.promises.writeFile(), fs.promises.appendFile(), fs.promises.unlink(), fs.promises.mkdir(), fs.promises.rmdir(), fs.promises.readdir()

// when use sync apis: when we want to read or write a file synchronously, we can use the sync apis. These methods block the execution of the code until the operation is completed. This is useful when we want to read or write a file before proceeding with the rest of the code.

// when not to use sync apis: when we want to read or write a file asynchronously, we can use the callback or promise apis. These methods do not block the execution of the code and allow us to perform other operations while the file is being read or written. This is useful when we want to read or write a file in the background while the rest of the code is executing.

function ensureDemoFolderExist(): void {
  if (!fs.existsSync(DEMO_FOLDER_PATH)) {
    fs.mkdirSync(DEMO_FOLDER_PATH, { recursive: true });
  }
}

function runSyncExample(): FileResult {
  //fs.writeFileSync() - writes data to a file synchronously. If the file does not exist, it will be created. If the file exists, it will be overwritten.

  fs.writeFileSync(SYNC_FILE_PATH, "Hello World!", "utf-8");

  //fs.appendFileSync() - appends data to a file synchronously. If the file does not exist, it will be created. If the file exists, the data will be appended to the end of the file.

  fs.appendFileSync(SYNC_FILE_PATH, "\nHello World Again!", "utf-8");

  //fs.readFileSync() - reads data from a file synchronously. If the file does not exist, an error will be thrown.

  const content = fs.readFileSync(SYNC_FILE_PATH, "utf-8");

  //fs.statSync() - returns the stats of a file synchronously. If the file does not exist, an error will be thrown.
  const stats = fs.statSync(SYNC_FILE_PATH);

  return {
    style: "sync",
    fileName: path.basename(SYNC_FILE_PATH),
    content,
    sizeInBytes: stats.size,
  };
}

// callback(eror, result) - a function that is passed as an argument to another function and is executed after some operation is completed. The first argument is an error object, if any, and the second argument is the result of the operation.
// use case: when we want to read or write a file asynchronously, we can use the callback apis. These methods do not block the execution of the code and allow us to perform other operations while the file is being read or written. This is useful when we want to read or write a file in the background while the rest of the code is executing.

function runCallbackExample(): Promise<FileResult> {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      CALLBACK_FILE_PATH,
      "created using callback!",
      "utf-8",
      (error) => {
        if (error) {
          reject(error);
          return;
        }

        fs.appendFile(
          CALLBACK_FILE_PATH,
          "\nappended using callback!",
          "utf-8",
          (error) => {
            if (error) {
              reject(error);
              return;
            }

            fs.readFile(CALLBACK_FILE_PATH, "utf-8", (error, content) => {
              if (error) {
                reject(error);
                return;
              }

              fs.stat(CALLBACK_FILE_PATH, (error, stats) => {
                if (error) {
                  reject(error);
                  return;
                }

                resolve({
                  style: "callback",
                  fileName: path.basename(CALLBACK_FILE_PATH),
                  content,
                  sizeInBytes: stats.size,
                });
              });
            });
          },
        );
      },
    );
  });

  //callback hell - a situation where we have multiple nested callbacks, making the code difficult to read and maintain. This can be avoided by using promises or async/await.
}

// promise - an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. A promise is in one of three states: pending, fulfilled, or rejected. A promise can be created using the Promise constructor or by using the async/await syntax.
// use case: when we want to read or write a file asynchronously, we can use the promise apis. These methods do not block the execution of the code and allow us to perform other operations while the file is being read or written. This is useful when we want to read or write a file in the background while the rest of the code is executing.

    async function runPromiseExample(): Promise<FileResult> {
        await fsPromises.writeFile(PROMISE_FILE_PATH, "created using promise!", "utf-8");
        await fsPromises.appendFile(PROMISE_FILE_PATH, "\nappended using promise!", "utf-8");
        const content = await fsPromises.readFile(PROMISE_FILE_PATH, "utf-8");
        const stats = await fsPromises.stat(PROMISE_FILE_PATH);
        return {
            style: "promise",
            fileName: path.basename(PROMISE_FILE_PATH),
            content,
            sizeInBytes: stats.size,
        };
    }

async function main(): Promise<void> {
  try {
    ensureDemoFolderExist();
    const result = runSyncExample();
    const callbackResult = await runCallbackExample();
    const promiseResult = await runPromiseExample();
    console.log(result);
    console.log(callbackResult);
    console.log(promiseResult);
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.log(message);
  }
}

main();
