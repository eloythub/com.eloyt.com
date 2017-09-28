import io from 'socket.io-client'

const $input = $('#input')
const $send = $('#send')
const $result = $('#result')

let resultIndex = 0

const debug = (...args) => {
  $result.append(`${++resultIndex} | `)

  args.map((arg) => {
    if (typeof arg !== 'string') {
      arg = JSON.stringify(arg)
    }

    $result.append(`${arg} `)
  })

  $result.append('<br /><br />')
}

const socket = io('http://dev.com.eloyt.com', {
  transports: ['websocket']
})

debug('init')

// when connection got established
socket.on('connect', () => {
  debug(`i am connected <strong>"${socket.id}"</strong>`)
})

// when server asks device to introduce itself
socket.on('auth-ping', (data) => {
  debug('com service asked to introduce myself')

  socket.emit('auth-pong', {device_type: 'ios'})
})

// when server has correct information and allow us to go ahead and communicate
socket.on('auth-green-light', (data) => {
  debug('got green light from server to start working :D')
})

// when device loses connection
socket.on('disconnect', () => {
  debug('oops, i lost connection')
})

//////////////////////
//////////////////////
//////////////////////
// frontend Components
$send.click(() => {
  'use strict'

  const inputText = $input.val()

  $input.val('')

  let inputObj = inputText.split(':')

  if (inputObj.length > 1) {
    const [emit, ...message] = inputObj

    let joinedMessage = message.join(':')

    try {
      joinedMessage = JSON.parse(joinedMessage)
    } catch (err) {

    }

    return socket.emit(emit, joinedMessage)
  }

  return socket.emit('message', inputText)
})

$input.keyup((e) => {
  'use strict'

  if (e.keyCode === 13) {
    $send.click()
  }
})