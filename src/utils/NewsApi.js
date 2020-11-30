const KEY_API = '600d787e460a40a381e49483e6937165';
const URL = 'https://nomoreparties.co/news/v2/everything?';

export function searchNewsApi(keyword) {

    let date = new Date();

    const toDate = date.toISOString().slice(0, 10);

    date.setDate(date.getDate() - 7);
    const fromDate = date.toISOString().slice(0, 10);

    return fetch(`${URL}q=${keyword}&apiKey=${KEY_API}&from=${fromDate}&to=${toDate}&pageSize=100`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Произошла ошибка: ${res.status}`);
        });
}