# 耘稻官网静态文件

此文件包对应当前官网第 5 版，导出日期：2026 年 10 月 20 日。
包含新版背景图、原版 Logo、中英文内容、76 项产品、Samantha 联系方式及细线箭头。

## 部署

这是纯 HTML / CSS / JavaScript 网站，无需安装依赖、编译或配置数据库。
解压后，把本目录中的全部文件及 assets 文件夹上传到任意静态网站空间。
index.html 应位于网站根目录，并保持目录结构及文件名不变。

## 在电脑上预览

请通过本地网页服务器预览，而不是双击 index.html。
产品目录通过 assets/products.json 加载，直接以 file:// 打开可能被浏览器限制。
如果电脑安装了 Python，可在此文件夹打开终端，运行：

    python3 -m http.server 8080

然后在浏览器打开 http://localhost:8080 。

## 文件说明

- index.html：页面结构与中英文文案。
- styles.css：桌面和手机样式。
- app.js：语言切换、分类、搜索及询盘交互。
- assets/products.json：产品名称与分类。
- assets/yundao-product-list.xlsx：供访客下载的原始产品表。
- assets/logo.svg、assets/mark.svg：原版品牌标识。
- assets/home-landscape-v2.jpg：首页背景原图。

## 功能与网络要求

- 不依赖 ChatGPT 登录或 Sites 托管，可部署到自己的域名与静态服务器。
- 图片、Logo、产品数据和产品表均随包提供。
- 页面字体使用 Google Fonts；无法连接时会自动使用系统备用字体。
- 邮件询盘在访客的邮件应用中打开草稿，需要访客自行发送。
- WhatsApp 链接需要相应应用或网页版及网络连接。
- 询盘副本在本机生成，本网站没有自动收信后台。
- 此包不包含证照原图、Git 历史或 Sites 配置。

## 版本记录

来源官网：https://yundao-agro.pluckywood7.chatgpt.site/
源代码版本：2cdc1085487b6598b8ab84dd45c97288252a05e8
