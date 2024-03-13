type EmbedInfoType = {
  source: string
  url: string
}

const getVideoEmbedInfo = (originalURL: string): EmbedInfoType => {

  if (typeof originalURL !== 'string' || !originalURL) {
    throw new Error('Invalid parameter: videoLink must be a string and not a empty string.');
  }

  const info = {
    source: null,
    url: null,
  }
  let videoIdMatch: string[]
  let videoId: string

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

    case originalURL.includes('facebook'):
      videoIdMatch = originalURL.match(/(?:\/videos\/(\d+))|(?:\?v=(\d+))|(?:\/reel\/(\d+))/)
      console.log(videoIdMatch)
      videoId = videoIdMatch[1] || videoIdMatch[2] || videoIdMatch[3]

      info.source = 'facebook'
      info.url = `https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F000000000000000%2Fvideos%2F${videoId}%2F&show_text=false&t=0`
      break

    case originalURL.includes('instagram'):
      videoIdMatch = originalURL.match(/\/p\/([a-zA-Z0-9_-]+)\/|\/reels?\/([a-zA-Z0-9_-]+)\//)
      videoId = videoIdMatch[1] || videoIdMatch[2]

      info.source = 'instagram'
      info.url = `https://instagram.com/p/${videoId}/embed/`
      break

    default:
      throw new Error('Invalid parameter: videoLink is not from FB, IG, tikTok or youtube.');
  }

  return info
}

export { getVideoEmbedInfo }