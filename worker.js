// 直接把你的 99 帧 json 数据内嵌在这里
import data from "./coloured_frames.js";

export default {
  async fetch(request) {
    const userAgent = request.headers.get("user-agent") || "";

    // 浏览器打开时显示提示，curl 打开时播放动画
    if (!userAgent.includes("curl")) {
      return new Response(
        `Run this command in your terminal:\n\ncurl.exe -sN ${request.url}\n`,
        { headers: { "Content-Type": "text/plain; charset=utf-8" } }
      );
    }

    const { fps = 10, frames } = data;
    const interval = 1000 / fps;

    let timer;
    const stream = new ReadableStream({
      start(controller) {
        let i = 0;
        const encoder = new TextEncoder();
        timer = setInterval(() => {
          const frame = frames[i % frames.length];
          // \x1b[2J\x1b[H：清屏与光标回位
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
  },
};