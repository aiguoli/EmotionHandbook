const positive = [
  {desc: 'Confident', url: './static/imgs/emoji/positive/Confident.png'},
  {desc: 'Excited', url: './static/imgs/emoji/positive/Excited.png'},
  {desc: 'Fulfilled', url: './static/imgs/emoji/positive/Fulfilled.png'},
  {desc: 'Grateful', url: './static/imgs/emoji/positive/Grateful.png'},
  {desc: 'Happy', url: './static/imgs/emoji/positive/Happy.png'},
  {desc: 'Inspired', url: './static/imgs/emoji/positive/Inspired.png'},
  {desc: 'Joy', url: './static/imgs/emoji/positive/Joy.png'},
  {desc: 'Loved', url: './static/imgs/emoji/positive/Loved.png'},
  {desc: 'Motivated', url: './static/imgs/emoji/positive/Motivated.png'},
  {desc: 'Optimistic', url: './static/imgs/emoji/positive/Optimistic.png'},
  {desc: 'Peaceful', url: './static/imgs/emoji/positive/Peaceful.png'},
  {desc: 'Proud', url: './static/imgs/emoji/positive/Proud.png'},
  {desc: 'Relaxed', url: './static/imgs/emoji/positive/Relaxed.png'},
  {desc: 'Relieved', url: './static/imgs/emoji/positive/Relieved.png'},
  {desc: 'Satisfied', url: './static/imgs/emoji/positive/Satisfied.png'}
]
const negative = [
  {desc: 'Angry', url: './static/imgs/emoji/negative/Angry.png'},
  {desc: 'Disappointed', url: './static/imgs/emoji/negative/Disappointed.png'},
  {desc: 'Embarrassed', url: './static/imgs/emoji/negative/Embarrassed.png'},
  {desc: 'Empty', url: './static/imgs/emoji/negative/Empty.png'},
  {desc: 'Frustrated', url: './static/imgs/emoji/negative/Frustrated.png'},
  {desc: 'Guilty', url: './static/imgs/emoji/negative/Guilty.png'},
  {desc: 'Hopeless', url: './static/imgs/emoji/negative/Hopeless.png'},
  {desc: 'Lonely', url: './static/imgs/emoji/negative/Lonely.png'},
  {desc: 'Nervous', url: './static/imgs/emoji/negative/Nervous.png'},
  {desc: 'Overwhelmed', url: './static/imgs/emoji/negative/Overwhelmed.png'},
  {desc: 'Sad', url: './static/imgs/emoji/negative/Sad.png'},
  {desc: 'Scared', url: './static/imgs/emoji/negative/Scared.png'},
  {desc: 'Stressed', url: './static/imgs/emoji/negative/Stressed.png'},
  {desc: 'Tired', url: './static/imgs/emoji/negative/Tired.png'},
  {desc: 'Worried', url: './static/imgs/emoji/negative/Worried.png'}
]
const getProperty = function (emotionItem) {
  let obj = {}
  positive.forEach((item) => {
    if (item.desc === emotionItem.emotion) {
      obj = {
        url: item.url,
        desc: item.desc,
        level: emotionItem.level === '1' ? 'somewhat' : emotionItem.level === '2' ? 'very' : emotionItem.level === '3' ? 'strongly' : 'somewhat'
      }
    }
  })
  negative.forEach((item) => {
    if (item.desc === emotionItem.emotion) {
      obj = {
        url: item.url,
        desc: item.desc,
        level: emotionItem.level === '1' ? 'somewhat' : emotionItem.level === '2' ? 'very' : emotionItem.level === '3' ? 'strongly' : 'somewhat'
      }
    }
  })
  return obj
}
export {
  positive, negative, getProperty
}
