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
      return res.body
    })
}

export function delSave (id) {
  return request.del(`/saves/${id}`)
    .send(id)
    .then(res => {
      return res.body
    })
}
