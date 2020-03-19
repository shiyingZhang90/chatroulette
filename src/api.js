const ROOT = require('../CONFIG.js').API_ROOT
const ALL_VALUE = 'all'

export async function callApi (path, payload = {}, method) {
  let option = {}
  let params = ''
  if (method) {
    option = { method, body: JSON.stringify(payload) }
  } else {
    if (!payload.pid) {
      payload.pid = ALL_VALUE
    }
    params = Object.entries(payload).map(([key, value]) => `${key}=${value}`).join('&')
    if (params) {
      params = '?' + params
    }
  }

  const response = await fetch(`${ROOT}${path}${params}`, option)
  const data = await response.json()
  if (response.ok) {
    return data.payload
  } else {
    throw new Error(data.message)
  }
}
