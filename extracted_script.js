
// =============================================================================
// STATE
// =============================================================================
const state = { world: 'paper', entered: false, reducedMotion: false };

// =============================================================================
// SOUND ENGINE
// =============================================================================
let audioCtx = null;
const sound = {};

sound.init = function() {
  if (audioCtx) return;
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  } catch(e) {}
};

sound._tone = function(freq, type, start, dur) {
  if (!audioCtx) return;
  try {
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.connect(g);
    g.connect(audioCtx.destination);
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(.25, audioCtx.currentTime + start);
    g.gain.exponentialRampToValueAtTime(.001, audioCtx.currentTime + start + dur);
    o.start(audioCtx.currentTime + start);
    o.stop(audioCtx.currentTime + start + dur + .05);
  } catch(e) {}
};

sound._noise = function(dur) {
  if (!audioCtx) return;
  try {
    const buf = audioCtx.createBuffer(1, Math.floor(audioCtx.sampleRate * dur), audioCtx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1);
    const src = audioCtx.createBufferSource();
    src.buffer = buf;
    src.connect(audioCtx.destination);
    src.start();
  } catch(e) {}
};

sound.play = function(name) {
  sound.init();
  if (!audioCtx) return;
  try {
    switch(name) {
      case 'sparkle':
        sound._tone(1047, 'sine', 0, .08);
        break;
      case 'happy':
        [523, 659, 784, 1047].forEach(function(f, i) { sound._tone(f, 'sine', i * .1, .2); });
        break;
      case 'enter':
        [523, 659, 784].forEach(function(f, i) { sound._tone(f, 'sine', i * .08, .15); });
        break;
      case 'twinkle':
        [392,392,392,392,523,659,784,659,880,880,880,880,784,698,659,523,784,784,784,784,698,659,523,659,659,659,659,523,392,440,523,392].forEach(function(f, i) { sound._tone(f, 'sine', i * .22, .2); });
        break;
      case 'snap':
        sound._noise(.05);
        break;
      case 'boot':
        sound._tone(330, 'sine', 0, .3);
        break;
      case 'chaos':
        [880, 784, 659, 523, 440, 392, 330, 262].forEach(function(f, i) { sound._tone(f, 'sine', i * .07, .12); });
        break;
      case 'err':
        sound._tone(150, 'sawtooth', 0, .2);
        break;
    }
  } catch(e) {}
};

// =============================================================================
// CELEBRATION HELPERS
// =============================================================================
const CONFETTI_COLORS = ['#ff6b6b','#ffb347','#ffff66','#69ff66','#66c8ff','#c866ff','#ff66c8'];

function confettiBurst() {
  if (state.reducedMotion) return;
  var c = document.getElementById('confetti-container');
  if (!c) return;
  var i;
  for (i = 0; i < 50; i++) {
    var p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.left = Math.random() * 100 + '%';
    p.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    p.style.animationDuration = (2 + Math.random() * 2) + 's';
    p.style.animationDelay = Math.random() * .5 + 's';
    c.appendChild(p);
    setTimeout(function(el) { return function() { el.remove(); }; }(p), 4000);
  }
}

function sparkleBurst(x, y, count) {
  count = count || 12;
  if (state.reducedMotion) return;
  var container = document.createElement('div');
  container.style.cssText = 'position:fixed;left:' + x + 'px;top:' + y + 'px;pointer-events:none;z-index:9997';
  document.body.appendChild(container);
  var i;
  for (i = 0; i < count; i++) {
    var s = document.createElement('div');
    var angle = (i / count) * Math.PI * 2;
    var dist = 30 + Math.random() * 40;
    var size = 6 + Math.random() * 8;
    s.className = 'sparkle';
    s.textContent = ['✦','✧','⋆','✶','✷'][Math.floor(Math.random() * 5)];
    s.style.cssText = 'left:' + Math.cos(angle) * dist + 'px;top:' + Math.sin(angle) * dist + 'px;font-size:' + size + 'px;color:' + CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)] + ';position:absolute';
    container.appendChild(s);
  }
  setTimeout(function() { container.remove(); }, 700);
}

