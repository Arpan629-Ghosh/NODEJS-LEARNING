// build and read file paths

import path from "node:path";

const projectRoot = process.cwd();
console.log(projectRoot);

// we want to uploads users file in an application in /uploads/users/42/profile.photo.png

const userId = "42";
const originalFile = "profile.photo.png";

//path.join --> creates a path string
//it will not create the folder
//it does not check whether the file exist or not'

const uploadFilePath = path.join(
  projectRoot,
  "uploads",
  "users",
  userId,
  originalFile,
);

console.log(uploadFilePath);

// final part of a path
const fileName = path.basename(uploadFilePath);
const fileExt = path.extname(uploadFilePath);
const parentFolder = path.dirname(uploadFilePath);
console.log(fileName, fileExt, parentFolder);


