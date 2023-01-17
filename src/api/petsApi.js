import axios from "axios";

const baseUrl = 'http://localhost:8080/pets'

async function getPetsAddedToWatchlistApi(userId) {
    try {
        const res = await axios.get(`${baseUrl}/watchlist/${userId}`);
        const arrayOfIds = res.data.map(res => +res.pet_id);
        return arrayOfIds;
    } catch(err) {
        console.log(err);
    }
};

async function addPetToWatchlistApi(userId, petId) {
    try {
        const res = await axios.post(`${baseUrl}/watchlist/${userId}`, { petId });
        return res;
    } catch(err) {
        console.log(err);
    }
}

async function deletePetFromWatchlistApi(userId, petId) {
    try {
        const res = await axios.delete(`${baseUrl}/watchlist/${userId}/${petId}`);
        return res;
    } catch(err) {
        console.log(err);
    }
}

async function getOwnedPetsApi(userId) {
    try {
        const res = await axios.get(`${baseUrl}/owned-pets/${userId}`);
        return res;
    } catch(err) {
        console.log(err);
    }
};

async function getMultiplePetsByIdsApi(arrayOfIds) {
    try {
        const res = await axios.get(`${baseUrl}/watchlist-array/`, { headers: {'arrayOfIds': arrayOfIds} })
        console.log('getMultiplePetsByIds', res);
        return res;
    } catch(err) {
        console.log(err);
    }
}

async function adoptPetApi(userId, petId) {
    try {
        const action = 'adopt';
        const res = await axios.post(`${baseUrl}/adopt-pet/`, { userId, petId, action });
        return res;
    } catch(err) {
        console.log(err);
    }
}

async function fosterPetApi(userId, petId) {
    try {
        const action = 'foster';
        const res = await axios.post(`${baseUrl}/adopt-pet/`, { userId, petId, action });
        return res;
    } catch(err) {
        console.log(err);
    }
}

async function returnPetApi(userId, petId) {
    try {
        const action = 'adopt';
        const res = await axios.post(`${baseUrl}/return-pet/`, { userId, petId, action });
        return res;
    } catch(err) {
        console.log(err);
    }
}

async function addNewPetApi(pet) {
    try {
        const res = await axios.post(baseUrl, pet);
        return res;
    } catch(err) {
        console.log(err);
    }
}

async function editPetApi(pet) {
    try {
        const res = await axios.put(baseUrl, pet)
        return res;
    } catch(err) {
        console.log(err);
    }
}

export { getPetsAddedToWatchlistApi, addPetToWatchlistApi, deletePetFromWatchlistApi, getOwnedPetsApi, getMultiplePetsByIdsApi, adoptPetApi, fosterPetApi, returnPetApi, addNewPetApi, editPetApi }