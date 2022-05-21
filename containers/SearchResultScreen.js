import Rect from "react";
import { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import axios from "axios";

const SearchResult = ({ title, navigation }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResultTitle = async () => {
      console.log("dans requete");

      setLoading(true);
      if (title) {
        try {
          const server_url = `https://extraordinaire-petit-theatre-w.herokuapp.com/books?title=${title}`;
          console.log(server_url);
          const response = await axios.get(server_url);
          setSearchResults(response.data);
        } catch (error) {
          console.log(error.message);
        }
      }
      setLoading(false);
    };
    fetchResultTitle();
  }, [title]);

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      {loading ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: 10,
            paddingHorizontal: 10,
            height: 500,
          }}>
          {searchResults &&
            searchResults.map((result, index) => {
              console.log(result);

              return (
                <TouchableOpacity
                  style={styles.listItem}
                  key={index}
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.navigate("Story", { bookData: result });
                  }}>
                  <View style={styles.containerImageItemList}>
                    <Image
                      style={styles.imageItem}
                      source={{ uri: result.image }}
                    />
                  </View>
                  <View style={styles.itemListDescription}>
                    <Text
                      style={{ color: "rgb(165, 81, 69)" }}
                      numberOfLines={1}>
                      {result.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  listTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: 20,
  },
  listTitle: {
    color: "rgb(226, 218, 210)",
    marginLeft: 20,
  },
  listItem: {
    margin: 10,
    height: "33%",
    width: "40%",
  },

  containerImageItemList: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 5,
  },
  imageItem: {
    height: "100%",
    width: "100%",
  },

  itemListDescription: {
    borderColor: "rgb(165, 81, 69)",
    borderWidth: 1,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: "rgb(226, 218, 210)",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: 0,
    paddingTop: 0,
  },
});

export default SearchResult;