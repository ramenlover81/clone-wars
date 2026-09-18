(function () {
  'use strict';

  function drawBackground(ctx, width, height, time) {
    ctx.save();
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#24124b');
    sky.addColorStop(0.55, '#72264e');
    sky.addColorStop(1, '#e04b35');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(255, 174, 84, 0.22)';
    ctx.beginPath();
    ctx.arc(width * 0.76, height * 0.22, 62, 0, Math.PI * 2);
    ctx.fill();

    const drift = (time * 10) % 28;
    ctx.fillStyle = 'rgba(255, 130, 75, 0.22)';
    for (let i = -1; i < 5; i += 1) {
      ctx.beginPath();
      ctx.ellipse(i * 105 + drift, height * 0.61, 90, 14, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#301c36';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.69);
    ctx.lineTo(44, height * 0.49);
    ctx.lineTo(80, height * 0.67);
    ctx.lineTo(130, height * 0.44);
    ctx.lineTo(180, height * 0.69);
    ctx.lineTo(235, height * 0.52);
    ctx.lineTo(290, height * 0.68);
    ctx.lineTo(width, height * 0.48);
    ctx.lineTo(width, height * 0.82);
    ctx.lineTo(0, height * 0.82);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawGround(ctx, width, height, groundHeight, offset) {
    ctx.save();
    const top = height - groundHeight;
    ctx.fillStyle = '#24152a';
    ctx.fillRect(0, top, width, groundHeight);
    ctx.strokeStyle = '#ff7a45';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, top + 4);
    ctx.lineTo(width, top + 4);
    ctx.stroke();
    const shift = -(offset % 36);
    ctx.strokeStyle = '#8b3341';
    ctx.lineWidth = 4;
    for (let x = shift; x < width + 36; x += 36) {
      ctx.beginPath();
      ctx.moveTo(x, top + 10);
      ctx.lineTo(x + 14, height);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawBird(ctx, x, y, size, velocity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.max(-0.35, Math.min(0.48, velocity / 1050)));
    const s = size / 34;
    ctx.scale(s, s);
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#120d25';
    ctx.lineWidth = 3;
    // An original twin-fish plush: one red fish, one green fish, under a dark hood.
    ctx.fillStyle = '#24203a';
    ctx.beginPath();
    ctx.arc(0, 0, 16, Math.PI, 0);
    ctx.lineTo(14, 13);
    ctx.lineTo(-14, 13);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#e9525b';
    ctx.beginPath();
    ctx.ellipse(-6, 3, 9, 6, 0, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#72c967';
    ctx.beginPath();
    ctx.ellipse(6, 3, 9, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#fff4db';
    ctx.beginPath();
    ctx.arc(-8, 1, 2, 0, Math.PI * 2);
    ctx.arc(4, 1, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#bca6e8';
    ctx.fillRect(-12, 12, 24, 3);
    ctx.restore();
  }

  function drawPipe(ctx, x, gapTop, gapBottom, pipeWidth, height) {
    ctx.save();
    function gate(y, h, pointsDown) {
      const glow = ctx.createLinearGradient(x, 0, x + pipeWidth, 0);
      glow.addColorStop(0, '#5b20a3');
      glow.addColorStop(0.48, '#e8baff');
      glow.addColorStop(1, '#6d20bb');
      ctx.fillStyle = glow;
      ctx.strokeStyle = '#160c27';
      ctx.lineWidth = 3;
      ctx.fillRect(x, y, pipeWidth, h);
      ctx.strokeRect(x, y, pipeWidth, h);
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.fillRect(x + pipeWidth * 0.43, y, pipeWidth * 0.14, h);
      ctx.strokeStyle = '#b65cff';
      ctx.lineWidth = 2;
      for (let stripe = y + 14; stripe < y + h; stripe += 22) {
        ctx.beginPath();
        ctx.moveTo(x + 5, stripe);
        ctx.lineTo(x + pipeWidth - 5, stripe + (pointsDown ? 7 : -7));
        ctx.stroke();
      }
    }
    gate(0, gapTop, true);
    gate(gapBottom, height - gapBottom, false);
    ctx.restore();
  }

  window.SPRITES = { drawBackground, drawGround, drawBird, drawPipe };
}());
