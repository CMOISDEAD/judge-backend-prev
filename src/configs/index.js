import Docker from "dockerode";

export const docker = new Docker({
  protocol: "http",
  port: "3000",
});
