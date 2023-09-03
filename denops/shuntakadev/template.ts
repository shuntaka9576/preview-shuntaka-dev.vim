import { html } from "https://deno.land/x/hono/middleware.ts";

export const template = (params: { port: number }) =>
  html`<html>
    <head>
      <title>Preview |</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        href="https://unpkg.com/@hozi-dev/content-css@0.6.0/build/index.css"
        rel="stylesheet"
      />
    </head>
    <style>
      html {
        height: 100%;
      }
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      :root {
        --bg-color: #f7fafc;
        --header-color: #fffefc;
        --text-color: #525457;
        --article-record-underline: rgba(162, 177, 202, 0.3);
        --article-area-color: #fff;
        --toc-list-color: rgba(162, 177, 202, 0.3);
        --toc-list-text-color: #57595b87;
        --toc-list-color-active: #525457;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      * {
        box-sizing: border-box;
        max-width: 100%;
      }

      .base {
        padding: 8px 0px 0px 0px;
        width: 100%;
        word-break: break-all;
      }

      .editor {
        display: flex;
        justify-content: space-between;
        max-width: 800px;
        padding: 0px 24px 0px 24px;
        margin: 0 auto;
      }

      .content {
        max-width: 800px;
      }

      .title {
        text-align: center;
      }

      .hozi-dev-article-content-light {
        max-width: 800px;
      }
    </style>
    <script src="https://code.jquery.com/jquery-1.11.1.js"></script>
    <script>
      const receiveMessage = ({ data }) => {
        const article = JSON.parse(data);
        document.title = "Preview | " + article.title;
        $(".hozi-dev-article-content-light").html(article.content);
        $(".title").text(article.title);
      };

      window.onload = () => {
        socket = new WebSocket("ws://localhost:" + ${params.port} + "/ws");
        socket.addEventListener("message", receiveMessage);
      };
    </script>
    <body>
      <div class="base">
        <div class="title"></div>
        <hr />
        <br />
        <div class="editor">
          <div class="content">
            <div class="hozi-dev-article-content-light"></div>
          </div>
        </div>
      </div>
    </body>
  </html>`;
