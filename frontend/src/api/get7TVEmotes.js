export function get7TVEmotes() {
  return fetch('https://7tv.io/v2/users/nidas/emotes')
    .then((response) => response.json())
}

