import axios from "axios";

const baseUrl = 'http://localhost:8080/pets'

async function getPetsAddedToWatchlist(userId) {
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

async function getMultiplePetsByIdsApi(arrayOfIds) {
    try {
        const res = await axios.get(`${baseUrl}/watchlist-array/`, { headers: {'arrayOfIds': arrayOfIds} })
        console.log('getMultiplePetsByIds', res);
        return res;
    } catch(err) {
        console.log(err);
    }
}

export { getPetsAddedToWatchlist, addPetToWatchlistApi, deletePetFromWatchlistApi, getMultiplePetsByIdsApi }