export function getTwitchEmotes() {
    return fetch('http://localhost:3001/twitch/emoji/global')
      .then((response) => response.json())
  }