import {Image, StyleSheet, Text, View, Linking, Button, SafeAreaView, ScrollView, StatusBar} from "react-native";

const styles = StyleSheet.create({
    containerDetail: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    imageDetail: {
        width: "100%",
        height: "20%",
        marginVertical: 20,
    },
    scrollDetail: {
        paddingHorizontal: 20,
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
        marginTop: 20,
        marginBottom: 20,
    },
    descriptionDetail: {
        fontSize: 19,
        textAlign: "justify",
        marginVertical: 20,
    },
    texteDetail: {
        fontSize: 17,
        textAlign: "left",
        marginTop: 10,
        marginBottom: 10,
    },
    listeUlDetail: {
        display: "flex",
        flexDirection: "column",
    },
    boutonsDetail: {
        width: "100%",
        height: 150,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginVertical: 20,
    },
});

export function DetailScreen({ route }) {
    const { cardMarvel } = route.params;

    return (
        <SafeAreaView style={styles.containerDetail}>
            <ScrollView vertical
                        showsVerticalScrollIndicator={true}
                        style={styles.scrollDetail}
            >
                <Text style={styles.titreDetail}>{ cardMarvel.name }</Text>
                {cardMarvel.description !== ""? <Text style={styles.descriptionDetail}>{ cardMarvel.description }</Text>: null }
                <Image source={{ uri: cardMarvel.thumbnail.path+'.'+cardMarvel.thumbnail.extension }} style={styles.imageDetail} />
                <View style={styles.boutonsDetail}>
                    {cardMarvel.urls.map((item, index) => (
                        <Button
                            key={index}
                            title={ 'Voir '+item.type }
                            onPress={() => Linking.openURL(item.url)}
                        />
                    ))}
                </View>
                <Text style={styles.sousTitreDetail}>Apparut dans { cardMarvel.comics.returned } comic{ cardMarvel.comics.returned>1 ? 's' : '' }</Text>
                <View style={styles.listeUlDetail}>
                    {cardMarvel.comics.items.map((item, index) => (
                        <Text style={styles.texteDetail} key={index}>{ index+1 }. { item.name }</Text>
                    ))}
                </View>
                <Text style={styles.sousTitreDetail}>Apparut dans { cardMarvel.series.returned } serie{ cardMarvel.series.returned>1 ? 's' : '' }</Text>
                <View style={styles.listeUlDetail}>
                    {cardMarvel.series.items.map((item, index) => (
                        <Text style={styles.texteDetail} key={index}>{ index+1 }. { item.name }</Text>
                    ))}
                </View>
                <Text style={styles.sousTitreDetail}>Apparut dans { cardMarvel.stories.returned } storie{ cardMarvel.stories.returned>1 ? 's' : '' }</Text>
                <View style={styles.listeUlDetail}>
                    {cardMarvel.stories.items.map((item, index) => (
                        <Text style={styles.texteDetail} key={index}>{ index+1 }. { item.type } - { item.name }</Text>
                    ))}
                </View>
                <Text style={styles.sousTitreDetail}>Apparut dans { cardMarvel.events.returned } event{ cardMarvel.events.returned>1 ? 's' : '' }</Text>
                <View style={styles.listeUlDetail}>
                    {cardMarvel.events.items.map((item, index) => (
                        <Text style={styles.texteDetail} key={index}>{ index+1 }. { item.name }</Text>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}