function emojiBurst(x, y, emoji) {
  if (state.reducedMotion) return;
  var el = document.createElement('div');
  el.className = 'emoji-float';
  el.textContent = emoji;
  el.style.cssText = 'left:' + x + 'px;top:' + y + 'px;font-size:32px';
  document.body.appendChild(el);
  setTimeout(function() { el.remove(); }, 1500);
}

function emojiCascade(container, emojis) {
  if (state.reducedMotion) return;
  emojis = emojis || ['🎉','⭐','💖','🌟','🎊','✨','💫','🔥'];
  var i;
  for (i = 0; i < 8; i++) {
    (function(index) {
      setTimeout(function() {
        var x = Math.random() * window.innerWidth;
        var y = window.innerHeight * (0.3 + Math.random() * 0.4);
        emojiBurst(x, y, emojis[Math.floor(Math.random() * emojis.length)]);
      }, index * 120);
    })(i);
  }
}

function sparkleAt(el) {
  if (!el || state.reducedMotion) return;
  var r = el.getBoundingClientRect();
  sparkleBurst(r.left + r.width / 2, r.top + r.height / 2, 10);
}

function bounceEl(el) {
  if (!el) return;
  el.classList.remove('bounce');
  void el.offsetWidth;
  el.classList.add('bounce');
  setTimeout(function() { el.classList.remove('bounce'); }, 350);
}

// =============================================================================
// FULLSCREEN
// =============================================================================
function tryFullscreen() {
  try {
    var el = document.documentElement;
    var vendors = [
      el.requestFullscreen && el.requestFullscreen(),
      el.webkitRequestFullscreen && el.webkitRequestFullscreen(),
      el.mozRequestFullScreen && el.mozRequestFullScreen(),
      el.msRequestFullscreen && el.msRequestFullscreen()
    ];
    var i, f;
    for (i = 0; i < vendors.length; i++) {
      f = vendors[i];
      if (f) { f.catch(function() {}); break; }
    }
  } catch(e) {}
}

// =============================================================================
// NAVIGATION
// =============================================================================
function switchWorld(world) {
  document.querySelectorAll('.world').forEach(function(w) { w.classList.remove('active'); });
  document.querySelectorAll('.chrome-tab').forEach(function(t) { t.classList.remove('active'); });
  document.querySelectorAll('.bar-btn').forEach(function(b) { b.classList.remove('active'); });
  var w = document.getElementById(world + '-world');
  if (w) w.classList.add('active');
  var t = document.getElementById('tab-' + world);
  if (t) t.classList.add('active');
  var b = document.getElementById('bar-' + world);
  if (b) b.classList.add('active');
  state.world = world;
  if (world === 'terminal') { initTerminal(); }
  else if (world === 'call') { initCall(); }
  else if (world === 'paper') { initDocs(); }
}

function goTo(world) {
  try { sound.play('sparkle'); } catch(e) {}
  switchWorld(world);
}

function doEnter() {
  try { sound.play('happy'); } catch(e) {}
  var home = document.getElementById('home-screen');
  if (home) home.style.display = 'none';
  var frame = document.getElementById('chrome-frame');
  if (frame) frame.classList.add('visible');
  sparkleBurst(window.innerWidth / 2, window.innerHeight / 2, 20);
  confettiBurst();
  try { tryFullscreen(); } catch(e) {}
  state.entered = true;
  switchWorld('paper');
}

// =============================================================================
// DOCS WORLD
// =============================================================================
function initDocs() {
  var canvas = document.getElementById('paper-canvas');
  if (!canvas) return;
  canvas.oninput = function() {
    try { sound.play('sparkle'); } catch(e) {}
  };
}

function formatDoc(cmd, val) {
  try {
    sound.play('sparkle');
    document.execCommand(cmd, false, val || null);
    bounceEl(document.querySelector('.paper-toolbar'));
    sparkleAt(document.querySelector('.paper-canvas'));
  } catch(e) {}
}

