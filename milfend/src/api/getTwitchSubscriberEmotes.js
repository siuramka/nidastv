export function getTwitchSubscriberEmotes() {
    return fetch('http://localhost:3001/twitch/emoji/subscriber')
      .then((response) => response.json())
  }