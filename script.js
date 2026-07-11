const levels = [
  {
    id:1,
    title:"ABOUT THE PLAYER",
    teaser:"Load character profile.",
    eyebrow:"CHARACTER SELECT",
    body:`
      <p>Second-year B.Tech CSE (AI &amp; ML) student, currently grinding through DSA, hackathons, and open-source programs to level up toward a software engineering internship.</p>
      <p>Off-screen: stress-coding LeetCode problems, binge-watching a new show every other week, collecting Pinterest boards for design inspiration, and falling down wikisurfing rabbit holes — emperors, true crime, unsolved murder mysteries, all of it.</p>
    `,
    tags:["Builder","Debugger","Curious mind","Dark-green aesthetic"]
  },
  {
    id:2,
    title:"SKILL TREE",
    teaser:"View equipped abilities.",
    eyebrow:"CHARACTER STATS",
    body:`<p>Abilities unlocked so far:</p>`,
    bars:[
      {label:"JavaScript / React", value:78},
      {label:"Python", value:70},
      {label:"DSA (C++/Python)", value:50},
      {label:"SQL", value:75},
      {label:"OpenCV (in progress)", value:35}
    ]
  },
  {
    id:3,
    title:"PROJECT: AMAZON CLONE",
    teaser:"Enter the e-commerce dungeon.",
    eyebrow:"SIDE QUEST — WORLD 1",
    body:`
      <p>Rebuilt Amazon's storefront from scratch in React — sticky navbar, rotating hero banner, product grids, and a full multi-column footer — to reverse-engineer how a real e-commerce site is put together, piece by piece.</p>
    `,
    tags:["React","Deployed on GitHub Pages"],
    links:[
      {label:"View Live ↗", href:"https://kavishasri07.github.io/Amazon-Clone"},
      {label:"Source Code ↗", href:"https://github.com/kavishasri07/Amazon-Clone7"}
    ]
  },
  {
    id:4,
    title:"PROJECT: SPENDSMART",
    teaser:"Boss fight: manage a budget.",
    eyebrow:"HACKATHON BUILD",
    body:`
      <p>An AI-assisted expense tracker built for a hackathon. Log an expense in plain language, and it auto-categorizes spending, visualizes habits, and answers budget questions through a Gemini-powered chat layer.</p>
    `,
    tags:["React","Tailwind CSS","Flask","Firebase","Gemini API"],
    links:[
      {label:"Source Code ↗", href:"https://github.com/kavishasri07"}
    ]
  },
  {
    id:5,
    title:"PROJECT: H&M CLONE",
    teaser:"Loot the fashion aisle.",
    eyebrow:"SIDE QUEST — WORLD 2",
    body:`
      <p>A front-end clone of the H&amp;M e-commerce UI — practicing responsive grids, product cards, and clean navigation patterns outside of a plain to-do-list comfort zone.</p>
    `,
    tags:["HTML","CSS","JavaScript"],
    links:[
        {label:"View Live ↗", href:"https://kavishasri07.github.io/H-M-Clone/"},
      {label:"Source Code ↗", href:"https://github.com/kavishasri07/H-M-Clone"}
    ]
  },
  {
    id:6,
    title:"LEADERBOARD",
    teaser:"Check competitive rankings.",
    eyebrow:"ARENA STATS",
    body:`<p>Grinding DSA daily across two platforms:</p>`,
    tags:["CodeChef: 380+ solved · Rating 903 · Silver Streak","LeetCode: 43+ solved · DP, Binary Search, Arrays, Two Pointers, Hash Tables"]
  },
  {
    id:7,
    title:"FINAL BOSS",
    teaser:"One message could change everything.",
    eyebrow:"WORLD 7 — LAST STAND",
    body:`<p>You've reached the end of the map. Send a message to continue the story.</p>`,
    isContact:true,
    links:[
      {label:"GitHub ↗", href:"https://github.com/kavishasri07"},
      {label:"LinkedIn ↗", href:"#"},
      {label:"Email ↗", href:"mailto:kavishasri07@gmail.com"}
    ]
  }
];

let unlocked = 1;     
let cleared = 0;    
const totalLevels = levels.length;

const pathWrap = document.getElementById('pathWrap');
const overlay = document.getElementById('overlay');
const panelEl = document.getElementById('panel');
const scoreDisplay = document.getElementById('scoreDisplay');
const clearedSet = new Set();

function renderMap(){
  pathWrap.innerHTML = '';
  levels.forEach((lvl, i) => {
    const row = document.createElement('div');
    row.className = 'node-row ' + (i % 2 === 0 ? 'left' : 'right');

    const dot = document.createElement('div');
    let dotClass = 'dot';
    if (clearedSet.has(lvl.id)) dotClass += ' lit';
    else if (lvl.id === unlocked) dotClass += ' now';
    dot.className = dotClass;
    row.appendChild(dot);

    const node = document.createElement('div');
    const isLocked = lvl.id > unlocked;
    const isCurrent = lvl.id === unlocked && !clearedSet.has(lvl.id);
    node.className = 'node ' + (isLocked ? 'locked' : 'unlocked') + (isCurrent ? ' current' : '');

    node.innerHTML = `
      <span class="lvl-num pixel">LVL ${String(lvl.id).padStart(2,'0')}</span>
      <h3>${lvl.title}</h3>
      <p>${lvl.teaser}</p>
      ${isLocked ? '<span class="lock-icon">🔒</span>' : (clearedSet.has(lvl.id) ? '<span class="done-badge">CLEAR</span>' : '')}
    `;

    if (!isLocked){
      node.addEventListener('click', () => openLevel(lvl));
    }
    row.appendChild(node);
    pathWrap.appendChild(row);
  });
  scoreDisplay.textContent = `LEVELS CLEARED: ${clearedSet.size} / ${totalLevels}`;
}

