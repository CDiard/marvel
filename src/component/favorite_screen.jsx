import {Button, FlatList, Image, Linking, Text, TouchableOpacity, View} from "react-native";
import {getFavorites} from "../service/storage";
import {fetchOneCharacter} from "../service/api_marvel";
import  React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {forEach} from "react-native-axios/lib/utils";

export function FavoriteScreen() {
    const [data, setData] = useState([]);

    const fetchFavorites = async () => {
        try {
            const response = await getFavorites();
            if (response !== null) {
                let responseArray = response.split(',');
                let resultArray = [];

                //Ne sais pas comment faire
                responseArray.map(async item => {
                    const getDatas = await fetchOneCharacter(item);
                    // console.log(getDatas)
                    resultArray.push(getDatas);
                })
                let unique = [...new Set(resultArray)];

                // console.log(unique)
                setData(unique);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    return (
        <View>
            <FlatList
                data={data}
                onEndReached={() => {
                    fetchFavorites();
                }}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                    <View>
                        {/*<Image source={{ uri: item.thumbnail.path+'.'+item.thumbnail.extension }} style={styles.imageList} />*/}
                        <Text>{item.name}</Text>
                        {/*<MaterialCommunityIcons name="arrow-right-circle-outline" style={styles.flatbuttonIcon} />*/}
                    </View>
                )}
            />
        </View>
    );
}