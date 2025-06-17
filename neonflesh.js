document.addEventListener('DOMContentLoaded', () => {
  const backgroundSkills = {
    "Ex-corp security": [
      "Tactics", "Firearms", "Leadership", "Intimidation", "Cybersecurity", "Logistics",
      "First Aid", "Interrogation", "Defensive Driving", "Surveillance", "Negotiation", "Strategy"
    ],
    "Street rat": [
      "Stealth", "Pickpocket", "Parkour", "Streetwise", "Bartering", "Lockpicking",
      "Scavenging", "Brawling", "Improvisation", "Haggle", "Urban Navigation", "Networking"
    ],
    "Data thief": [
      "Hacking", "Cryptography", "Social Engineering", "Code Analysis", "Network Infiltration", "Decryption",
      "Firmware Manipulation", "Signal Jamming", "Malware Development", "Data Mining", "Trace Masking", "Programming"
    ],
    "Cyber-shaman": [
      "Ritual Chanting", "Neurotheology", "Metaphysics", "Meditation", "Psionic Resonance", "Electronics",
      "Biofeedback", "Altered States", "Symbol Interpretation", "Aura Reading", "Cult Negotiation", "Pharmaceuticals"
    ],
    "Synth musician": [
      "Performance", "Synthesis", "Sound Design", "Rhythm", "Composition", "Instrumentation",
      "Stage Presence", "Mixing", "Mastering", "DJing", "Crowd Reading", "Improvisation"
    ]
  };

  const aliases = ["Ghost", "Hex", "Vapor", "Nyx", "Echo", "Drift", "Blitz", "Cipher", "Nova", "Rogue"];
  const backgrounds = Object.keys(backgroundSkills);
  const augments = ["Optical camo", "Neural uplink", "Dermal armor", "Reflex booster", "Nanofiber muscles"];
  const corps = ["Biodyne Systems", "Helix Dynamics", "Novacore Industries", "OmniTech Group", "Zenith Security"];
  const syndicates = ["Red Iris", "Nightshade Collective", "Black Lotus", "Silver Serpents", "Ghosthawks"];
  const gear = ["Monofilament katana", "Smartlink pistol", "Plasma rifle", "EMP grenade", "Nano-drone swarm"];
  const mottoes = [
    "Blood for steel.",
    "Data is power.",
    "Survive and adapt.",
    "No honor among thieves.",
    "Live fast, die old."
  ];

  const generateBtn = document.getElementById("generate");
  const copyBtn = document.getElementById("copy");
  const cardDiv = document.getElementById("character");

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function pickMultiple(arr, count) {
    const copy = [...arr];
    const selected = [];
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(Math.random() * copy.length);
      selected.push(copy.splice(idx, 1)[0]);
    }
    return selected;
  }

  function generateCharacter() {
    const background = pickRandom(backgrounds);
    return {
      alias: pickRandom(aliases),
      background,
      skills: pickMultiple(backgroundSkills[background], 3),
      augments: pickMultiple(augments, 3),
      corp: Math.random() < 0.3 ? "Independent" : pickRandom(corps),
      syndicate: Math.random() < 0.4 ? "Lone wolf" : pickRandom(syndicates),
      gear: pickMultiple(gear, 3),
      motto: pickRandom(mottoes),
      bounty: `${Math.floor(Math.random() * 49000 + 1000)} credits`,
      quote: `"${pickRandom(aliases)}: ${pickRandom(mottoes)}"`,
    };
  }

  function animateCharacter(c) {
    cardDiv.innerHTML = '';
    const entries = [
      ['Alias', c.alias],
      ['Background', c.background],
      ['Skills', c.skills.join(', ')],
      ['Augments', c.augments.join(', ')],
      ['Corporation', c.corp],
      ['Syndicate', c.syndicate],
      ['Gear', c.gear.join(', ')],
      ['Motto', c.motto],
      ['Bounty', c.bounty],
      ['Quote', c.quote]
    ];
    entries.forEach(([label, value], idx) => {
      setTimeout(() => {
        const div = document.createElement('div');
        div.className = 'trait';
        div.innerHTML = `<span class="trait-label">${label}:</span> ${value}`;
        cardDiv.appendChild(div);
        requestAnimationFrame(() => div.classList.add('show'));
      }, idx * 400);
    });
  }

  function copyToClipboard() {
    const text = cardDiv.textContent;
    if (!text.trim()) {
      alert("Nothing to copy—generate a character first.");
      return;
    }
    navigator.clipboard.writeText(text)
      .then(() => alert("Character copied to clipboard."))
      .catch(() => alert("Copy failed—your browser may not support this."));
  }

  generateBtn.addEventListener("click", () => animateCharacter(generateCharacter()));
  copyBtn.addEventListener("click", copyToClipboard);

  // initial animation on load
  animateCharacter(generateCharacter());
});
