/*
Array of the retrieved emotes.
Emotes are returned as an object, with properties code and the corresponding image.
*/
let allEmotes = [];

// Append emote with its code followed by the image to a container
function appendEmote(emote, container) {
  let e = document.createElement("li");
  let img = document.createElement("img");
  e.innerText = emote.code;
  img.src = emote.img;
  e.appendChild(img);
  container.appendChild(e);
}

/**
 * Fetch global emotes
 */
const ffz = new FFZ();
fetchGlobalEmotes(ffz, "#ffzGlobalEmotes");
const bttv = new BTTV();
fetchGlobalEmotes(bttv, "#bttvGlobalEmotes");

/**
 * Input channel to fetch its emotes
 */
const channelInput = document.querySelector("#channelName");
document
  .querySelector("#fetchEmotes")
  .addEventListener("submit", event => {
    event.preventDefault();
    const channel = channelInput.value;
    fetchChannelEmotes(ffz, channel, "#ffzChannelEmotes");
    fetchChannelEmotes(bttv, channel, "#bttvChannelEmotes");
  });

// Example calls

function fetchGlobalEmotes(service, container) {
  document.querySelector(container).innerHTML = "";
  service
    .getGlobal()
    .then(emotes => {
      emotes.forEach(emote => {
        appendEmote(emote, document.querySelector(container));
        allEmotes.push(emote);
      });
    })
    .catch(error => console.log(error));
}

function fetchChannelEmotes(service, channel, container) {
  document.querySelector(container).innerHTML = "";
  service
    .getChannel(channel)
    .then(emotes => {
      emotes.forEach(emote => {
        appendEmote(emote, document.querySelector(container));
        allEmotes.push(emote);
      });
    })
    .catch(error => console.log(error));
}
