import axios from 'axios';

export function getChat() {
    return fetch('https://gist.githubusercontent.com/siuramka/5c9ae3fcbbee3a76d10fadd743203d97/raw/4a1604aa31b604598d0694dc162c5c04f0a8f84e/data.json')
        .then(response => response.json())
        }

