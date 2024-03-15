import { getVideoEmbedInfo } from '../index'

describe('測試url轉換成嵌入格式', () => {
  test('當傳入空字串時是否報錯', () => {
    expect(getVideoEmbedInfo(''))
    .toEqual({ error: 'Invalid parameter: videoLink must be a string and not a empty string.' });
  });

  test('當傳入非社群平台的網址時丟出錯誤', () => {
    expect(getVideoEmbedInfo('https://www.example.com/1234567890'))
    .toEqual({ error: 'Invalid parameter: videoLink is not from FB, IG, tikTok or YouTube.' });
  });

  test('當傳入網址不符合格式', () => {
    expect(getVideoEmbedInfo('https://www.tiktok.com/@username/1234567890'))
    .toEqual({ error: 'Invalid parameter: video ID is not found.' });
  });

  test('當傳入youtube網址時是否轉換成嵌入格式', () => {
    expect(getVideoEmbedInfo('https://www.youtube.com/watch?v=1234567890'))
    .toEqual({ source: 'youtube', url: 'https://www.youtube.com/embed/1234567890' });
    expect(getVideoEmbedInfo('https://youtu.be/1234567890'))
    .toEqual({ source: 'youtube', url: 'https://www.youtube.com/embed/1234567890' });
    expect(getVideoEmbedInfo('https://www.youtube.com/shorts/1234567890'))
    .toEqual({ source: 'youtube', url: 'https://www.youtube.com/embed/1234567890' });
  });

  test('當傳入tikTok網址時是否轉換成嵌入格式', () => {
    expect(getVideoEmbedInfo('https://www.tiktok.com/@username/video/1234567890'))
    .toEqual({ source: 'tikTok', url: 'https://www.tiktok.com/embed/v2/1234567890' });
  });

  test('當傳入facebook網址時是否轉換成嵌入格式', () => {
    expect(getVideoEmbedInfo('https://www.facebook.com/username/videos/1234567890'))
    .toEqual({ source: 'facebook', url: 'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fusername%2Fvideos%2F1234567890%2F' });
    expect(getVideoEmbedInfo('https://www.facebook.com/watch/?v=1234567890'))
    .toEqual({ source: 'facebook', url: 'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F000000000000000%2Fvideos%2F1234567890%2F' });
    expect(getVideoEmbedInfo('https://www.facebook.com/reel/1234567890'))
    .toEqual({ source: 'facebook', url: 'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1234567890%2F' });
    expect(getVideoEmbedInfo('https://fb.watch/example0123/'))
    .toEqual({ source: 'facebook', url: 'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Ffb.watch%2Fexample0123%2F%2F' });
  });

  test('當傳入instagram網址時是否轉換成嵌入格式', () => {
    expect(getVideoEmbedInfo('https://www.instagram.com/p/1234567890/'))
    .toEqual({ source: 'instagram', url: 'https://instagram.com/p/1234567890/embed/' });

    expect(getVideoEmbedInfo('https://www.instagram.com/reel/1234567890/'))
    .toEqual({ source: 'instagram', url: 'https://instagram.com/p/1234567890/embed/' });

    expect(getVideoEmbedInfo('https://www.instagram.com/reels/1234567890/'))
    .toEqual({ source: 'instagram', url: 'https://instagram.com/p/1234567890/embed/' });
  });
})