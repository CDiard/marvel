import AsyncStorage from '@react-native-async-storage/async-storage';

export async function addFavorite(idMarvel) {
    try {
        let favorite = await AsyncStorage.getItem("favoriteMarvel")
        if (favorite !== null) {
            favorite = favorite.split(',');
        } else {
            favorite = [];
        }
        favorite.push(idMarvel);
        let unique = [...new Set(favorite)];
        await AsyncStorage.setItem("favoriteMarvel", unique.toString())
    } catch (e) {
        console.error(e);
    }
    console.log('Done. store data')
}

export async function getFavorites() {
    try {
        let getMarvels = await AsyncStorage.getItem("favoriteMarvel");
        if (getMarvels != null) {
            getMarvels = getMarvels.split(',')
            return getMarvels;
        } else {
            return [];
        }

    } catch (e) {
        console.error(e);
    }
    console.log('Done. get data')
}

export async function delFavorites() {
    try {
        await AsyncStorage.removeItem('favoriteMarvel')
    } catch(e) {
        console.error(e);
    }
    console.log('Done. get data')
}