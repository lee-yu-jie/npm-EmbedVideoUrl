type EmbedInfoType = {
  source: string;
  url: string;
}
type ErrorType = {
  error: string;
}

const getVideoID = (originalURL: string, regex: RegExp) => {
  const videoIdMatch = originalURL.match(regex);
  return videoIdMatch ? videoIdMatch[1] : null;
}

const videoTypeMap = new Map([
  ['youtube', (originalURL: string) => {
    const regex = /(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|embed|shorts)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]+)/;
    const videoId = getVideoID(originalURL, regex);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;;
  }],
  ['facebook', (originalURL: string) => {
    let convertedURL: string 
    
    if (originalURL.includes('watch/?v')) {
      const regex = /(?:\?v=(\d+))/;
      const videoId = getVideoID(originalURL, regex);
      convertedURL = `https%3A%2F%2Fwww.facebook.com%2F000000000000000%2Fvideos%2F${videoId}`;
      return videoId ? `https://www.facebook.com/plugins/video.php?href=${convertedURL}%2F` : null;
    } else {
      convertedURL = originalURL.replace(/[:/]/g, (match) => `%${match.charCodeAt(0).toString(16).toUpperCase()}`);
      return `https://www.facebook.com/plugins/video.php?href=${convertedURL}%2F`;
    }
  }],
  ['tikTok', (originalURL: string) => {
    const regex = /video\/([a-zA-Z0-9_-]+)/;
    const videoId = getVideoID(originalURL, regex);
    return videoId ? `https://www.tiktok.com/embed/v2/${videoId}` : null;
  }],
  ['instagram', (originalURL: string) => {
    const regex = /instagram\.com(?:\/p\/|\/reels?\/)([A-Za-z0-9_-]+)(?:\/|\?|$)/;
    const videoId = getVideoID(originalURL, regex);
    return videoId ? `https://instagram.com/p/${videoId}/embed/` : null;
  }],
]);

const getVideoSource = (URL: string) => {
  if (URL.includes('youtu')) return 'youtube'
  if (URL.includes('tiktok')) return 'tikTok'
  if (URL.includes('instagram')) return 'instagram'
  if (URL.includes('facebook') || URL.includes('fb')) return 'facebook'
  return false
}

const createError = (message: string): ErrorType => {
  return { error: message };
};

const getVideoEmbedInfo = (originalURL: string): EmbedInfoType | ErrorType => {
  const info = {
    source: '',
    url: '',
  }

  if (typeof originalURL !== 'string' || !originalURL) {
    return createError('Invalid parameter: videoLink must be a string and not a empty string.');
  };

  const videoOrigin = getVideoSource(originalURL)

  if(!videoOrigin) {
    return createError('Invalid parameter: videoLink is not from FB, IG, tikTok or YouTube.');
  };

  const embedURL = videoTypeMap.get(videoOrigin)(originalURL);

  if(!embedURL) {
    return createError('Invalid parameter: video ID is not found.');
  }

  info.url = embedURL
  info.source = videoOrigin;

  return info
}

export { getVideoEmbedInfo }