var levels = [
  {
    id: 1,
    title: "ABOUT THE PLAYER",
    teaser: "Load character profile.",
    eyebrow: "CHARACTER SELECT",
    body:
      '<p>Second-year B.Tech CSE (AI &amp; ML) student, currently grinding through DSA, hackathons, and open-source programs to level up toward a software engineering internship.</p>' +
      '<p>Off-screen: stress-coding LeetCode problems, binge-watching a new show every other week, collecting Pinterest boards for design inspiration, and falling down wikisurfing rabbit holes — emperors, true crime, unsolved murder mysteries, all of it.</p>',
    tags: ["Builder", "Debugger", "Python", "Frontend Developer"]
  },
  {
    id: 2,
    title: "SKILL TREE",
    teaser: "View equipped abilities.",
    eyebrow: "CHARACTER STATS",
    body: '<p>Abilities unlocked so far:</p>',
    bars: [
      { label: "JavaScript / React", value: 70 },
      { label: "Python", value: 60 },
      { label: "DSA (C++/Python)", value: 50 },
      { label: "SQL", value: 65 },
      { label: "OpenCV (in progress)", value: 35 }
    ]
  },
  {
    id: 3,
    title: "PROJECT: AMAZON CLONE",
    teaser: "Enter the e-commerce dungeon.",
    eyebrow: "SIDE QUEST — WORLD 1",
    body:
      '<p>Rebuilt Amazon\'s storefront from scratch in React — sticky navbar, rotating hero banner, product grids, and a full multi-column footer — to reverse-engineer how a real e-commerce site is put together, piece by piece.</p>',
    tags: ["React", "Deployed on GitHub Pages"],
    links: [
      { label: "View Live ↗", href: "https://kavishasri07.github.io/Amazon-Clone" },
      { label: "Source Code ↗", href: "https://github.com/kavishasri07/Amazon-Clone7" }
    ]
  },
  {
    id: 4,
    title: "PROJECT: SPENDSMART",
    teaser: "Boss fight: manage a budget.",
    eyebrow: "HACKATHON BUILD",
    body:
      '<p>An AI-assisted expense tracker built for a hackathon. Log an expense in plain language, and it auto-categorizes spending, visualizes habits, and answers budget questions through a Gemini-powered chat layer.</p>',
    tags: ["React", "Tailwind CSS", "Flask", "Firebase", "Gemini API"],
    links: [
      { label: "Source Code ↗", href: "https://github.com/kavishasri07" }
    ]
  },
  {
    id: 5,
    title: "PROJECT: H&M CLONE",
    teaser: "Loot the fashion aisle.",
    eyebrow: "SIDE QUEST — WORLD 2",
    body:
      '<p>A front-end clone of the H&amp;M e-commerce UI — practicing responsive grids, product cards, and clean navigation patterns outside of a plain to-do-list comfort zone.</p>',
    tags: ["HTML", "CSS", "JavaScript"],
    links: [
      { label: "View Live ↗", href: "https://kavishasri07.github.io/H-M-Clone/" },
      { label: "Source Code ↗", href: "https://github.com/kavishasri07/H-M-Clone" }
    ]
  },
  {
    id: 6,
    title: "LEADERBOARD",
    teaser: "Check competitive rankings.",
    eyebrow: "ARENA STATS",
    body: '<p>Grinding DSA daily across two platforms:</p>',
    tags: [
      "CodeChef: 380+ solved · Rating 903 · Silver Streak",
      "LeetCode: 65+ solved · DP, Binary Search, Arrays, Two Pointers, Hash Tables"
    ]
  },
  {
    id: 7,
    title: "FINAL BOSS",
    teaser: "One message could change everything.",
    eyebrow: "WORLD 7 — LAST STAND",
    body: '<p>You\'ve reached the end of the map. Send a message to continue the story.</p>',
    isContact: true,
    links: [
      { label: "GitHub ↗", href: "https://github.com/kavishasri07" },
      { label: "LinkedIn ↗", href: "#" },
      { label: "Email ↗", href: "mailto:kavishasri07@gmail.com" }
    ]
  }
];

var unlocked = 1;
var totalLevels = levels.length;
var clearedList = []; 

