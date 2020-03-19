import { BehaviorSubject } from "rxjs";
import { config } from "../config/config";

// very secure lol
let tokenStorageKey = config.apiUrl;

const currentUserSubject = new BehaviorSubject(
    JSON.parse(localStorage.getItem(tokenStorageKey))
);

export const AuthenticationService = {
    login,
    register,
    logout,
    authHeader,
    handleResponse,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value;
    }
};

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (
                [401, 403, 422].indexOf(response.status) !== -1 &&
                AuthenticationService.currentUserValue
            ) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

function login(email: string, password: string) {
    let formBody = new FormData();
    formBody.set("username", email);
    formBody.set("password", password);
    const requestOptions = {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ email, password })
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody
    };

    return fetch(`${config.apiUrl}/token`, requestOptions)
        .then(handleResponse)
        .then(user => {
            const userData = {
                token: user.access_token,
                type: user.token_type,
                email: email,
            };
            // store user details and token in local storage to keep user logged in between page refreshes
            localStorage.setItem(tokenStorageKey, JSON.stringify(userData));
            currentUserSubject.next(user);

            return user;
        });
}

function register(email: string, password: string /*, firstName, lastName, dateOfBirth, enabled*/) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password /*, firstName, lastName, dateOfBirth*/ })
    };
    return fetch(`${config.apiUrl}/users/`, requestOptions)
        .then(handleResponse);
}

function logout() {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    };
    // we need to invalidate token from the user side
    return fetch(`${config.apiUrl}/logout`, requestOptions)
    // // remove user from local storage to log user out
    // localStorage.removeItem(tokenStorageKey);
    // currentUserSubject.next(null);
    // window.location.reload(true);
}

function authHeader() {
    // return authorization header with jwt token
    const currentUser = currentUserSubject.value;
    let headers = new Headers();
    if (currentUser && currentUser.token) {
        headers.set("Authorization", `Bearer ${currentUser.token}`);
    }
    return headers;
}
