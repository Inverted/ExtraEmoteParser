/**
 * Basic BetterTwitchTV class for retrieving and parsing their emotes API.
 */
class BTTV {
  /**
   * Retrieve BetterTwitchTV emotes usable on all channels.
   * @param {int} size - The size of the emotes to use. Typically 1, 2, or 3.
   */
  getGlobal(size = 1) {
    return this.getEmotes("https://api.betterttv.net/2/emotes", size);
  }

  /**
   * Retrieve BetterTwitchTV emotes for a specific channel.
   * @param {string} channel - The channel name on Twitch.
   * @param {int} size - The size of the emotes to use. Typically 1, 2, or 3.
   */
  getChannel(channel, size = 1) {
    return this.getEmotes(
      `https://api.betterttv.net/2/channels/${channel}`,
      size
    );
  }

  /**
   * Make API call and return a promise for the parsed result.
   * @param {string} url - The URL of the API.
   * @param {int} size - The size of the emotes to use. Typically 1, 2, or 3.
   */
  getEmotes(url, size) {
    return fetch(url)
      .then(response => response.json())
      .catch(error => console.error(error))
      .then(responseJSON => {
        return new Promise((resolve, reject) => {
          if (responseJSON.status != 200) {
            reject();
          } else {
            resolve(
              this.parseEmotes(
                responseJSON.emotes,
                responseJSON.urlTemplate,
                size
              )
            );
          }
        });
      });
  }

  /**
   * Parse the response object into an array of emotes.
   * @param {array} emotes - The array of emotes to parse.
   * @param {string} urlTemplate - The template URL for the emote image. Provided by API.
   * @param {int} size - The size of the emotes to use. Typically 1, 2, or 3.
   */
  parseEmotes(emotes, urlTemplate, size) {
    let result = [];
    emotes.forEach(emote => {
      let imgURL =
        "https:" +
        urlTemplate
          .replace("{{id}}", emote.id)
          .replace("{{image}}", `${size}x`);
      result.push({
        code: emote.code,
        img: imgURL
      });
    });
    return result;
  }
}
