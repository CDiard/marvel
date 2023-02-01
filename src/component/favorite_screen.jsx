import {ActivityIndicator, Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {getFavorites} from "../service/storage";
import {fetchOneCharacter} from "../service/api_marvel";
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const styles = StyleSheet.create({
    viewScreen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#423e3b",
        marginTop: 40,
    },
    flatlist: {
        width: "100%",
        height: "100%",
        padding: 20,
    },
    viewList: {
        width: "100%",
        height: 130,
        marginBottom: 20,
        backgroundColor: "#e0dddb",
        borderRadius: 8,
        overflow: "hidden",
    },
    flatbutton: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    flatbuttonIcon: {
        position: "absolute",
        bottom: 0,
        right: 0,
        color: "#ec1d24",
        fontSize: 40,
    },
    imageList: {
        width: "auto",
        minWidth: "45%",
        height: "100%",
        marginRight: 10,
    },
    titreList: {
        marginTop: 5,
        marginRight: 5,
        flexShrink: 1,
        fontSize: 18,
    },
});

export function FavoriteScreen() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const navigation = useNavigation();

    const fetchFavorites = async () => {
        try {
            let responses = "";

            await getFavorites().then(dataResponses => {
                responses = dataResponses;
            }).catch(e => console.error(e));

            if (responses !== null) {
                let uniques = [...new Set(responses)];
                let arrayFavorite = [];
                uniques.map( async (response) => {
                    await fetchOneCharacter(response).then(dataCharacter => {
                        return arrayFavorite.push(dataCharacter);
                    }).catch(e => console.error(e));
                });
                setData(arrayFavorite);
            }

            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
         const actualisation = navigation.addListener('focus', () => {
            fetchFavorites();
        });
        return actualisation;
    }, [navigation]);

    return (
        <View style={styles.viewScreen}>
            {isLoading ? <ActivityIndicator/> : (
                <FlatList
                    style={styles.flatlist}
                    data={data}
                    renderItem={({ item }) => (
                        <View style={styles.viewList}>
                            <TouchableOpacity
                                style={styles.flatbutton}
                                onPress={() => navigation.navigate('Détail du héro Marvel', {
                                    cardMarvel: item,
                                })}
                            >
                                <Image source={{ uri: item.thumbnail.path+'.'+item.thumbnail.extension }} style={styles.imageList} />
                                <Text style={styles.titreList}>{item.name}</Text>
                                {/*<MaterialCommunityIcons name="arrow-right-circle-outline" style={styles.flatbuttonIcon} />*/}
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
}