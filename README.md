## 描述
這款 npm 套件旨在簡化前端開發過程中的一個常見需求：將 Facebook、Instagram、TikTok 和 YouTube 等主流社群平台的視頻內容嵌入網頁中。它能自動將這些平台的視頻鏈接轉換為對應的嵌入式格式，讓開發者無需手動調整不同平台的嵌入代碼。此套件支持多種社群平台的視頻嵌入，並提供一個簡單統一的接口來生成標準的 iframe 標籤，極大地提高了開發效率並簡化了代碼的複雜度。

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