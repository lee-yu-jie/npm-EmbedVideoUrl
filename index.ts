type embedInfo = {
  source: string
  url: string
}

const getVideoEmbedInfo = (originURL: string): embedInfo => {

  if (typeof originURL !== 'string' || !originURL) {
    throw new Error('Invalid parameter: videoLink must be a string.');
  }

  const info = {
    source: null,
    url: null,
  }
  let videoIdMatch: string[]
  let videoId: string

  switch (true) {
    case originURL.includes('youtu'):
      videoIdMatch = originURL.match(/(?:youtu\.be\/|(?:youtube\.com\/(?:watch\?v=|shorts\/)))([a-zA-Z0-9_-]+)/)
      videoId = videoIdMatch[1]

      info.source = 'youtube'
      info.url = `https://www.youtube.com/embed/${videoId}`
      break

    case originURL.includes('tiktok'):
      videoIdMatch = originURL.match(/video\/([a-zA-Z0-9_-]+)/)
      videoId = videoIdMatch[1]

      info.source = 'tikTok'
      info.url = `https://www.tiktok.com/embed/v2/${videoId}`
      break

    case originURL.includes('facebook'):
      const convertedUrl = originURL.replace(/[:/]/g, (match) => `%${match.charCodeAt(0).toString(16).toUpperCase()}`);
      info.source = 'facebook'
      info.url = `https://www.facebook.com/plugins/video.php?&href=${convertedUrl}%2F&show_text=false&t=0`
      break

    case originURL.includes('instagram'):
      videoIdMatch = originURL.match(/\/p\/([a-zA-Z0-9_-]+)\/|\/reel\/([a-zA-Z0-9_-]+)\//)
      videoId = videoIdMatch[1] || videoIdMatch[2]

      info.source = 'instagram'
      info.url = `https://instagram.com/p/${videoId}/embed/`
      break

    default:
      info.source = 'direct'
      info.url = originURL
      break
  }

  return info
}

module.exports = getVideoEmbedInfo