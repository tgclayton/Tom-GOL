import request from 'superagent'

export function getSaves () {
  return request.get('/saves')
    .then(res => {
      return res.body
    })
}

export function saveField (save) {
  // console.log(save)
  return request.post('/saves')
    .send(save)
    .then(res => {
      // console.log(res.body)
    })
}
