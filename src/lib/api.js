const baseUrl = 'http://localhost:8080/api';

//Api class used as a wrapper for fetch
async function request({method, path, data}) {
    const options = {
        method, headers: {
            "Content-Type": "application/json"
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    return fetch(`${baseUrl}/${path}`, options)
        .then((res) => res.text())
        .then((json) => {
            try {
                return JSON.parse(json);
            } catch (err) {
                return json;
            }
        });
}

export function get(path) {
    return request({method: 'GET', path});
}

export function del(path) {
    return request({method: 'DELETE', path});
}

export function post(path, data) {
    return request({method: 'POST', path, data});
}

export function put(path, data) {
    return request({method: 'PUT', path, data});
}