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

// Example calls

const ffz = new FFZ();
ffz
  .getGlobal()
  .then(emotes => {
    emotes.forEach(emote => {
      appendEmote(emote, document.querySelector("#ffzEmotes"));
      allEmotes.push(emote);
    });
  })
  .catch(error => console.log(error));

ffz
  .getChannel("gamesdonequick")
  .then(emotes => {
    emotes.forEach(emote => {
      appendEmote(emote, document.querySelector("#ffzEmotes"));
      allEmotes.push(emote);
    });
  })
  .catch(error => console.log(error));


const bttv = new BTTV();
bttv.getGlobal().then(emotes => {
  emotes.forEach(emote => {
    appendEmote(emote, document.querySelector("#bttvGlobalEmotes"));
    allEmotes.push(emote);
  });
});
bttv
  .getChannel("gamesdonequick")
  .then(emotes => {
    emotes.forEach(emote => {
      appendEmote(emote, document.querySelector("#bttvChannelEmotes"));
      allEmotes.push(emote);
    });
  })
  .catch(() => {
    console.log("No channel emotes found");
  });
