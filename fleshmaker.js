const aliases = ["Ghost", "Hex", "Vapor", "Nyx", "Echo", "Drift", "Blitz", "Cipher", "Nova", "Rogue"];
const backgrounds = ["Ex-corp security", "Street rat", "Data thief", "Cyber-shaman", "Synth musician"];
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

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateCharacter() {
  const alias = pickRandom(aliases);
  const background = pickRandom(backgrounds);
  const selectedAugments = Array.from({ length: 3 }, () => pickRandom(augments));
  const corp = Math.random() < 0.3 ? "Independent" : pickRandom(corps);
  const syndicate = Math.random() < 0.4 ? "Lone wolf" : pickRandom(syndicates);
  const selectedGear = Array.from({ length: 3 }, () => pickRandom(gear));
  const motto = pickRandom(mottoes);
  const bounty = `${Math.floor(Math.random() * 49000 + 1000)} credits`;
  const quote = `${alias}: \"${motto}\"`;

  return {
    alias,
    background,
    augments: selectedAugments,
    corp,
    syndicate,
    gear: selectedGear,
    motto,
    bounty,
    quote,
  };
}

function formatCharacter(character) {
  return `
Alias: ${character.alias}
Background: ${character.background}
Augments: ${character.augments.join(", ")}
Corporation: ${character.corp}
Syndicate: ${character.syndicate}
Gear: ${character.gear.join(", ")}
Motto: ${character.motto}
Bounty: ${character.bounty}
Quote: ${character.quote}
  `;
}

function displayCharacter(character) {
  const output = formatCharacter(character);
  document.getElementById("character").textContent = output;
}

function copyToClipboard() {
  const text = document.getElementById("character").textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert("Character copied to clipboard.");
  });
}

document.getElementById("generate").addEventListener("click", () => {
  const char = generateCharacter();
  displayCharacter(char);
});

document.getElementById("copy").addEventListener("click", () => {
  copyToClipboard();
});

window.addEventListener("load", () => {
  const char = generateCharacter();
  displayCharacter(char);
});
