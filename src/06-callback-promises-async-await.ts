type User = {
  id: number;
  name: string;
  role: "user" | "super-admin";
};

const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    role: "user",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "super-admin",
  },
  {
    id: 3,
    name: "roman",
    role: "user",
  },
];

// callback is a function that is passed as an argument to another function and is executed after some operation is completed.

function findUserWithCallback(
  userId: number,
  callback: (error: Error | null, user?: User) => void,
): void {
  setTimeout(() => {
    const user = users.find((user) => user.id === userId);

    if (!user) {
      callback(new Error(`user with id ${userId} was not found`));
      return;
    }

    callback(null, user);
  }, 500);
}

// findUserWithCallback(30, (error, user) => {
//     if(error){
//         console.log('callback error', error.message);
//         return;
//     }

//     console.log("callback result", user?.id, user?.name, user?.role)
// })

function fetchUserWithPromise(userId: number): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((user) => user.id === userId);

      if (!user) {
        reject(new Error(`user with ${userId} was not found`));
        return;
      }

      resolve(user);
    });
  });
}

// fetchUserWithPromise(10).then((user) => {
//     console.log("promise result", user);
// }).catch((error: Error) => console.log(error.message))

async function findUserWithAsyncAwait(userId: number): Promise<void> {
  try {
    const user = await fetchUserWithPromise(userId);
    console.log(user);
  } catch (error) {
    const message = error instanceof Error ? error.message : "unkown error";
    console.log(message);
  }
}

findUserWithAsyncAwait(10);