function openLevel(lvl){
  let barsHtml = '';
  if (lvl.bars){
    barsHtml = lvl.bars.map(b => `
      <div class="stat-bar">
        <div class="label"><span>${b.label}</span><span>${b.value}%</span></div>
        <div class="bar-track"><div class="bar-fill" style="width:${b.value}%"></div></div>
      </div>
    `).join('');
  }

  let tagsHtml = '';
  if (lvl.tags){
    tagsHtml = `<div class="tags">${lvl.tags.map(t => `<span class="tag-chip">${t}</span>`).join('')}</div>`;
  }

  let linksHtml = '';
  if (lvl.links){
    linksHtml = `<div class="link-row">${lvl.links.map(l => {
      const isMail = l.href.startsWith('mailto:');
      const attrs = isMail ? '' : ' target="_blank" rel="noopener"';
      return `<a href="${l.href}"${attrs}>${l.label}</a>`;
    }).join('')}</div>`;
  }

  let contactHtml = '';
  if (lvl.isContact){
    contactHtml = `
      <div class="form-row">
        <label>YOUR NAME</label>
        <input type="text" id="cName" placeholder="Player two...">
      </div>
      <div class="form-row">
        <label>YOUR EMAIL</label>
        <input type="email" id="cEmail" placeholder="you@company.com">
      </div>
      <div class="form-row">
        <label>MESSAGE</label>
        <textarea id="cMsg" placeholder="Let's talk opportunities..."></textarea>
      </div>
    `;
  }

  const alreadyCleared = clearedSet.has(lvl.id);

  panelEl.innerHTML = `
    <button class="close" aria-label="Close">✕</button>
    <div class="eyebrow pixel">${lvl.eyebrow}</div>
    <h2 class="pixel brush">${lvl.title}</h2>
    <div class="body">
      ${lvl.body}
      ${barsHtml}
      ${tagsHtml}
      ${contactHtml}
      ${linksHtml}
    </div>
    <button class="complete-btn" id="completeBtn" ${alreadyCleared ? 'disabled' : ''}>
      ${alreadyCleared ? '✓ LEVEL CLEARED' : (lvl.isContact ? 'SEND & FINISH GAME' : 'MARK LEVEL COMPLETE →')}
    </button>
  `;

  overlay.classList.add('show');

  panelEl.querySelector('.close').addEventListener('click', closeLevel);

  const completeBtn = document.getElementById('completeBtn');
  if (!alreadyCleared){
    completeBtn.addEventListener('click', () => {
      if (lvl.isContact){
        const name = document.getElementById('cName').value.trim();
        const email = document.getElementById('cEmail').value.trim();
        const message = document.getElementById('cMsg').value.trim();
        if (!name || !email || !message){
          showToast('Fill in name, email, and message to finish the game!');
          return;
        }

        completeBtn.disabled = true;
        completeBtn.textContent = 'SENDING...';

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);

        fetch('https://formspree.io/f/xaqrwebl', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        })
        .then(res => {
          if (res.ok){
            finishContactLevel(lvl);
          } else {
            completeBtn.disabled = false;
            completeBtn.textContent = 'SEND & FINISH GAME';
            showToast('Something went wrong — try again?');
          }
        })
        .catch(() => {
          completeBtn.disabled = false;
          completeBtn.textContent = 'SEND & FINISH GAME';
          showToast('Network error — try again?');
        });
        return;
      }

      clearedSet.add(lvl.id);
      if (lvl.id === unlocked && unlocked < totalLevels){
        unlocked = lvl.id + 1;
      }
      closeLevel();
      renderMap();
      showToast(`Level ${lvl.id} cleared! Next level unlocked.`);
    });
  }
}

function finishContactLevel(lvl){
  clearedSet.add(lvl.id);
  if (lvl.id === unlocked && unlocked < totalLevels){
    unlocked = lvl.id + 1;
  }
  closeLevel();
  renderMap();
  showToast('Message sent — thanks for playing!');
}

function closeLevel(){
  overlay.classList.remove('show');
}

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeLevel();
});

function showToast(msg){
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}

document.getElementById('startBtn').addEventListener('click', () => {
  document.getElementById('boot').style.opacity = '0';
  setTimeout(() => {
    document.getElementById('boot').style.display = 'none';
    document.getElementById('map').style.display = 'block';
  }, 500);
});

document.getElementById('backBtn').addEventListener('click', () => {
  document.getElementById('map').style.display = 'none';
  const boot = document.getElementById('boot');
  boot.style.display = 'flex';
  requestAnimationFrame(() => { boot.style.opacity = '1'; });
});

renderMap();