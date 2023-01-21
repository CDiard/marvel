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
});

export function DetailScreen({ route }) {
    const { cardMarvel } = route.params;

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ScrollView style={styles.scrollDetail}>
                <Text>{ cardMarvel.name },{ cardMarvel.description }</Text>
                {cardMarvel.urls.map((item) => (
                    <Button
                        title={ 'Voir '+item.type }
                        onPress={() => Linking.openURL(item.url)}
                    />
                ))}
                <Image source={{ uri: cardMarvel.thumbnail.path+'.'+cardMarvel.thumbnail.extension }} style={styles.imageDetail} />
                <Text>Les { cardMarvel.comics.returned } comic{ cardMarvel.comics.returned>1 ? 's' : '' } :</Text>
                <View>
                    {cardMarvel.comics.items.map((item, key) => (
                        <Text>{ key+1 }. { item.name }</Text>
                    ))}
                </View>
                <Text>Les { cardMarvel.series.returned } serie{ cardMarvel.series.returned>1 ? 's' : '' } :</Text>
                <View>
                    {cardMarvel.series.items.map((item, key) => (
                        <Text>{ key+1 }. { item.name }</Text>
                    ))}
                </View>
                <Text>Les { cardMarvel.stories.returned } storie{ cardMarvel.stories.returned>1 ? 's' : '' } :</Text>
                <View>
                    {cardMarvel.stories.items.map((item, key) => (
                        <Text>{ key+1 }. { item.type } - { item.name }</Text>
                    ))}
                </View>
                <Text>Les { cardMarvel.events.returned } event{ cardMarvel.events.returned>1 ? 's' : '' } :</Text>
                <View>
                    {cardMarvel.events.items.map((item, key) => (
                        <Text>{ key+1 }. { item.name }</Text>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}