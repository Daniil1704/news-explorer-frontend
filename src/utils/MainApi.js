const URL_API = 'https://api.tsyrulnukov.students.nomoreparties.co'

export const register = (email, password, name) => {
    return fetch(`${URL_API}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                return Promise.reject(`Произошла ошибка: ${res.status}`);
            }
        });
};

export const authorize = (email, password) => {
    return fetch(`${URL_API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                return Promise.reject(`Произошла ошибка: ${res.status}`);
            }
        })
        .then((data) => {
            localStorage.setItem('jwt', data.token);
            return data;
        })
        .catch((err) => {
            console.log(err.message);
        })
};

export const getInfo = (token) => {
    return fetch(`${URL_API}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject(`Ошибка: ${err.status}`);
        });
};

export function getMyArticles() {
    return fetch(`${URL_API}/articles`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then((res) => {
            return res.json();
        })
}

export function buildArticle(article, keyword) {
    const {
        title,
        source,
        url,
        urlToImage,
    } = article

    return fetch(`${URL_API}/articles`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({
            keyword: keyword,
            title,
            text,
            date,
            source: source.name,
            link: url,
            image: urlToImage || 'https://neuronsk.ru/upload/medialibrary/771/771dad7444a2937b6085360951e048b1.png'
        })
    })
        .then((res) => {
            return res.json();
        })
}

export function deleteArticle(article) {
    return fetch(`${URL_API}/articles/${article._id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
    })
}