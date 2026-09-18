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
        tone(context, start, 250, 430, 0.12, 0.11, 'sine');
        tone(context, start + 0.025, 510, 630, 0.09, 0.045, 'triangle');
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
        tone(context, start, 220, 70, 0.28, 0.15, 'sawtooth');
        tone(context, start + 0.035, 130, 48, 0.23, 0.07, 'triangle');
      } catch (error) { }
    }
  };
})();
