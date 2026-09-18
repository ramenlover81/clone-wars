(function () {
  let audio = null;
  function getAudio() {
    if (!audio) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      audio = new AudioCtx();
    }
    if (audio.state === 'suspended') audio.resume();
    return audio;
  }

  function tone(context, start, frequency, endFrequency, duration, gainAmount, type) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    oscillator.frequency.exponentialRampToValueAtTime(endFrequency, start + duration);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(gainAmount, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + duration);
  }

  window.SOUNDS = {
    flap: function () {
      try {
        const context = getAudio();
        if (!context) return;
        const start = context.currentTime;
        tone(context, start, 420, 610, 0.07, 0.12, 'triangle');
        tone(context, start + 0.075, 610, 790, 0.07, 0.1, 'sine');
      } catch (error) { }
    },
    score: function () {
      try {
        const context = getAudio();
        if (!context) return;
        const start = context.currentTime;
        tone(context, start, 500, 710, 0.1, 0.1, 'triangle');
        tone(context, start + 0.1, 680, 920, 0.13, 0.13, 'sine');
      } catch (error) { }
    },
    crash: function () {
      try {
        const context = getAudio();
        if (!context) return;
        const start = context.currentTime;
        tone(context, start, 260, 145, 0.18, 0.16, 'triangle');
        tone(context, start + 0.22, 210, 95, 0.22, 0.15, 'triangle');
      } catch (error) { }
    }
  };
})();
