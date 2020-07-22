import request from 'superagent'

export function getSaves () {
  return request.get('/saves')
    .then(res => {
      return res.body
    })
}

export function saveField (save) {
  console.log(save)
  console.log('got into saveField')
  return request.post('/saves')
    .send(save)
    .then(res => {
      return res.body
    })
}
