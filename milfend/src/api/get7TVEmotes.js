export function get7TVEmotes() {
  return fetch('http://localhost:3001/7tv')
    .then((response) => response.json())
}