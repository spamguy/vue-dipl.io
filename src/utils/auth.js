import Vue from 'vue';

async function logIn(fakeID) {
    if (fakeID)
        Vue.localStorage.set('fakeID', fakeID);
    else
        window.location = `${process.env.VUE_APP_DIPLICITY_ENDPOINT}/Auth/Login?redirect-to=${encodeURIComponent(process.env.VUE_APP_DOMAIN)}/login`;
}

function logOut() {
    // Purge local storage.
    Vue.localStorage.remove('fakeID');
    Vue.localStorage.remove('token');
}

export { logIn, logOut };
