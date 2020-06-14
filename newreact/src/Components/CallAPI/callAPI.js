import { __SERVER__ } from './server'
import swal from 'sweetalert2'

export const host = __SERVER__
export const path = 'api/v2/member'
const secondaryPath = 'api'

const config = () => {
  return {
    headers: {
      'access-token': localStorage.getItem('access_token'),
      'client': localStorage.getItem('id_token'),
      'uid': localStorage.getItem('uid')
    }
  }
}

export function callAPIget (_extendPath) {
  let url = `${host}/${_extendPath}`
  return fetch(url, config())
    .then(response => {
      checkExpiredToken(response)
      return response
    })
    .then(response => {
      serverOffline(true)
      return response.json()
    })
    .then(response => {
      checkDomain(response)
      return response
    })
    .catch(err => {
      serverOffline(false)
    })
}

export function callSecondaryAPIget (_extendPath) {
  let url = `${host}/${_extendPath}`
  return fetch(url, config())
    .then(response => {
      checkExpiredToken(response)
      return response
    })
    .then(response => {
      serverOffline(true)
      return response.json()
    })
    .then(response => {
      checkDomain(response)
      return response
    })
    .catch(err => {
      serverOffline(false)
    })
}

export function getFileFromServer (_extendPath, data = '') {
  let url = `${host}/${_extendPath}`
  let myHeader = config().headers
  myHeader['Content-Type'] = 'application/json'
  return fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: myHeader,
    body: data
  })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      } else {
        return response
      }
    })
    .then(response => {
      checkExpiredToken(response)
      return response
    })
    .then(response => {
      return response.blob()
    })
    .then(data => {
      serverOffline(true)
      return URL.createObjectURL(data)
    })
    .catch(err => {
      swal({
        title: 'Error',
        text: err.statusText,
        type: 'error'
      })
    })
}

export function getBlobFromServer (_extendPath, data = '') {
  let url = `${host}/${_extendPath}`
  let myHeader = config().headers
  myHeader['Content-Type'] = 'application/json'
  return fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: myHeader,
    body: data
  })
  .then(response => {
    if (!response.ok) {
      throw Error(response.statusText)
    }
    return response.blob()
  })
  .catch(err => {
    swal({
      title: 'Error',
      text: err.statusText,
      type: 'error'
    })
  })
}

export function getFileFromServerByGet (_extendPath) {
  let url = `${host}/${_extendPath}`
  let myHeader = config().headers
  myHeader['Content-Type'] = 'application/json'
  return fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
    headers: myHeader,
  })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      } else {
        return response
      }
    })
    .then(response => {
      checkExpiredToken(response)
      return response
    })
    .then(response => {
      return response.blob()
    })
    .then(data => {
      serverOffline(true)
      return URL.createObjectURL(data)
    })
    .catch(err => {
      swal({
        title: 'Error',
        text: err.statusText,
        type: 'error'
      })
    })
}

export function getHtmlFileFromServer (_extendPath) {
  let url = `${host}/${_extendPath}`
  let myHeader = config().headers
  myHeader['Content-Type'] = 'application/json'
  return fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
    headers: myHeader,
  })
  .then(response => {
    if (!response.ok) {
      throw Error(response.statusText)
    } else {
      return response.text()
    }
  })
  .catch(err => {
    swal({
      title: 'Error',
      text: err.statusText,
      type: 'error'
    })
  })
}

export function callAPIpost (_extendPath, data = '', header = true) {
  let url = `${host}/${_extendPath}`
  let myHeader = config().headers
  myHeader['Content-Type'] = 'application/json'
  if (header) {
    return fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: myHeader,
      body: data
    })
    .then(response => {
      checkExpiredToken(response)
      return response
    })
    .then(response => {
      serverOffline(true)
      return response.json()
    }).catch(err => {
      serverOffline(false)
    })
  } else {
    return fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      body: data,
      ...config()
    })
    .then(response => {
      checkExpiredToken(response)
      return response
    })
    .then(response => {
      serverOffline(true)
      return response.json()
    }).catch(err => {
      serverOffline(false)
    })
  }
}

export function callAPIput (_extendPath, data, header = true) {
  let url = `${host}/${_extendPath}`
  let myHeader = config().headers
  myHeader['Content-Type'] = 'application/json'
  if (header) {
    return fetch(url, {
      method: 'PUT',
      headers: myHeader,
      credentials: 'same-origin',
      body: data
    })
    .then(response => {
      checkExpiredToken(response)
      return response
    })
    .then(response => {
      serverOffline(true)
      return response.json()
    }).catch(err => {
      serverOffline(false)
    })
  } else {
    return fetch(url, {
      method: 'PUT',
      credentials: 'same-origin',
      body: data,
      ...config()
    })
    .then(response => {
      checkExpiredToken(response)
      return response
    })
    .then(response => {
      serverOffline(true)
      return response.json()
    }).catch(err => {
      serverOffline(false)
    })
  }
}

export const callAPIdelete = (_extendPath) => {
  let url = `${host}/${_extendPath}`
  return fetch(url, {
    method: 'DELETE',
    credentials: 'same-origin',
    ...config()
  })
  .then(response => {
    checkExpiredToken(response)
    return response
  })
  .then(response => {
    serverOffline(true)
    return response.json()
  }).catch(err => {
    serverOffline(false)
  })
}

// Check server offline
const serverOfflineHTML = '' +
  '<div class="__server-offline"><div class="__server-info">' +
  '<h3>Server is now offline</h3><p>Check your connection again before continue.</p>' +
  '<div class="lds-css ng-scope">' +
  '<div style="width:100%;height:100%" class="lds-radio">' +
  '<div></div><div></div><div></div>' +
  '</div></div></div>' +
  '</div>'

const domainNotFound = `
  <div class='__domain-not-found-page'>
    <div class="domain-not-found-container">
      <h2 class='page-header'>
        <span class='label'>エラー404</span>
        <span>&nbsp;File Not Found</span>
      </h2>
      <div class='page-content'>
        <h3>該当するページが見つかりません。</h3>
        <p>
          ・アドレスが間違ってる可能性が考えられます。
        </p>
        <p>
          　アドレスを確認して、再度入力ください。
        </p>
        <p>
          ・指定されたページが削除、または移動、または別の場所に移動した可能性が考えられます。
        </p>
      </div>
    </div>
  </div>
`

export function serverOffline (_isOnline) {
  if (_isOnline) {
    document.getElementById('app_wrapper').innerHTML = ''
  } else {
    document.getElementById('app_wrapper').innerHTML = serverOfflineHTML
  }
}

export function checkDomain (res) {
  if (res.tenantNotFound) {
    document.getElementById('app_wrapper').innerHTML = domainNotFound
  }
}

function checkExpiredToken (response) {
  if (response.status === 401) {
    localStorage.clear()
    location.replace('/console/login')
  }
}
