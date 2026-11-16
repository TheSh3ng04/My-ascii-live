import json
import time
import os
from http.server import HTTPServer, BaseHTTPRequestHandler

# 兼容读取 frames.js 或 ascii_frames.json
if os.path.exists("coloured_frames.js"):
    with open("coloured_frames.js", "r", encoding="utf-8") as f:
        raw = f.read().strip()
        if raw.startswith("export default"):
            raw = raw[len("export default"):].strip()
        if raw.endswith(";"):
            raw = raw[:-1].strip()
        data = json.loads(raw)
else:
    with open("ascii_frames.json", "r", encoding="utf-8") as f:
        data = json.load(f)

frames = data.get("frames", [])
delay = 1.0 / data.get("fps", 10)

class StreamHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.send_header("Cache-Control", "no-cache")
        self.end_headers()

        i = 0
        try:
            while True:
                frame = frames[i % len(frames)]
                # 发送清屏符 + 画面帧
                payload = f"\033[2J\033[H{frame}\n".encode("utf-8")
                self.wfile.write(payload)
                self.wfile.flush()
                i += 1
                time.sleep(delay)
        except (BrokenPipeError, ConnectionResetError):
            pass

    def log_message(self, format, *args):
        return

print("本地彩色测试服务已启动：http://localhost:8080")
print("保持本窗口开着，在另一个窗口运行 curl.exe 测试！")
HTTPServer(("127.0.0.1", 8080), StreamHandler).serve_forever()