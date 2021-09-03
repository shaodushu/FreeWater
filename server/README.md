### Ubuntu20 安装puppeteer

1. 安装deno

   使用 Shell (macOS 和 Linux):
   ```shell
   curl -fsSL https://deno.land/x/install/install.sh | sh
   ```
   使用 PowerShell (Windows):
   ```shell
   iwr https://deno.land/x/install/install.ps1 -useb | iex
   ```

2. 根据Puppeteer项目主页的Wiki文章，使用下面命令安装缺失的库：

   ```shell
   apt-get install -y gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6
   libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4
   libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0
   libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1
   libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1
   libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3
   lsb-release xdg-utils
   ```
3. 到这里chrome可以无头启动，但中文字体显示为方块，因为镜像中不包括中文字体。这时只要从Windows中搬运几个常用字体到Ubuntu里即可：

   - 浏览到Windows的字体目录C:\Windows\Fonts
   - 上传几个常用字体，如“宋体 常规”、“微软雅黑”，到ubuntu的/usr/share/fonts目录，文件名为：simsun.ttc,
     msyh.ttc
   - 安装几个字体工具 sudo apt-get -y install fontconfig xfonts-utils
   - 建立字体索引信息，更新字体缓存，依次执行如下命令：

     1. mkfontscale
     2. mkfontdir
     3. fc-cache
   - 执行fc-list :lang=zh列出系统中文字体，此时应该可以看到若干中文字体
