import request from 'superagent'

export function getSaves () {
  return request.get('/saves')
    .then(res => {
      return res.body
    })
}
