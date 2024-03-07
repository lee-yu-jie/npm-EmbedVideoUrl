## 描述
因應 FB, IG, tikTok 和 youtube 各類主要社群影音平台，前端開發者需使用 iframe 標籤嵌入影音，但各社群有自己的嵌入網址格式，此套件可將網址輸出成嵌入網址。

## 安裝
npm i embed-video-url

## 用法
``` javascript
  import { getVideoEmbedInfo } from 'embedVideoUrl'

  const convertedUrl = getVideoEmbedInfo('需轉換的網址')
```

## 傳入網址格式
以下為各平台的影音原始網址範例  
●&nbsp;FB:  
&nbsp;&nbsp;➡ https://www.facebook.com/00000000000000/videos/111111111111111/  
&nbsp;&nbsp;➡ https://www.facebook.com/watch/?v=111111111111111  
&nbsp;&nbsp;➡ https://www.facebook.com/reel/1111111111111111  

●&nbsp;IG:  
&nbsp;&nbsp;➡ https://www.instagram.com/p/example1111/  
&nbsp;&nbsp;➡ https://www.instagram.com/reels/example1111/  

●&nbsp;tikTok:  
&nbsp;&nbsp;➡ https://www.tiktok.com/@username/video/1111111111111111111  

●&nbsp;youtube:  
&nbsp;&nbsp;➡ https://www.youtube.com/watch?v=example1111  
&nbsp;&nbsp;➡ https://youtu.be/example1111  
&nbsp;&nbsp;➡ https://www.youtube.com/shorts/example1111  

## 輸出資料格式
●&nbsp;若傳入的網址非此四種平台，則將原網址回傳：  
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;source: 'direct',  
&nbsp;&nbsp;&nbsp;&nbsp;url: 'originalURL',  
&nbsp;&nbsp;}

●&nbsp;FB:  
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;source: 'facebook',  
&nbsp;&nbsp;&nbsp;&nbsp;url: 'https://www.facebook.com/plugins/video.php?&href=convertedUrl%2F&show_text=false&t=0',  
&nbsp;&nbsp;}

●&nbsp;IG:  
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;source: 'instagram',  
&nbsp;&nbsp;&nbsp;&nbsp;url: 'https://instagram.com/p/videoId/embed/',  
&nbsp;&nbsp;}

●&nbsp;tikTok:  
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;source: 'tikTok',  
&nbsp;&nbsp;&nbsp;&nbsp;url: 'https://www.tiktok.com/embed/v2/videoId',  
&nbsp;&nbsp;}

●&nbsp;youtube:  
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;source: 'youtube',  
&nbsp;&nbsp;&nbsp;&nbsp;url: 'https://www.youtube.com/embed/videoId',  
&nbsp;&nbsp;}