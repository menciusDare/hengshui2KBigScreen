'use strict'

function receiveMessage (a) {
  var b = a.data
  switch (channelId = a.data.channelId, b.type) {
    case 'sdpInfo':
      sdpInfo = b.data, framerate = 0, setVideoRtpSession(sdpInfo)
      break
    case 'MediaData':
      if (isStepPlay === !0) {
        buffering(b)
        break
      }
      videoCHID = b.data.rtspInterleave[1], typeof videoRtpSessionsArray[videoCHID] !== 'undefined' && videoRtpSessionsArray[videoCHID].parseRTPData(b.data.rtspInterleave, b.data.payload, isBackupCommand, dropout, b.info)
      break
    case 'initStartTime':
      videoRtpSessionsArray[videoCHID].initStartTime()
  }
}

function setVideoRtpSession (a) {
  videoRtpSessionsArray = [], isStepPlay = !1
  for (var b = 0; b < a.sdpInfo.length; b++) rtpSession = null, decodeMode = a.decodeMode, a.sdpInfo[b].codecName === 'H264' ? (h264Session === null && (h264Session = H264Session()), rtpSession = h264Session, rtpSession.init(a.decodeMode), rtpSession.setFramerate(a.sdpInfo[b].Framerate), rtpSession.setGovLength(a.govLength), rtpSession.setCheckDelay(a.checkDelay)) : a.sdpInfo[b].codecName === 'H265' ? (h265Session === null && (h265Session = H265Session()), rtpSession = h265Session, rtpSession.init(), rtpSession.setFramerate(a.sdpInfo[b].Framerate), rtpSession.setGovLength(a.govLength), rtpSession.setCheckDelay(a.checkDelay)) : a.sdpInfo[b].codecName === 'JPEG' ? (mjpegSession === null && (mjpegSession = MjpegSession()), rtpSession = mjpegSession, rtpSession.init(), rtpSession.setFramerate(a.sdpInfo[b].Framerate)) : a.sdpInfo[b].codecName === 'stream-assist-frame' && (debug.log(a.sdpInfo[b]), ivsSession === null && (ivsSession = IvsSession()), rtpSession = ivsSession, rtpSession.init()), typeof a.sdpInfo[b].Framerate !== 'undefined' && (framerate = a.sdpInfo[b].Framerate), rtpSession !== null && (rtpSession.setBufferfullCallback(BufferFullCallback), rtpSession.setReturnCallback(RtpReturnCallback), videoCHID = a.sdpInfo[b].RtpInterlevedID, videoRtpSessionsArray[videoCHID] = rtpSession)
}

function buffering (a) {
  videoCHID = a.data.rtspInterleave[1], typeof videoRtpSessionsArray[videoCHID] !== 'undefined' && videoRtpSessionsArray[videoCHID].bufferingRtpData(a.data.rtspInterleave, a.data.header, a.data.payload)
}

function BufferFullCallback () {
  videoRtpSessionsArray[videoCHID].findCurrent(), sendMessage('stepPlay', 'BufferFull')
}

