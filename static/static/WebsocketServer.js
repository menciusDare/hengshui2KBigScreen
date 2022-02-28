var WebsocketServer = function (a, b) {
  function c () {
  }

  function d (a, b, c, d) {
    var e = ''
    switch (a) {
      case 'OPTIONS':
      case 'TEARDOWN':
      case 'GET_PARAMETER':
      case 'SET_PARAMETERS':
        e = a + ' ' + M + ' RTSP/1.0\r\nCSeq: ' + B + '\r\n' + z + '\r\n'
        break
      case 'DESCRIBE':
        e = a + ' ' + M + ' RTSP/1.0\r\nCSeq: ' + B + '\r\n' + z + '\r\n'
        break
      case 'SETUP':
        debug.log('trackID: ' + b), e = a + ' ' + M + '/trackID=' + b + ' RTSP/1.0\r\nCSeq: ' + B + '\r\n' + z + 'Transport: DH/AVP/TCP;unicast;interleaved=' + 2 * b + '-' + (2 * b + 1) + '\r\n', e += G != 0 ? 'Session: ' + G + '\r\n\r\n' : '\r\n'
        break
      case 'PLAY':
        e = a + ' ' + M + ' RTSP/1.0\r\nCSeq: ' + B + '\r\nSession: ' + G + '\r\n', void 0 != d && d != 0 ? (e += 'Range: npt=' + d + '-\r\n', e += z + '\r\n') : e += z + '\r\n'
        break
      case 'PAUSE':
        e = a + ' ' + M + ' RTSP/1.0\r\nCSeq: ' + B + '\r\nSession: ' + G + '\r\n\r\n'
        break
      case 'SCALE':
        e = 'PLAY ' + M + ' RTSP/1.0\r\nCSeq: ' + B + '\r\nSession: ' + G + '\r\n', e += 'Scale: ' + d + '\r\n', e += z + '\r\n'
    }
    return debug.log(e), e
  }

  function e (a) {
    debug.log(a)
    var b = {}, e = a.search('CSeq: ') + 5
    if (B = parseInt(a.slice(e, e + 10)) + 1, b = m(a), b.ResponseCode === x.UNAUTHORIZED && z === '') f(b); else if (b.ResponseCode === x.OK) {
      if (E === 'Options') return E = 'Describe', d('DESCRIBE', null, null)
      if (E === 'Describe') {
        I = !1, D = n(a), typeof b.ContentBase !== 'undefined' && (D.ContentBase = b.ContentBase)
        var g = 0
        for (g = 0; g < D.Sessions.length; g += 1) {
          var i = {}
          D.Sessions[g].CodecMime === 'JPEG' || D.Sessions[g].CodecMime === 'H264' || D.Sessions[g].CodecMime === 'H265' || D.Sessions[g].CodecMime == 'H264-SVC' ? (i.codecName = D.Sessions[g].CodecMime, D.Sessions[g].CodecMime == 'H264-SVC' && (i.codecName = 'H264'), D.Sessions[g].CodecMime == 'H265' && c.prototype.setLiveMode('canvas'), i.trackID = D.Sessions[g].ControlURL, i.ClockFreq = D.Sessions[g].ClockFreq, i.Port = parseInt(D.Sessions[g].Port), typeof D.Sessions[g].Framerate !== 'undefined' && (i.Framerate = parseInt(D.Sessions[g].Framerate), w.setFPS(i.Framerate), N(i.Framerate)), A.push(i)) : D.Sessions[g].CodecMime === 'PCMU' || D.Sessions[g].CodecMime.search('G726-16') !== -1 || D.Sessions[g].CodecMime.search('G726-24') !== -1 || D.Sessions[g].CodecMime.search('G726-32') !== -1 || D.Sessions[g].CodecMime.search('G726-40') !== -1 || D.Sessions[g].CodecMime === 'PCMA' ? (D.Sessions[g].CodecMime === 'PCMU' ? i.codecName = 'G.711Mu' : D.Sessions[g].CodecMime === 'G726-16' ? i.codecName = 'G.726-16' : D.Sessions[g].CodecMime === 'G726-24' ? i.codecName = 'G.726-24' : D.Sessions[g].CodecMime === 'G726-32' ? i.codecName = 'G.726-32' : D.Sessions[g].CodecMime === 'G726-40' ? i.codecName = 'G.726-40' : D.Sessions[g].CodecMime === 'PCMA' && (i.codecName = 'G.711A'), i.trackID = D.Sessions[g].ControlURL, i.ClockFreq = D.Sessions[g].ClockFreq, i.Port = parseInt(D.Sessions[g].Port), i.Bitrate = parseInt(D.Sessions[g].Bitrate), A.push(i)) : D.Sessions[g].CodecMime === 'mpeg4-generic' || D.Sessions[g].CodecMime === 'MPEG4-GENERIC' ? (i.codecName = 'mpeg4-generic', i.trackID = D.Sessions[g].ControlURL, i.ClockFreq = D.Sessions[g].ClockFreq, i.Port = parseInt(D.Sessions[g].Port), i.Bitrate = parseInt(D.Sessions[g].Bitrate), A.push(i)) : D.Sessions[g].CodecMime === 'vnd.onvif.metadata' ? (i.codecName = 'MetaData', i.trackID = D.Sessions[g].ControlURL, i.ClockFreq = D.Sessions[g].ClockFreq, i.Port = parseInt(D.Sessions[g].Port), A.push(i)) : D.Sessions[g].CodecMime === 'stream-assist-frame' ? (i.codecName = 'stream-assist-frame', i.trackID = D.Sessions[g].ControlURL, i.ClockFreq = D.Sessions[g].ClockFreq, i.Port = parseInt(D.Sessions[g].Port), A.push(i)) : debug.log('Unknown codec type:', D.Sessions[g].CodecMime, D.Sessions[g].ControlURL)
        }
        return F = 0, E = 'Setup', debug.log(A), d('SETUP', F)
      }
      if (E === 'Setup') {
        if (G = b.SessionID, F < A.length) return A[F].RtpInterlevedID = b.RtpInterlevedID, A[F].RtcpInterlevedID = b.RtcpInterlevedID, F += 1, F !== A.length ? d('SETUP', A[F].trackID.split('=')[1] - 0) : (w.sendSdpInfo(A, L, I), E = 'Play', d('PLAY', null))
        debug.log('Unknown setup SDP index')
      } else if (E === 'Play') {
        G = b.SessionID, clearInterval(J), J = setInterval(function () {
          return h(d('GET_PARAMETER', null, null))
        }, y)
        E = 'Playing'
      } else E === 'Playing' || debug.log('unknown rtsp state:' + E)
    } else if (b.ResponseCode === x.NOTSERVICE) {
      if (E === 'Setup' && A[F].trackID.search('trackID=t') !== -1) {
        return A[F].RtpInterlevedID = -1, A[F].RtcpInterlevedID = -1, F += 1, I = !1, C({
          errorCode: '504',
          description: 'Talk Service Unavilable',
          place: 'RtspClient.js'
        }), F < A.length ? d('SETUP', A[F].trackID) : (E = 'Play', d('PLAY', null))
      }
      C({errorCode: '503', description: 'Service Unavilable'})
    } else if (b.ResponseCode === x.NOTFOUND) {
      if (E === 'Describe' || E === 'Options') return void C({errorCode: 404, description: 'rtsp not found'})
    } else if (b.ResponseCode === x.INVALID_RANGE) {
      return (H === 'backup' || H === 'playback') && C({
        errorCode: '457',
        description: 'Invalid range'
      }), void debug.log('RTP disconnection detect!!!')
    }
  }

  function f (a) {
    var b = P.username, c = P.passWord, e = {Method: null, Realm: null, Nonce: null, Uri: null}, f = null
    e = {
      Method: E.toUpperCase(),
      Realm: a.Realm,
      Nonce: a.Nonce,
      Uri: M
    }, f = g(b, c, e.Uri, e.Realm, e.Nonce, e.Method), z = 'Authorization: Digest username="' + b + '", realm="' + e.Realm + '",', z += ' nonce="' + e.Nonce + '", uri="' + e.Uri + '", response="' + f + '"', z += '\r\n', h(d('OPTIONS', null, null))
  }

  function g (a, b, c, d, e, f) {
    var g = null, h = null, i = null
    return g = hex_md5(a + ':' + d + ':' + b).toLowerCase(), h = hex_md5(f + ':' + c).toLowerCase(), i = hex_md5(g + ':' + e + ':' + h).toLowerCase()
  }

  function h (a) {
    if (void 0 != a && a != null && a != '') {
      if (o !== null && o.readyState === WebSocket.OPEN) {
        if (v === !1) {
          var b = a.search('DESCRIBE')
          b !== -1 && (u = !0, v = !0)
        }
        void 0 != a && o.send(i(a))
      } else debug.log('ws未连接')
    }
  }

  function i (a) {
    for (var b = a.length, c = new Uint8Array(new ArrayBuffer(b)), d = 0; b > d; d++) c[d] = a.charCodeAt(d)
    return c
  }

  function j (a) {
    var b = new Uint8Array(), c = new Uint8Array(a.data)
    for (b = new Uint8Array(c.length), b.set(c, 0), s = b.length; s > 0;) {
      if (b[0] !== 36) {
        var d = String.fromCharCode.apply(null, b), f = null
        d.indexOf('OffLine:File Over') !== -1 && O(), u === !0 ? (f = d.lastIndexOf('\r\n'), u = !1) : f = d.search('\r\n\r\n')
        var g = d.search('RTSP')
        if (g === -1) return void (b = new Uint8Array())
        if (f === -1) return void (s = b.length)
        q = b.subarray(g, f + p), b = b.subarray(f + p)
        var i = String.fromCharCode.apply(null, q)
        h(e(i)), s = b.length
      } else {
        if (r = b.subarray(0, p), t = r[2] << 24 | r[3] << 16 | r[4] << 8 | r[5], !(t + p <= b.length)) return void (s = b.length)
        var j = b.subarray(p, t + p)
        l(r, j), b = b.subarray(t + p), s = b.length
      }
    }
  }

  function k (a) {
    K = a
  }

  function l (a, b) {
    w.parseRTPData(a, b), k(!0)
  }

  function m (a) {
    var b = {}, c = 0, d = 0, e = null, f = null, g = null
    if (a.search('Content-Type: application/sdp') !== -1) {
      var h = a.split('\r\n\r\n')
      g = h[0]
    } else g = a
    var i = g.split('\r\n'), j = i[0].split(' ')
    if (j.length > 2 && (b.ResponseCode = parseInt(j[1]), b.ResponseMessage = j[2]), b.ResponseCode === x.OK) {
      for (c = 1; c < i.length; c++) {
        if (f = i[c].split(':'), f[0] === 'Public') b.MethodsSupported = f[1].split(','); else if (f[0] === 'CSeq') b.CSeq = parseInt(f[1]); else if (f[0] === 'Content-Type') b.ContentType = f[1], b.ContentType.search('application/sdp') !== -1 && (b.SDPData = n(a)); else if (f[0] === 'Content-Length') b.ContentLength = parseInt(f[1]); else if (f[0] === 'Content-Base') {
          var k = i[c].search('Content-Base:')
          k !== -1 && (b.ContentBase = i[c].substr(k + 13))
        } else if (f[0] === 'Session') {
          var l = f[1].split(';')
          b.SessionID = parseInt(l[0])
        } else if (f[0] === 'Transport') {
          var m = f[1].split(';')
          for (d = 0; d < m.length; d++) {
            var o = m[d].search('interleaved=')
            if (o !== -1) {
              var p = m[d].substr(o + 12), q = p.split('-')
              q.length > 1 && (b.RtpInterlevedID = parseInt(q[0]), b.RtcpInterlevedID = parseInt(q[1]))
            }
          }
        } else if (f[0] === 'RTP-Info') {
          f[1] = i[c].substr(9)
          var r = f[1].split(',')
          for (b.RTPInfoList = [], d = 0; d < r.length; d++) {
            var s = r[d].split(';'), t = {}, u = 0
            for (u = 0; u < s.length; u++) {
              var v = s[u].search('url=')
              v !== -1 && (t.URL = s[u].substr(v + 4)), v = s[u].search('seq='), v !== -1 && (t.Seq = parseInt(s[u].substr(v + 4)))
            }
            b.RTPInfoList.push(t)
          }
        }
      }
    } else if (b.ResponseCode === x.UNAUTHORIZED) {
      for (c = 1; c < i.length; c++) {
        if (f = i[c].split(':'), f[0] === 'CSeq') b.CSeq = parseInt(f[1]); else if (f[0] === 'WWW-Authenticate') {
          var w = f[1].split(',')
          for (d = 0; d < w.length; d++) {
            var y = w[d].search('Digest realm=')
            if (y !== -1) {
              e = w[d].substr(y + 13)
              var z = e.split('"')
              b.Realm = z[1]
            }
            if (y = w[d].search('nonce='), y !== -1) {
              e = w[d].substr(y + 6)
              var A = e.split('"')
              b.Nonce = A[1]
            }
          }
        }
      }
    }
    return b
  }

  function n (a) {
    var b = {}, c = []
    b.Sessions = c
    var d = null
    if (a.search('Content-Type: application/sdp') !== -1) {
      var e = a.split('\r\n\r\n')
      d = e[1]
    } else d = a
    var f = d.split('\r\n'), g = 0, h = !1
    for (g = 0; g < f.length; g++) {
      var i = f[g].split('=')
      if (i.length > 0) {
        switch (i[0]) {
          case 'a':
            var j = i[1].split(':')
            if (j.length > 1) {
              if (j[0] === 'control') {
                var k = f[g].search('control:')
                h === !0 ? k !== -1 && (b.Sessions[b.Sessions.length - 1].ControlURL = f[g].substr(k + 8)) : k !== -1 && (b.BaseURL = f[g].substr(k + 8))
              } else if (j[0] === 'rtpmap') {
                var l = j[1].split(' ')
                b.Sessions[b.Sessions.length - 1].PayloadType = l[0]
                var m = l[1].split('/')
                b.Sessions[b.Sessions.length - 1].CodecMime = m[0], m.length > 1 && (b.Sessions[b.Sessions.length - 1].ClockFreq = m[1])
              } else if (j[0] === 'framesize') {
                var n = j[1].split(' ')
                if (n.length > 1) {
                  var o = n[1].split('-')
                  b.Sessions[b.Sessions.length - 1].Width = o[0], b.Sessions[b.Sessions.length - 1].Height = o[1]
                }
              } else if (j[0] === 'framerate') b.Sessions[b.Sessions.length - 1].Framerate = j[1]; else if (j[0] === 'fmtp') {
                var p = f[g].split(' ')
                if (p.length < 2) continue
                for (var q = 1; q < p.length; q++) {
                  var r = p[q].split(';'), s = 0
                  for (s = 0; s < r.length; s++) {
                    var t = r[s].search('mode=')
                    if (t !== -1 && (b.Sessions[b.Sessions.length - 1].mode = r[s].substr(t + 5)), t = r[s].search('config='), t !== -1 && (b.Sessions[b.Sessions.length - 1].config = r[s].substr(t + 7), L.config = b.Sessions[b.Sessions.length - 1].config, L.clockFreq = b.Sessions[b.Sessions.length - 1].ClockFreq, L.bitrate = b.Sessions[b.Sessions.length - 1].Bitrate), t = r[s].search('sprop-vps='), t !== -1 && (b.Sessions[b.Sessions.length - 1].VPS = r[s].substr(t + 10)), t = r[s].search('sprop-sps='), t !== -1 && (b.Sessions[b.Sessions.length - 1].SPS = r[s].substr(t + 10)), t = r[s].search('sprop-pps='), t !== -1 && (b.Sessions[b.Sessions.length - 1].PPS = r[s].substr(t + 10)), t = r[s].search('sprop-parameter-sets='), t !== -1) {
                      var u = r[s].substr(t + 21), v = u.split(',')
                      v.length > 1 && (b.Sessions[b.Sessions.length - 1].SPS = v[0], b.Sessions[b.Sessions.length - 1].PPS = v[1])
                    }
                  }
                }
              }
            }
            break
          case 'm':
            var w = i[1].split(' '), x = {}
            x.Type = w[0], x.Port = w[1], x.Payload = w[3], b.Sessions.push(x), h = !0
            break
          case 'b':
            if (h === !0) {
              var y = i[1].split(':')
              b.Sessions[b.Sessions.length - 1].Bitrate = y[1]
            }
        }
      }
    }
    return b
  }

  var a = a, o = null, p = 6, q = null, r = null, s = 0, t = 0, u = !1, v = !1, w = new WorkerManager(),
    x = {OK: 200, UNAUTHORIZED: 401, NOTFOUND: 404, INVALID_RANGE: 457, NOTSERVICE: 503, DISCONNECT: 999}, y = 4e4,
    z = '', A = [], B = 1, C = null, D = {}, E = 'Options', F = null, G = null, H = '', I = !1, J = null, K = !1,
    L = {}, M = b, N = null, O = null, P = {}, Q = ''
  return c.prototype = {
    init: function (a, b) {
      w.init(a, b)
    },
    connect: function () {
      o || (o = new WebSocket(a), o.binaryType = 'arraybuffer', o.addEventListener('message', j, !1), o.onopen = function () {
        var a = i('OPTIONS ' + M + ' RTSP/1.0\r\nCSeq: ' + B + '\r\n\r\n')
        o.send(a)
      })
    },
    disconnect: function () {
      h(d('TEARDOWN', null, null)), clearInterval(J), J = null, o !== null && o.readyState === WebSocket.OPEN && (o.close(), o = null, G = null), w.terminate()
    },
    controlPlayer: function (a) {
      var b = ''
      switch (Q = a.command, a.command) {
        case 'PLAY':
          if (E = 'Play', a.range != null) {
            b = d('PLAY', null, null, a.range)
            break
          }
          b = d('PLAY', null, null), Q && w.initStartTime()
          break
        case 'PAUSE':
          if (E === 'PAUSE') break
          E = 'PAUSE', b = d('PAUSE', null, null)
          break
        case 'SCALE':
          b = d('SCALE', null, null, a.data), w.playbackSpeed(a.data)
          break
        case 'TEARDOWN':
          b = d('TEARDOWN', null, null)
          break
        case 'audioPlay':
        case 'volumn':
        case 'audioSamplingRate':
          w.controlAudio(a.command, a.data)
          break
        default:
          debug.log('未知指令: ' + a.command)
      }
      b != '' && h(b)
    },
    setLiveMode: function (a) {
      w.setLiveMode(a)
    },
    setRTSPURL: function (a) {
      M = a
    },
    setCallback: function (a, b) {
      a === 'GetFrameRate' ? N = b : a === 'FileOver' ? O = b : w.setCallback(a, b), a == 'Error' && (C = b)
    },
    setUserInfo: function (a, b) {
      P.username = a, P.passWord = b
    },
    capture: function (a) {
      w.capture(a)
    }
  }, new c()
}
