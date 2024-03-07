type EmbedInfoType = {
  source: string
  url: string
}

declare module 'embed-video-url' {
  export function getVideoEmbedInfo(originalURL: string): EmbedInfoType;
}