function RtpReturnCallback (a) {
  var b = null, c = null
  if (a === null || typeof a === 'undefined') return b = null, void (c = null)
  if (typeof a.error !== 'undefined' ? (sendMessage('error', a.error), b = a.decodedData) : (b = a.decodedData, a.decodeMode !== null && typeof a.decodeMode !== 'undefined' && (decodeMode = a.decodeMode, sendMessage('setVideoTagMode', a.decodeMode))), a.decodeStart != null && (sendMessage('DecodeStart', a.decodeStart), decodeMode = a.decodeStart.decodeMode), b !== null && typeof b !== 'undefined') {
    if (b.frameData !== null && decodeMode === 'canvas') {
      b.frameData.firstFrame === !0 && sendMessage('firstFrame', b.frameData.firstFrame)
      var d = {
        bufferIdx: b.frameData.bufferIdx,
        width: b.frameData.width,
        height: b.frameData.height,
        codecType: b.frameData.codecType,
        frameType: b.frameData.frameType,
        timeStamp: null
      }
      b.timeStamp !== null && typeof b.timeStamp !== 'undefined' && (d.timeStamp = b.timeStamp), sendMessage('videoInfo', d), typeof b.frameData.data !== 'undefined' && b.frameData.data !== null && sendMessage('canvasRender', b.frameData.data)
    } else if (b.frameData !== null && decodeMode === 'video') {
      b.initSegmentData !== null && (sendMessage('codecInfo', b.codecInfo), sendMessage('initSegment', b.initSegmentData))
      var d = {codecType: b.frameData.codecType}
      typeof b.frameData.width !== 'undefined' && (d.width = b.frameData.width, d.height = b.frameData.height), sendMessage('videoInfo', d), sendMessage('videoTimeStamp', b.timeStamp), b.frameData.length > 0 && (sendMessage('mediaSample', b.mediaSample), sendMessage('videoRender', b.frameData))
    } else sendMessage('drop', a.decodedData)
  }
  a.resolution != null && sendMessage('MSEResolutionChanged', a.resolution), a.ivsDraw != null && sendMessage('ivsDraw', a)
}

function sendMessage (a, b) {
  var c = {type: a, data: b, channelId: channelId}
  a === 'canvasRender' ? postMessage(c, [b.buffer]) : postMessage(c)
}

function VideoBufferList () {
  function a () {
    b = 360, c = 240, d = null, this._length = 0, this.head = null, this.tail = null, this.curIdx = 0
  }

  var b = 0, c = 0, d = null
  return a.prototype = {
    push: function (a, b, e, f, g, h) {
      var i = new VideoBufferNode(a, b, e, f, g, h)
      return this._length > 0 ? (this.tail.next = i, i.previous = this.tail, this.tail = i) : (this.head = i, this.tail = i), this._length += 1, d !== null && this._length >= c ? d() : 0, i
    },
    pop: function () {
      var a = null
      return this._length > 1 && (a = this.head, this.head = this.head.next, this.head !== null ? this.head.previous = null : this.tail = null, this._length -= 1), a
    },
    setMaxLength: function (a) {
      b = a, b > 360 ? b = 360 : b < 30 && (b = 30)
    },
    setBUFFERING: function (a) {
      c = a, c > 240 ? c = 240 : c < 6 && (c = 6)
    },
    setBufferFullCallback: function (a) {
      d = a
    },
    searchTimestamp: function (a) {
      var b = this.head, c = this._length, d = 1, e = {failure: 'Failure: non-existent node in this list.'}
      if (c === 0 || a <= 0 || b === null) throw new Error(e.failure)
      for (; b !== null && (b.timeStamp.timestamp !== a.timestamp || b.timeStamp.timestamp_usec !== a.timestamp_usec);) b = b.next, d++
      return d > c ? b = null : this.curIdx = d, b
    },
    findIFrame: function (a) {
      var b = this.head, c = this._length, d = 1, e = {failure: 'Failure: non-existent node in this list.'}
      if (c === 0) throw new Error(e.failure)
      for (; d < this.curIdx;) b = b.next, d++
      if (a === !0) for (; b.frameType !== 'I';) b = b.next, d++; else for (; b.frameType !== 'I';) b = b.previous, d--
      return d > c ? b = null : this.curIdx = d, b
    }
  }, new a()
}

importScripts('./public.js', './mp4remux.js', './h264Session.js', './Decode/h264Decoder.js', './h265Session.js', './Decode/h265Decoder.js', './mjpegSession.js', './Decode/MjpegDecoder.js', './ivsSession.js', './Decode/jsFFMPEG.js', './hashMap.js'), sendMessage('WorkerReady'), addEventListener('message', receiveMessage, !1)
var videoRtpSessionsArray = [], sdpInfo = null, rtpSession = null, decodeMode = '', isBackupCommand = !1,
  isStepPlay = !1, isForward = !0, framerate = 0, backupFrameInfo = null, videoCHID = -1, h264Session = null,
  h265Session = null, mjpegSession = null, ivsSession = null, channelId = null, dropout = 1
