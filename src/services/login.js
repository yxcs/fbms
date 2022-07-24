import api from './api.config'

export const login = (data, params = {}) => {
  return api({
    url: '/api/login',
    data,
    params,
    method: 'POST'
  })
}

export const getUser = (data, params = {}) => {
  return api({
    url: '/api/user',
    data,
    params,
    method: 'GET'
  })
}
