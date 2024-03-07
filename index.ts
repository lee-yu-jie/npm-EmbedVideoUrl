type embedInfo = {
  source: string
  url: string
}

const getVideoEmbedInfo = (originalURL: string): embedInfo => {

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
      const convertedUrl = originalURL.replace(/[:/]/g, (match) => `%${match.charCodeAt(0).toString(16).toUpperCase()}`);
      info.source = 'facebook'
      info.url = `https://www.facebook.com/plugins/video.php?&href=${convertedUrl}%2F&show_text=false&t=0`
      break

    case originalURL.includes('instagram'):
      videoIdMatch = originalURL.match(/\/p\/([a-zA-Z0-9_-]+)\/|\/reel\/([a-zA-Z0-9_-]+)\//)
      videoId = videoIdMatch[1] || videoIdMatch[2]

      info.source = 'instagram'
      info.url = `https://instagram.com/p/${videoId}/embed/`
      break

    default:
      info.source = 'direct'
      info.url = originalURL
      break
  }

  return info
}

export { getVideoEmbedInfo }