// =============================================================================
// TERMINAL WORLD
// =============================================================================
function initTerminal() {
  var hidden = document.getElementById('term-input-hidden');
  var display = document.getElementById('term-input-display');
  if (!hidden || !display) return;
  hidden.value = '';
  display.textContent = '';
  hidden.focus();
  hidden.oninput = function() {
    display.textContent = hidden.value;
    try { sound.play('sparkle'); } catch(e) {}
    sparkleBurst(window.innerWidth / 2, window.innerHeight / 2, 4);
  };
  hidden.onkeydown = function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      var cmd = hidden.value.trim();
      hidden.value = '';
      display.textContent = '';
      if (!cmd) return;
      try { sound.play('enter'); } catch(e) {}
      addTermLine('❯ ' + cmd, 't-cmd');
      runCmd(cmd, true);
      sparkleBurst(window.innerWidth / 2, window.innerHeight / 2, 15);
    } else if (e.key === 'Escape') {
      hidden.value = '';
      display.textContent = '';
    }
  };
  var output = document.getElementById('term-output');
  if (output) {
    output.onclick = function() { hidden.focus(); };
  }
  addTermLine('Type a command or tap a card below!', 'term-idle');
}

function addTermLine(text, cls) {
  cls = cls || 't-ok';
  var out = document.getElementById('term-output');
  if (!out) return;
  var idle = out.querySelector('.term-idle');
  if (idle) idle.remove();
  var d = document.createElement('div');
  d.className = 'term-line ' + cls;
  d.textContent = text;
  out.appendChild(d);
  out.scrollTop = out.scrollHeight;
}

var COMMANDS = {
  ping: function() {
    addTermLine('Pinging google.com... 64bytes: time=12ms');
    setTimeout(function() { addTermLine('64bytes from google.com: seq=1 ttl=64'); }, 600);
    setTimeout(function() { addTermLine('--- google.com ping stats ---'); }, 1200);
    setTimeout(function() { addTermLine('1 packets transmitted, 1 received, 0% packet loss'); }, 1300);
  },
  deploy: function() {
    addTermLine('Deploying to production...');
    ['Compiling assets...', 'Uploading files...', 'Restarting servers...', '✅ Deployed!'].forEach(function(m, i) {
      setTimeout(function() { addTermLine(m); }, i * 500);
    });
  },
  backup: function() {
    addTermLine('Starting backup...');
    ['✔ Saved: database.sql', '✔ Saved: config.json', '✔ Saved: uploads/'].forEach(function(m, i) {
      setTimeout(function() { addTermLine(m, 't-ok'); }, i * 400);
    });
  },
  neofetch: function() {
    var now = new Date();
    addTermLine('        _____  ', 't-cmd');
    addTermLine('       /     \\ ', 't-cmd');
    addTermLine('      | () () | ', 't-cmd');
    addTermLine('       \\  ^  /  ', 't-cmd');
    addTermLine('        |||||   ', 't-cmd');
    addTermLine('   OS: ClicketyOS 1.0', 't-ok');
    addTermLine('   User: little-hacker', 't-ok');
    addTermLine('   Time: ' + now.toLocaleTimeString(), 't-ok');
  },
  colorbomb: function() {
    addTermLine('💥 BOOM! BOOM! BOOM! 💥', 't-ok');
    var i;
    for (i = 0; i < 80; i++) {
      (function(index) {
        setTimeout(function() {
          sparkleBurst(Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.6, 5);
          var emojis = ['🎉','⭐','💖','🌟','🎊','✨','💫','🔥'];
          emojiBurst(Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.5, emojis[Math.floor(Math.random() * emojis.length)]);
        }, index * 40);
      })(i);
    }
    setTimeout(function() { confettiBurst(); }, 200);
  },
  matrix: function() {
    addTermLine('Initiating matrix protocol...', 't-ok');
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    var count = 0;
    var iv = setInterval(function() {
      var line = '';
      var j;
      for (j = 0; j < 40; j++) { line += chars[Math.floor(Math.random() * chars.length)]; }
      addTermLine(line, 't-cmd');
      count++;
      if (count > 12) {
        clearInterval(iv);
        addTermLine('Matrix complete. You are the one.', 't-ok');
      }
    }, 200);
  },
  hack: function() {
    addTermLine('Hacking the mainframe...', 't-ok');
    setTimeout(function() { addTermLine('Bypassing firewall...', 't-cmd'); }, 300);
    setTimeout(function() { addTermLine('Injecting payload...', 't-cmd'); }, 700);
    setTimeout(function() { addTermLine('Root access GRANTED!', 't-ok'); confettiBurst(); }, 1100);
  },
  virus: function() {
    addTermLine('⚠️ WARNING: Virus detected!', 't-err');
    setTimeout(function() { addTermLine('Scanning...  ██████████ 100%', 't-cmd'); }, 400);
    setTimeout(function() {
      addTermLine('Virus removed! System clean.', 't-ok');
      try { sound.play('happy'); } catch(e) {}
    }, 900);
  }
};

