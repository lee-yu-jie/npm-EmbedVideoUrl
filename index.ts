type EmbedInfoType = {
  source: string
  url: string
}

const notFoundIDError = () => {
  throw new Error('video ID not found.');
}

const getVideoEmbedInfo = (originalURL: string): EmbedInfoType => {

  if (typeof originalURL !== 'string' || !originalURL) {
    throw new Error('Invalid parameter: videoLink must be a string and not a empty string.');
  }

  const info = {
    source: '',
    url: '',
  }
  const isFacebookVideo = originalURL.includes('facebook') || originalURL.includes('fb')
  let videoIdMatch: string[]
  let videoId: string
  let convertedUrl: string

  switch (true) {
    case originalURL.includes('youtu'):
      videoIdMatch = originalURL.match(/(?:youtu\.be\/|(?:youtube\.com\/(?:watch\?v=|shorts\/)))([a-zA-Z0-9_-]+)/)
      videoId = videoIdMatch[1]

      info.source = 'youtube'
      info.url = `https://www.youtube.com/embed/${videoId}`
      break

    case originalURL.includes('tiktok'):
      videoIdMatch = originalURL.match(/video\/([a-zA-Z0-9_-]+)/)
      videoId = videoIdMatch[1]

      info.source = 'tikTok'
      info.url = `https://www.tiktok.com/embed/v2/${videoId}`
      break

    case isFacebookVideo:
      if (originalURL.includes('watch/?v')) {
        // 網址格式為 'https://www.facebook.com/watch/?v=000000000000000' 直接 ASCII 編碼會嵌入失敗 
        // 所以直接擷取最後的 ID 套用至寫好的固定網址
        videoIdMatch = originalURL.match(/(?:\?v=(\d+))/)
        videoId = videoIdMatch[1]
        convertedUrl = `https%3A%2F%2Fwww.facebook.com%2F000000000000000%2Fvideos%2F${videoId}`
      } else {
        convertedUrl = originalURL.replace(/[:/]/g, (match) => `%${match.charCodeAt(0).toString(16).toUpperCase()}`)
      }
      info.source = 'facebook'
      info.url = `https://www.facebook.com/plugins/video.php?href=${convertedUrl}%2F`
      break

    case originalURL.includes('instagram'):
      videoIdMatch = originalURL.match(/instagram\.com(?:\/p\/|\/reels?\/)([A-Za-z0-9_-]+)(?:\/|\?|$)/)
      videoId = videoIdMatch[1]

      info.source = 'instagram'
      info.url = `https://instagram.com/p/${videoId}/embed/`
      break

    default:
      throw new Error('Invalid parameter: videoLink is not from FB, IG, tikTok or youtube.');
  }

  return info
}

export { getVideoEmbedInfo }