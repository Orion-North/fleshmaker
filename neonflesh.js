document.addEventListener('DOMContentLoaded', () => {
  // Trait pools
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
  const aliases = ["Ghost","Hex","Vapor","Nyx","Echo","Drift","Blitz","Cipher","Nova","Rogue"];
  const augments = ["Optical camo","Neural uplink","Dermal armor","Reflex booster","Nanofiber muscles"];
  const corps = ["Independent","Biodyne Systems","Helix Dynamics","Novacore Industries","OmniTech Group","Zenith Security"];
  const syndicates = ["Lone wolf","Red Iris","Nightshade Collective","Black Lotus","Silver Serpents","Ghosthawks"];
  const gear = ["Monofilament katana","Smartlink pistol","Plasma rifle","EMP grenade","Nano-drone swarm"];
  const mottoes = [
    "Blood for steel.",
    "Data is power.",
    "Survive and adapt.",
    "No honor among thieves.",
    "Live fast, die old."
  ];

  // Rarity setup
  const rarityOrder = ["common","uncommon","rare","epic","legendary"];
  const rarityScores = { common:1, uncommon:2, rare:3, epic:4, legendary:5 };
  function tagPool(pool) {
    return pool.map(item => {
      let idx = Math.floor(Math.pow(Math.random(),1.5)*rarityOrder.length);
      if (idx>=rarityOrder.length) idx = rarityOrder.length-1;
      return { value:item, rarity:rarityOrder[idx] };
    });
  }

  // Tagging pools
  const tagged = {
    aliases: tagPool(aliases),
    backgrounds: tagPool(Object.keys(backgroundSkills)),
    skills: {},
    augments: tagPool(augments),
    corps: tagPool(corps),
    syndicates: tagPool(syndicates),
    gear: tagPool(gear),
    mottoes: tagPool(mottoes)
  };
  // Tag skills per background
  tagged.backgrounds.forEach(bg => {
    tagged.skills[bg.value] = tagPool(backgroundSkills[bg.value]);
  });

  // DOM refs
  const genBtn  = document.getElementById("generate");
  const copyBtn = document.getElementById("copy");
  const cardDiv = document.getElementById("character");

  function pickOne(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
  }
  function pickMany(arr,n) {
    const copy = [...arr];
    const sel = [];
    for(let i=0;i<n;i++){
      const idx = Math.floor(Math.random()*copy.length);
      sel.push(copy.splice(idx,1)[0]);
    }
    return sel;
  }

  // Determine highest rarity in a set
  function maxRarity(items) {
    return items.reduce((max,it)=> rarityScores[it.rarity]>rarityScores[max]?it.rarity:max , items[0].rarity);
  }

  function generateCharacter() {
    const alias = pickOne(tagged.aliases);
    const background = pickOne(tagged.backgrounds);
    const skillsArr = pickMany(tagged.skills[background.value],3);
    const augArr = pickMany(tagged.augments,3);
    const corp = pickOne(tagged.corps);
    const synd = pickOne(tagged.syndicates);
    const gearArr = pickMany(tagged.gear,3);
    const mot = pickOne(tagged.mottoes);

    // overall rarity
    const all = [alias, background, ...skillsArr, ...augArr, corp, synd, ...gearArr, mot];
    const avg = all.reduce((sum,it)=>sum+rarityScores[it.rarity],0)/all.length;
    let overall = "common";
    if(avg>4.5) overall="legendary";
    else if(avg>3.5) overall="epic";
    else if(avg>2.5) overall="rare";
    else if(avg>1.5) overall="uncommon";

    return { alias, background, skills:skillsArr, augments:augArr, corp, syndicate:synd, gear:gearArr, motto:mot, overall };
  }

  function animateCharacter(c) {
    cardDiv.innerHTML = `<div class="overall-rarity rarity-${c.overall}">Overall: ${c.overall}</div>`;
    const list = [
      ["Alias", c.alias],
      ["Background", c.background],
      ["Skills", c.skills],
      ["Augments", c.augments],
      ["Corporation", c.corp],
      ["Syndicate", c.syndicate],
      ["Gear", c.gear],
      ["Motto", c.motto]
    ];
    list.forEach(([label,data],i)=>{
      setTimeout(()=>{
        const div = document.createElement('div');
        const rarity = Array.isArray(data)? maxRarity(data) : data.rarity;
        div.className = `trait rarity-${rarity}`;
        const val = Array.isArray(data)? data.map(it=>it.value).join(', ') : data.value;
        div.innerHTML = `<span class="trait-label">${label}:</span> ${val}`;
        cardDiv.appendChild(div);
        requestAnimationFrame(()=>div.classList.add('show'));
      }, 400*i);
    });
  }

  function copyToClipboard() {
    const text = cardDiv.textContent.trim();
    if(!text) return alert('Generate a character first');
    navigator.clipboard.writeText(text).then(_=>alert('Copied to clipboard'));
  }

  genBtn.addEventListener('click', ()=>animateCharacter(generateCharacter()));
  copyBtn.addEventListener('click', copyToClipboard);

  // initial
  animateCharacter(generateCharacter());
});
