window.onload = new Microphone()

function Microphone() {
  function init() {
    try {
      if (!navigator.getUserMedia) {
      navigator.getUserMedia = (navigator.getUserMedia ||
                                navigator.webkitGetUserMedia ||
                                navigator.mozGetUserMedia ||
                                navigator.msGetUserMedia)
      }  
        
      navigator.getUserMedia({audio: true}, success, error)
    } catch(e) {
      alert('getUserMedia is not supported in your browser.')
    }
  }

  function success(stream) {
    var bufferSize = 2048

    audioContext = window.AudioContext || window.webkitAudioContext
    context = new audioContext()
    audioInput = context.createMediaStreamSource(stream)
    analyser = context.createAnalyser()
    analyser.fftSize = bufferSize
    audioInput.connect(analyser)
    recorder = context.createJavaScriptNode(bufferSize, 2, 2)

    recorder.onaudioprocess = function(e) {
      // var channelData = e.inputBuffer.getChannelData(0)
      console.log('success')
    }

    recorder.connect(context.destination)
  }

  function error(err) {
    console.log('The following error occurred: ' + err)
  }

  init()
}