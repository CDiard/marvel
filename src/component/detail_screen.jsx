import {Image, StyleSheet, Text, View, Linking, Button, FlatList, ScrollView} from "react-native";

const styles = StyleSheet.create({
    imageDetail: {
        width: "100%",
        height: "20%",
    },
    scrollDetail: {
        width: "100%",
        height: "100%",
    },
    sousTitreDetail: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
    },
    titreDetail: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        color: "#ec1d24",
    },
    descriptionDetail: {
        fontSize: 19,
        textAlign: "justify",
    },
    texteDetail: {
        fontSize: 17,
        textAlign: "left",
    },
});

export function DetailScreen({ route }) {
    const { cardMarvel } = route.params;

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ScrollView style={styles.scrollDetail}>
                <Text style={styles.titreDetail}>{ cardMarvel.name }</Text>
                <Text style={styles.descriptionDetail}>{ cardMarvel.description }</Text>
                {cardMarvel.urls.map((item, index) => (
                    <Button
                        key={index}
                        title={ 'Voir '+item.type }
                        onPress={() => Linking.openURL(item.url)}
                    />
                ))}
                <Image source={{ uri: cardMarvel.thumbnail.path+'.'+cardMarvel.thumbnail.extension }} style={styles.imageDetail} />
                <Text style={styles.sousTitreDetail}>Apparut dans { cardMarvel.comics.returned } comic{ cardMarvel.comics.returned>1 ? 's' : '' }</Text>
                <View>
                    {cardMarvel.comics.items.map((item, index) => (
                        <Text style={styles.texteDetail} key={index}>{ index+1 }. { item.name }</Text>
                    ))}
                </View>
                <Text style={styles.sousTitreDetail}>Apparut dans { cardMarvel.series.returned } serie{ cardMarvel.series.returned>1 ? 's' : '' }</Text>
                <View>
                    {cardMarvel.series.items.map((item, index) => (
                        <Text style={styles.texteDetail} key={index}>{ index+1 }. { item.name }</Text>
                    ))}
                </View>
                <Text style={styles.sousTitreDetail}>Apparut dans { cardMarvel.stories.returned } storie{ cardMarvel.stories.returned>1 ? 's' : '' }</Text>
                <View>
                    {cardMarvel.stories.items.map((item, index) => (
                        <Text style={styles.texteDetail} key={index}>{ index+1 }. { item.type } - { item.name }</Text>
                    ))}
                </View>
                <Text style={styles.sousTitreDetail}>Apparut dans { cardMarvel.events.returned } event{ cardMarvel.events.returned>1 ? 's' : '' }</Text>
                <View>
                    {cardMarvel.events.items.map((item, index) => (
                        <Text style={styles.texteDetail} key={index}>{ index+1 }. { item.name }</Text>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}