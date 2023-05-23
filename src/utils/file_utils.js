import fs from "fs";

const JAVA_PATH =
  "/home/camilo/Documents/git/doom-judge-react/backend/src/utils/java_container/java_code/src";

// HACK: i need to refactor this function and logic to be more accessible.
export const writeFile = (file, content) => {
  const file_path = `${JAVA_PATH}/${file}`;
  fs.writeFileSync(file_path, content, (err) => {
    if (err) throw err;
    console.log("content successfully written");
  });
  return file_path;
};
