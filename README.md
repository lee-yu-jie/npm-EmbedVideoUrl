## 描述
因應 FB, IG, tikTok 和 youtube 各類主要社群影音平台，前端開發者需使用 iframe 標籤嵌入影音，但各社群有自己的嵌入網址格式，此套件可將網址輸出成嵌入網址。

## 安裝
npm i embed-video-url

## 用法
``` javascript
  import { getVideoEmbedInfo } from 'embedVideoUrl'

  const convertedUrl = getVideoEmbedInfo('需轉換的網址')
```

## 格式