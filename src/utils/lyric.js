/**
 * 
  [00:00.000] 作词 : 黄淑惠/林怡凤
  [00:00.012] 作曲 : 李志源
  [00:00.024] 编曲 : 百川Rebellious
  [00:00.38]出品：网易飓风
  [00:00.78]爱我的话 要我回答
  [00:04.61]我只等你等你一句话
  [00:08.09]走太远
  [00:09.38]你 走太远
  [00:11.28]你的回答
  [00:16.61]把爱留在身边
  [00:19.56]窗外有个蓝蓝的天
 */
// 需要转义的 [] .
// () 表示分组 \d表示数字 {2}表示2位  {2,3}表示2位或3位
const parseExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function parseLyric(lyricString) {
  const lineStrings = lyricString.split('\n')
  const lyrics = []
  for (let line of lineStrings) {
    if (line) {
      const result = parseExp.exec(line) // 数组4个元素  0:完整字符串 1: 第一个小括号
      if (!result) continue
      const [, time1, time2, time3] = result
      const time = time1 * 60 * 1000 + time2 * 1000 + (time3.length === 3 ? time3 * 1 : time3 * 10)
      // console.log(time)
      const content = line.replace(parseExp, '').trim()
      const lineObj = { time, content }
      // console.log(lineObj) //{time: 780, content: '爱我的话 要我回答'}
      lyrics.push(lineObj)
    }
  }
  return lyrics
}
