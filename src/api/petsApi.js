import axios from "axios";

const baseUrl = 'http://localhost:8080/pets'

async function getPetsAddedToWatchlist(userId) {
    try {
        const res = await axios.get(`${baseUrl}/watchlist/${userId}`);
        console.log('res', res);
        return res;
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

export { getPetsAddedToWatchlist, addPetToWatchlistApi, deletePetFromWatchlistApi }