# 耘稻农业化工官网 · 第 6 版

纯 HTML、CSS、JavaScript 静态站点，无需安装依赖、构建或数据库。

## 本版更新

- 奶油白、深绿和金色的新版布局，保留原版 Logo 和用户提供的首页田野图。
- 四类场景入口、完整中英文目录、全类别搜索、分类筛选和分页。
- 76 项产品沿用原始产品数据，不新增未经确认的产品规格或功效。
- 跨类别询盘清单，可添加、移除、清空并在当前浏览器保存产品选择。
- WhatsApp、邮件草稿、复制及下载询盘，自动包含所选产品和选填的采购要求。
- 手机底部联系栏和全屏询盘面板；支持键盘操作及减少动态效果的系统偏好。

## 本地预览

在本目录运行：

    python3 -m http.server 8080 --bind 127.0.0.1

打开 http://127.0.0.1:8080 。请使用网页服务器预览，产品目录需要通过 HTTP 加载。

## 阿里云 ESA Pages

- GitHub 仓库：Yundao-Chemical/website
- 生产分支：main
- 静态资源目录：仓库根目录 `.`
- 安装命令、构建命令：留空
- 正式域名：https://yundaochemical.com

## 内容与资源

- `assets/products.json`：原始清单中的 76 项产品名称、类别和来源名称。
- `assets/yundao-product-list.xlsx`：原始产品表，供访客下载。
- `assets/logo.svg`、`assets/mark.svg`：原版品牌标识。
- `assets/home-landscape-v2.jpg`：用户提供并指定的首页背景图。
- `assets/scene-*.jpg`：参考站 https://yundaochemical.web.app/ 中的四类 AI 场景示意图，仅作分类展示，不代表具体产品的实测效果。

本站不含证照原图，不依赖 ChatGPT 登录，也不依赖外部字体服务。
询盘面板仅在访客设备上整理草稿；网站不会自动发送消息。联系人由访客自行通过 WhatsApp 或邮件发送。姓名、邮箱及采购要求不会写入浏览器持久存储，产品编号和语言偏好可保存在本地。
