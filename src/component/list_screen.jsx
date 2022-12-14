import {fetchAllCharacters} from "../service/api_marvel";
import {ActivityIndicator, StyleSheet, FlatList, Image, Text, View} from "react-native";
import  React, { useEffect, useState } from 'react';
import { DetailScreen } from './detail_screen';

const styles = StyleSheet.create({
    viewScreen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#423e3b",
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
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
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


export function ListScreen() {
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
                            <Image source={{ uri: item.thumbnail.path+'.'+item.thumbnail.extension }} style={styles.imageList} />
                            <Text style={styles.titreList}>{item.name}</Text>
                            {/*https://reactnative.dev/docs/touchableopacity*/}
                        </View>
                    )}
                />
            )}
        </View>
    );
}