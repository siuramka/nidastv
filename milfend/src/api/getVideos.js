import axios from 'axios';

export function getList() {
    return fetch('https://cloud.nidas.tv')
        .then(response => response.json())
        }