var pathWrap = document.getElementById('pathWrap');
var overlay = document.getElementById('overlay');
var panelEl = document.getElementById('panel');
var scoreDisplay = document.getElementById('scoreDisplay');

function isCleared(id) {
  var i;
  for (i = 0; i < clearedList.length; i++) {
    if (clearedList[i] === id) {
      return true;
    }
  }
  return false;
}

function addCleared(id) {
  if (!isCleared(id)) {
    clearedList.push(id);
  }
}

function padNumber(num) {
  var text = String(num);
  if (text.length < 2) {
    text = '0' + text;
  }
  return text;
}

function renderMap() {
  pathWrap.innerHTML = '';

  var i;
  for (i = 0; i < levels.length; i++) {
    var lvl = levels[i];

    var row = document.createElement('div');
    if (i % 2 === 0) {
      row.className = 'node-row left';
    } else {
      row.className = 'node-row right';
    }

    var dot = document.createElement('div');
    var dotClass = 'dot';
    if (isCleared(lvl.id)) {
      dotClass = dotClass + ' lit';
    } else if (lvl.id === unlocked) {
      dotClass = dotClass + ' now';
    }
    dot.className = dotClass;
    row.appendChild(dot);

    var isLocked = lvl.id > unlocked;
    var isCurrent = (lvl.id === unlocked) && !isCleared(lvl.id);

    var node = document.createElement('div');
    var nodeClass = 'node ';
    if (isLocked) {
      nodeClass = nodeClass + 'locked';
    } else {
      nodeClass = nodeClass + 'unlocked';
    }
    if (isCurrent) {
      nodeClass = nodeClass + ' current';
    }
    node.className = nodeClass;

    var badgeHtml = '';
    if (isLocked) {
      badgeHtml = '<span class="lock-icon">🔒</span>';
    } else if (isCleared(lvl.id)) {
      badgeHtml = '<span class="done-badge">CLEAR</span>';
    }

    node.innerHTML =
      '<span class="lvl-num pixel">LVL ' + padNumber(lvl.id) + '</span>' +
      '<h3>' + lvl.title + '</h3>' +
      '<p>' + lvl.teaser + '</p>' +
      badgeHtml;

    if (!isLocked) {
      attachOpenClick(node, lvl);
    }

    row.appendChild(node);
    pathWrap.appendChild(row);
  }

  scoreDisplay.textContent = 'LEVELS CLEARED: ' + clearedList.length + ' / ' + totalLevels;
}

function attachOpenClick(node, lvl) {
  node.addEventListener('click', function () {
    openLevel(lvl);
  });
}

