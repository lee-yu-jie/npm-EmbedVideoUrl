import { getVideoEmbedInfo } from '../index'

describe('測試url轉換成嵌入格式', () => {
  test('當傳入空字串時是否報錯', () => {
    expect(() => {
      getVideoEmbedInfo('');
    }).toThrow('Invalid parameter: videoLink must be a string and not a empty string.');
  });

  test('當傳入youtube網址時是否轉換成嵌入格式', () => {
    expect(getVideoEmbedInfo('https://www.youtube.com/watch?v=1234567890'))
    .toEqual({ source: 'youtube', url: 'https://www.youtube.com/embed/1234567890' });
  });

  test('當傳入tikTok網址時是否轉換成嵌入格式', () => {
    expect(getVideoEmbedInfo('https://www.tiktok.com/@username/video/1234567890'))
    .toEqual({ source: 'tikTok', url: 'https://www.tiktok.com/embed/v2/1234567890' });
  });

  test('當傳入facebook網址時是否轉換成嵌入格式', () => {
    expect(getVideoEmbedInfo('https://www.facebook.com/username/videos/1234567890'))
    .toEqual({ source: 'facebook', url: 'https://www.facebook.com/plugins/video.php?&href=https%3A%2F%2Fwww.facebook.com%2Fusername%2Fvideos%2F1234567890%2F&show_text=false&t=0' });
  });

  test('當傳入instagram網址時是否轉換成嵌入格式', () => {
    expect(getVideoEmbedInfo('https://www.instagram.com/p/1234567890/'))
    .toEqual({ source: 'instagram', url: 'https://instagram.com/p/1234567890/embed/' });
  });

  test('當傳入非社群平台的網址時是否直接回傳原網址', () => {
    expect(getVideoEmbedInfo('https://www.example.com/1234567890'))
    .toEqual({ source: 'direct', url: 'https://www.example.com/1234567890' });
  });
})