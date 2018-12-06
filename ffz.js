/**
 * Basic BetterTwitchTV class for retrieving and parsing their emotes API.
 */
class FFZ {
  /**
   * Retrieve FrankerFaceZ emotes usable on all channels.
   * @param {int} size - The size of the emotes to use. Typically 1, 2, or 4.
   */
  getGlobal(size = 1) {
    return this.getEmotes("https://api.frankerfacez.com/v1/set/global", size);
  }

  /**
   * Retrieve FrankerFaceZ emotes for a specific channel.
   * @param {string} channel - The channel name on Twitch.
   * @param {int} size - The size of the emotes to use. Typically 1, 2, or 4.
   */
  getChannel(channel, size = 1) {
    return this.getEmotes(
      `https://api.frankerfacez.com/v1/room/${channel}`,
      size
    );
  }

  /**
   * Make API call and return a promise for the parsed result.
   * @param {string} url - The URL of the API.
   * @param {int} size - The size of the emotes to use. Typically 1, 2, or 4.
   */
  getEmotes(url, size = 1) {
    return fetch(url)
      .then(response => response.json())
      .catch(error => console.error(error))
      .then(responseJSON => {
        return new Promise((resolve, reject) => {
          if (!responseJSON.sets) {
            reject("Error retrieving emotes from FFZ");
          } else {
            resolve(this.parseSets(responseJSON.sets, size));
          }
        });
      });
  }

  /**
   * Parse all sets in the API response. Each set contains emotes.
   * Note: not yet tested if this can cause duplicates.
   * @param {array} sets - The array of sets, each containing emotes.
   * @param {int} size - The size of the emotes to use. Typically 1, 2, or 4.
   */
  parseSets(sets, size) {
    let result = [];
    for (let key in sets) {
      result = result.concat(this.parseEmotes(sets[key].emoticons, size));
    }
    return result;
  }

  /**
   * Parse the response object into an array of emotes.
   * @param {array} emotes - The array of emotes to parse.
   * @param {int} size - The size of the emotes to use. Typically 1, 2, or 4.
   */
  parseEmotes(emotes, size) {
    let result = [];
    emotes.forEach(emote => {
      let imgURL;
      if (size in emote.urls) {
        imgURL = "https:" + emote.urls[size];
      } else {
        imgURL = "https:" + emote.urls[1];
      }
      result.push({
        code: emote.name,
        img: imgURL
      });
    });
    return result;
  }
}
