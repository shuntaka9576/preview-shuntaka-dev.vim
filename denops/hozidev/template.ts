import { html } from "https://deno.land/x/hono/middleware.ts";

export const template = (params: { port: number }) =>
  html`<html>
  <head>
    <title>Preview |</title>
  </head>
  <style>
    html,
    body {
      padding: 0;
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    * {
      box-sizing: border-box;
    }

    #base {
      padding: 8px 0px 0px 0px;
      width: 100%;
      word-break: break-all;
    }

    #editor {
      max-width: 800px;
      padding: 0px 24px 0px 24px;
      margin: 0 auto;
    }

    #content {
    }

    #title {
      text-align: center;
    }
  </style>
  <link
    href="https://unpkg.com/@hozi-dev/content-css@0.6.0/build/index.css"
    rel="stylesheet"
  />
  <script src="https://code.jquery.com/jquery-1.11.1.js"></script>
  <script>
    const receiveMessage = ({ data }) => {
      const article = JSON.parse(data);
      document.title = "Preview | " + article.title;
      $("#html").html(article.content);
      $("#title").text(article.title);
    };

    window.onload = () => {
      socket = new WebSocket("ws://localhost:" + ${params.port} + "/ws");
      socket.addEventListener("message", receiveMessage);
    };
  </script>
  <body>
    <div id="base">
      <div id="title"></div>
      <hr />
      <br />
      <div id="editor">
        <div id="content">
          <div id="hozi-dev-article-content-light">
            <div id="html"></div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>`;
