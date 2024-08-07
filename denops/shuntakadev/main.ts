import { Denops } from "https://deno.land/x/denops_std@v3.3.0/mod.ts";
import { Server } from "https://deno.land/std@0.168.0/http/server.ts";
import { Hono } from "https://deno.land/x/hono@v2.2.2/mod.ts";
import { open } from "https://deno.land/x/opener/mod.ts";
import convertToshuntakadevHtml from "npm:@hozi-dev/markdown-to-html@0.12.3";
import { parse } from "https://deno.land/x/frontmatter/mod.ts";
import { template } from "./template.ts";

const Console = console;

const sockets = new Set<WebSocket>();

export const convertshuntakadevHtmlFromMd = (
  markdownString: string,
): { title?: string; content: string } => {
  const markdownExcludeMatter = parse(markdownString);

  const html = convertToshuntakadevHtml.default(markdownExcludeMatter.content);

  return {
    title: "preview", // TODO: パースしたタイトルを入れる
    content: html,
  };
};

export const main = async (denops: Denops): Promise<void> => {
  denops.dispatcher = {
    refreshContent: async (): Promise<void> => {
      const bufnr = await denops.call("bufnr", "%");

      const lines = (await denops.call(
        "getbufline",
        bufnr,
        1,
        "$",
      )) as string[];

      const text = lines.join("\n");
      const article = convertshuntakadevHtmlFromMd(text);

      sockets.forEach((ws) => ws.send(JSON.stringify(article)));
    },
    initServer: async (): Promise<void> => {
      await initializeWebSocketServer();
    },
  };
};

const initializeWebSocketServer = async () => {
  let port = 8064;
  const hostname = "localhost";

  const app = new Hono();

  app.get("/ws", (c) => {
    const { response, socket } = Deno.upgradeWebSocket(c.req);

    socket.onopen = () => {};
    socket.onclose = () => {};
    socket.onmessage = (_message) => {};

    sockets.add(socket);

    return response;
  });

  for (let retry = 0; retry < 3; retry++) {
    try {
      app.get("/", (c) => {
        return c.html(template({ port: port }));
      });

      const server = new Server({
        port: port,
        hostname: hostname,
        handler: app.fetch,
      });

      Console.log(`preview port: ${port}`);
      await open(`http://${hostname}:${port}`);

      return await server.listenAndServe();
    } catch (e) {
      if (e.code === "EADDRINUSE") {
        Console.log(`already in use ${port} port. retry ${retry}`);
        port += 1;
        continue;
      } else {
        throw e;
      }
    }
  }
};
