import {fetchAllCharacters} from "../service/api_marvel";
import {
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    Text,
    View,
    Button,
    Linking
} from "react-native";
import  React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {addFavorite} from "../service/storage";

const styles = StyleSheet.create({
    viewScreen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#423e3b",
        // marginTop: 40,
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


export function ListScreen({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [limit, setLimit] = useState(20);
    const [offset, setOffset] = useState(0);

    const fetchDetails = async () => {
        try {
            const response = await fetchAllCharacters(limit, offset);
            //console.log(response);
            setData(data.concat(response));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setOffset(offset+limit);
        }
    };

    const setFavorite = async (id) => {
        try {
            await addFavorite(id);
            //console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    return (
        <View style={styles.viewScreen}>
            {isLoading ? <ActivityIndicator/> : (
                <FlatList
                    style={styles.flatlist}
                    data={data}
                    initialNumToRender={limit}
                    onEndReachedThreshold={0.3}
                    onEndReached={() => {
                        fetchDetails();
                    }}
                    keyExtractor={({ id }, index) => id}
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
                                <MaterialCommunityIcons name="arrow-right-circle-outline" style={styles.flatbuttonIcon} />
                                <Button style={{ width: 40, height: 40, backgroundColor: "#000000" }} title="Ajouter aux favovis" onPress={() => setFavorite(item.id)}/>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
}