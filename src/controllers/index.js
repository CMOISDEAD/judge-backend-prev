import fs from "fs";
import tar from "tar";
import status from "http-status";
import { docker } from "../configs";
import { writeFile } from "../utils/file_utils";

const pwd_path =
  "/home/camilo/Documents/git/doom-judge-react/backend/src/utils/java_container/";

export const handleTest = async (req, res) => {
  const { code } = req.body;
  console.log(code);
  writeFile("Main.java", code);
  await tar.c(
    {
      gzip: false,
      file: `${pwd_path}archive.tar`,
      cwd: `${pwd_path}java_code/src/`,
    },
    [`Main.java`]
  );
  const tarArchive = fs.readFileSync(`${pwd_path}archive.tar`);
  try {
    const container = await docker.createContainer({
      Image: "test-java:Dockerfile",
    });
    await container.putArchive(tarArchive, {
      path: "/app",
    });
    await container.start(); // container start
    await container.wait(); // wait until the container finish
    const logs = await container.logs({
      stderr: true,
      stdout: true,
    });
    const output = logs.toString("utf-8");
    console.log(output);
    res
      .status(status.OK)
      .send({ message: "container successfully created", output });
  } catch (err) {
    console.error(err);
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ error: "internal server error" });
  }
};
