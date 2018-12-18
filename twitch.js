/**
 * Basic Twitch class for retrieving and parsing emotes.
 */
class Twitch {
  /**
   * Retrieve Twitch emotes usable on all channels.
   */
  getGlobal() {
    return this.getEmotes(
      "https://api.twitch.tv/kraken/chat/emoticon_images?emotesets=0"
    );
  }

  /**
   * Retrieve Twitch emotes for a specific channel.
   * @param {string} channel - The channel name on Twitch.
   */
  getChannel(channel) {
    return this.getEmotes(
      `https://api.twitch.tv/api/channels/${channel}/product`
    );
  }

  /**
   * Make API call and return a promise for the parsed result.
   * @param {string} url - The URL of the API.
   */
  getEmotes(url) {
    return fetch(url, {
      headers: {
        "Client-ID": "kedrqjdeetks1emplt3tmofwv3cbcy"
      }
    })
      .then(response => response.json())
      .catch(error => console.error(error))
      .then(responseJSON => {
        return new Promise((resolve, reject) => {
          if (!responseJSON.emoticons) {
            if (!responseJSON.emoticon_sets) {
              reject("Error retrieving emotes from Twitch");
            } else {
              resolve(this.parseSets(responseJSON.emoticon_sets));
            }
          } else {
            resolve(this.parseEmotes(responseJSON.emoticons));
          }
        });
      });
  }
  /**
   * Parse the response object into an array of emotes.
   * @param {array} emotes - The array of emotes to parse.
   */
  parseSets(sets) {
    let result = [];
    for (let key in sets) {
      result = result.concat(this.parseEmotes(sets[key]));
    }
    return result;
  }

  /**
   * Parse the response object into an array of emotes.
   * @param {array} emotes - The array of emotes to parse.
   */
  parseEmotes(emotes) {
    let result = [];
    emotes.forEach(emote => {
      let imgURL = emote.url
        ? emote.url
        : `https://static-cdn.jtvnw.net/emoticons/v1/${emote.id}/1.0`;
      result.push({
        code: emote.regex ? emote.regex : emote.code,
        img: imgURL
      });
    });
    return result;
  }
}