function runCmd(cmd, fromTyping) {
  var c = cmd.toLowerCase().trim();
  if (COMMANDS[c]) {
    try { sound.play('happy'); } catch(e) {}
    if (!fromTyping) { addTermLine('❯ ' + cmd, 't-cmd'); }
    COMMANDS[c]();
  } else if (c) {
    try { sound.play('err'); } catch(e) {}
    addTermLine('Command not found: ' + cmd + ' — try ping, deploy, hack, virus!', 't-err');
  }
}

// =============================================================================
// MEET WORLD
// =============================================================================
var micOn = false, camOn = false, handUp = false;
var callInterval = null;

function initCall() {
  try { sound.play('happy'); } catch(e) {}
  sparkleBurst(window.innerWidth / 2, window.innerHeight / 2, 25);
  confettiBurst();
  var tiles = document.querySelectorAll('.meet-tile');
  if (tiles.length && !callInterval) {
    var idx = 0;
    callInterval = setInterval(function() {
      tiles.forEach(function(t) { t.classList.remove('speaking'); });
      tiles[idx % tiles.length].classList.add('speaking');
      idx++;
    }, 2200);
  }
}

function reactEmoji(emoji) {
  try { sound.play('happy'); sparkleBurst(window.innerWidth / 2, window.innerHeight / 2, 15); confettiBurst(); } catch(e) {}
  var emojis = ['🎉','⭐','💖','🌟','🎊'];
  var i;
  for (i = 0; i < 5; i++) {
    (function(index) {
      setTimeout(function() {
        emojiBurst(
          window.innerWidth * (0.2 + Math.random() * 0.6),
          window.innerHeight * (0.3 + Math.random() * 0.4),
          emojis[index]
        );
      }, index * 100);
    })(i);
  }
}

function toggleMic() {
  micOn = !micOn;
  try { sound.play('snap'); } catch(e) {}
  var btn = document.getElementById('mic-btn');
  if (btn) {
    btn.classList.toggle('on', micOn);
    btn.style.background = micOn ? '#27c93f' : '#3d3d3d';
    bounceEl(btn);
    sparkleAt(btn);
  }
}

function toggleCam() {
  camOn = !camOn;
  try { sound.play('sparkle'); } catch(e) {}
  var btn = document.getElementById('cam-btn');
  if (btn) {
    btn.classList.toggle('on', camOn);
    btn.style.background = camOn ? '#27c93f' : '#3d3d3d';
    bounceEl(btn);
    sparkleAt(btn);
  }
}

function toggleShare() {
  try { sound.play('happy'); } catch(e) {}
  sparkleBurst(window.innerWidth / 2, window.innerHeight / 2, 30);
  confettiBurst();
  var btn = document.getElementById('share-btn');
  if (btn) { bounceEl(btn); sparkleAt(btn); }
}

function toggleHand() {
  handUp = !handUp;
  try { sound.play('enter'); } catch(e) {}
  var btn = document.getElementById('hand-btn');
  if (btn) {
    btn.classList.toggle('on', handUp);
    btn.style.background = handUp ? '#f0ad4e' : '#3d3d3d';
    bounceEl(btn);
    sparkleAt(btn);
  }
}

