export async function fetchAllCharacters(limit, offset) {
    try {
        const response = await fetch(
            `http://gateway.marvel.com/v1/public/characters?limit=${limit}&offset=${offset}&apikey=b72ca0427db6579856d797c45485130a&ts=2022-12-02 11:00:00&hash=68faafc6e98c97646de8123a45ee106d`
        );
        const json = await response.json();
        return json.data.results;
    } catch (error) {
        console.error(error);
    }
}

//http://gateway.marvel.com/v1/public/characters?apikey=b72ca0427db6579856d797c45485130a&ts=2022-12-02 11:00:00&hash=68faafc6e98c97646de8123a45ee106d