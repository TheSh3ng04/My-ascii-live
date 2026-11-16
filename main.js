import data from "./ascii_frames.json" with { type: "json" };

const { fps = 10, frames } = data;
const interval = 1000 / fps;

Deno.serve((req) => {
  const userAgent = req.headers.get("user-agent") || "";

  // 网页浏览器打开时给出提示，终端 curl 打开时播放动画
  if (!userAgent.includes("curl")) {
    return new Response(
      `Run this command in your terminal:\n\ncurl.exe -sN ${req.url}\n`,
      { headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }

  let timer;
  const stream = new ReadableStream({
    start(controller) {
      let i = 0;
      const encoder = new TextEncoder();
      timer = setInterval(() => {
        const frame = frames[i % frames.length];
        // \x1b[2J\x1b[H：ANSI 清屏与光标回位码
        controller.enqueue(encoder.encode(`\x1b[2J\x1b[H${frame}\n`));
        i++;
      }, interval);
    },
    cancel() {
      clearInterval(timer);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
});