// =============================================================================
// EVENT DELEGATION — set up after DOM ready
// =============================================================================
function setupEventListeners() {
  // Detect reduced motion preference
  state.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Home enter button
  var homeBtn = document.getElementById('home-enter-btn');
  if (homeBtn) {
    homeBtn.addEventListener('click', function() {
      doEnter();
    });
  }

  // Theme pills
  var chromePill = document.getElementById('pill-chrome');
  if (chromePill) {
    chromePill.addEventListener('click', function() {
      try { sound.play('sparkle'); } catch(e) {}
      document.querySelectorAll('.home-pill').forEach(function(p) { p.classList.remove('active'); });
      chromePill.classList.add('active');
    });
  }
  var spacePill = document.getElementById('pill-space');
  if (spacePill) {
    spacePill.addEventListener('click', function() {
      try { sound.play('sparkle'); } catch(e) {}
      document.querySelectorAll('.home-pill').forEach(function(p) { p.classList.remove('active'); });
      spacePill.classList.add('active');
    });
  }

  // Tab buttons
  var tabPaper = document.getElementById('tab-paper');
  if (tabPaper) { tabPaper.addEventListener('click', function() { goTo('paper'); }); }
  var tabTerminal = document.getElementById('tab-terminal');
  if (tabTerminal) { tabTerminal.addEventListener('click', function() { goTo('terminal'); }); }
  var tabCall = document.getElementById('tab-call');
  if (tabCall) { tabCall.addEventListener('click', function() { goTo('call'); }); }

  // Dock bar buttons
  var barPaper = document.getElementById('bar-paper');
  if (barPaper) { barPaper.addEventListener('click', function() { goTo('paper'); }); }
  var barTerminal = document.getElementById('bar-terminal');
  if (barTerminal) { barTerminal.addEventListener('click', function() { goTo('terminal'); }); }
  var barCall = document.getElementById('bar-call');
  if (barCall) { barCall.addEventListener('click', function() { goTo('call'); }); }

  // Paper toolbar buttons (delegated)
  var toolbar = document.querySelector('.paper-toolbar');
  if (toolbar) {
    toolbar.addEventListener('click', function(e) {
      var btn = e.target.closest('.p-tool');
      if (!btn) return;
      var cmd = btn.getAttribute('data-cmd');
      var val = btn.getAttribute('data-val');
      if (cmd) formatDoc(cmd, val);
    });
  }

  // Terminal command cards (delegated)
  var termCmds = document.getElementById('term-commands');
  if (termCmds) {
    termCmds.addEventListener('click', function(e) {
      var card = e.target.closest('.cmd-card');
      if (!card) return;
      var cmd = card.getAttribute('data-cmd');
      if (cmd) {
        try { sound.play('happy'); } catch(err) {}
        bounceEl(card);
        sparkleBurst(window.innerWidth / 2, window.innerHeight / 2, 12);
        addTermLine('❯ ' + cmd, 't-cmd');
        runCmd(cmd, true);
      }
    });
  }

  // Meet emoji buttons (delegated)
  var emojiBar = document.querySelector('.meet-emoji-bar');
  if (emojiBar) {
    emojiBar.addEventListener('click', function(e) {
      var btn = e.target.closest('.emoji-btn');
      if (!btn) return;
      var emoji = btn.getAttribute('data-emoji');
      if (emoji) reactEmoji(emoji);
    });
  }

  // Meet control buttons
  var micBtn = document.getElementById('mic-btn');
  if (micBtn) { micBtn.addEventListener('click', function() { toggleMic(); }); }
  var camBtn = document.getElementById('cam-btn');
  if (camBtn) { camBtn.addEventListener('click', function() { toggleCam(); }); }
  var shareBtn = document.getElementById('share-btn');
  if (shareBtn) { shareBtn.addEventListener('click', function() { toggleShare(); }); }
  var handBtn = document.getElementById('hand-btn');
  if (handBtn) { handBtn.addEventListener('click', function() { toggleHand(); }); }
}

// =============================================================================
// INIT
// =============================================================================
document.addEventListener('DOMContentLoaded', function() {
  setupEventListeners();
  // Auto-enter after 600ms for demo (remove for production)
  setTimeout(function() {
    doEnter();
  }, 600);
});