function openLevel(lvl) {
  var i;

  var barsHtml = '';
  if (lvl.bars) {
    for (i = 0; i < lvl.bars.length; i++) {
      var b = lvl.bars[i];
      barsHtml = barsHtml +
        '<div class="stat-bar">' +
          '<div class="label"><span>' + b.label + '</span><span>' + b.value + '%</span></div>' +
          '<div class="bar-track"><div class="bar-fill" style="width:' + b.value + '%"></div></div>' +
        '</div>';
    }
  }

  var tagsHtml = '';
  if (lvl.tags) {
    var chipsHtml = '';
    for (i = 0; i < lvl.tags.length; i++) {
      chipsHtml = chipsHtml + '<span class="tag-chip">' + lvl.tags[i] + '</span>';
    }
    tagsHtml = '<div class="tags">' + chipsHtml + '</div>';
  }

  var linksHtml = '';
  if (lvl.links) {
    var linksInner = '';
    for (i = 0; i < lvl.links.length; i++) {
      var link = lvl.links[i];
      var isMail = link.href.indexOf('mailto:') === 0;
      var attrs = '';
      if (!isMail) {
        attrs = ' target="_blank" rel="noopener"';
      }
      linksInner = linksInner + '<a href="' + link.href + '"' + attrs + '>' + link.label + '</a>';
    }
    linksHtml = '<div class="link-row">' + linksInner + '</div>';
  }

  var contactHtml = '';
  if (lvl.isContact) {
    contactHtml =
      '<div class="form-row">' +
        '<label>YOUR NAME</label>' +
        '<input type="text" id="cName" placeholder="Player two...">' +
      '</div>' +
      '<div class="form-row">' +
        '<label>YOUR EMAIL</label>' +
        '<input type="email" id="cEmail" placeholder="you@company.com">' +
      '</div>' +
      '<div class="form-row">' +
        '<label>MESSAGE</label>' +
        '<textarea id="cMsg" placeholder="Let\'s talk opportunities..."></textarea>' +
      '</div>';
  }

  var alreadyCleared = isCleared(lvl.id);

  var buttonText;
  if (alreadyCleared) {
    buttonText = '✓ LEVEL CLEARED';
  } else if (lvl.isContact) {
    buttonText = 'SEND & FINISH GAME';
  } else {
    buttonText = 'MARK LEVEL COMPLETE →';
  }

  var disabledAttr = '';
  if (alreadyCleared) {
    disabledAttr = 'disabled';
  }

  panelEl.innerHTML =
    '<button class="close" aria-label="Close">✕</button>' +
    '<div class="eyebrow pixel">' + lvl.eyebrow + '</div>' +
    '<h2 class="pixel brush">' + lvl.title + '</h2>' +
    '<div class="body">' +
      lvl.body +
      barsHtml +
      tagsHtml +
      contactHtml +
      linksHtml +
    '</div>' +
    '<button class="complete-btn" id="completeBtn" ' + disabledAttr + '>' + buttonText + '</button>';

  overlay.classList.add('show');

  var closeBtn = panelEl.querySelector('.close');
  closeBtn.addEventListener('click', closeLevel);

  var completeBtn = document.getElementById('completeBtn');

  if (!alreadyCleared) {
    completeBtn.addEventListener('click', function () {
      handleCompleteClick(lvl, completeBtn);
    });
  }
}

function handleCompleteClick(lvl, completeBtn) {
  if (lvl.isContact) {
    sendContactForm(lvl, completeBtn);
    return;
  }

  addCleared(lvl.id);
  if (lvl.id === unlocked && unlocked < totalLevels) {
    unlocked = lvl.id + 1;
  }
  closeLevel();
  renderMap();
  showToast('Level ' + lvl.id + ' cleared! Next level unlocked.');
}

function sendContactForm(lvl, completeBtn) {
  var name = document.getElementById('cName').value.trim();
  var email = document.getElementById('cEmail').value.trim();
  var message = document.getElementById('cMsg').value.trim();

  if (!name || !email || !message) {
    showToast('Fill in name, email, and message to finish the game!');
    return;
  }

  completeBtn.disabled = true;
  completeBtn.textContent = 'SENDING...';

  var formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('message', message);

  fetch('https://formspree.io/f/xaqrwebl', {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: formData
  })
    .then(function (res) {
      if (res.ok) {
        finishContactLevel(lvl);
      } else {
        completeBtn.disabled = false;
        completeBtn.textContent = 'SEND & FINISH GAME';
        showToast('Something went wrong — try again?');
      }
    })
    .catch(function () {
      completeBtn.disabled = false;
      completeBtn.textContent = 'SEND & FINISH GAME';
      showToast('Network error — try again?');
    });
}

function finishContactLevel(lvl) {
  addCleared(lvl.id);
  if (lvl.id === unlocked && unlocked < totalLevels) {
    unlocked = lvl.id + 1;
  }
  closeLevel();
  renderMap();
  showToast('Message sent — thanks for playing!');
}

function closeLevel() {
  overlay.classList.remove('show');
}

overlay.addEventListener('click', function (e) {
  if (e.target === overlay) {
    closeLevel();
  }
});

function showToast(msg) {
  var toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(function () {
    toast.classList.remove('show');
  }, 2600);
}

document.getElementById('startBtn').addEventListener('click', function () {
  document.getElementById('boot').style.opacity = '0';
  setTimeout(function () {
    document.getElementById('boot').style.display = 'none';
    document.getElementById('map').style.display = 'block';
  }, 500);
});

document.getElementById('backBtn').addEventListener('click', function () {
  document.getElementById('map').style.display = 'none';
  var boot = document.getElementById('boot');
  boot.style.display = 'flex';
  requestAnimationFrame(function () {
    boot.style.opacity = '1';
  });
});

renderMap();
