import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Correct import
import { useNavigation } from "@react-navigation/native";

const products = [
  {
    id: "1",
    name: "Office Wear",
    description: "reversible angora cardigan",
    price: 120,
    image: require("../assets/images/dress1.png"),
  },
  {
    id: "2",
    name: "Black",
    description: "reversible angora cardigan",
    price: 120,
    image: require("../assets/images/dress2.png"),
  },
  {
    id: "3",
    name: "Evening Wear",
    description: "reversible angora cardigan",
    price: 120,
    image: require("../assets/images/dress3.png"),
  },
  {
    id: "4",
    name: "Casual Wear",
    description: "reversible angora cardigan",
    price: 120,
    image: require("../assets/images/dress4.png"),
  },
  {
    id: "5",
    name: "Casual Wear",
    description: "reversible angora cardigan",
    price: 120,
    image: require("../assets/images/dress5.png"),
  },
  {
    id: "6",
    name: "Casual Wear",
    description: "reversible angora cardigan",
    price: 120,
    image: require("../assets/images/dress6.png"),
  },
  // Add more products as needed
];

const HomeScreen = () => {
  const [cart, setCart] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem("cart");
        if (storedCart) setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error loading cart from AsyncStorage: ", error);
        // Handle error appropriately, e.g., show an alert
      }
    };
    loadCart();
  }, []);

  const addToCart = async (product) => {
    try {
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
      // Optionally provide visual feedback that the product was added to the cart
      console.log("Product added to cart:", product.name);
    } catch (error) {
      console.error("Error storing data: ", error);
      // Handle error appropriately, e.g., show an alert
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={require("../assets/images/Menu.png")}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        <Text style={styles.businessName}>Open Fashion</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <Image
              source={require("../assets/images/Search.png")}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <Image
              source={require("../assets/images/shoppingBag.png")}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.title}>OUR STORY</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addToCart(item)}
            >
              <Image
                source={require("../assets/images/add_circle.png")}
                style={styles.addButtonIcon}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  businessName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  product: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    alignItems: "center",
  },
  productImage: {
    width: 150,
    height: 200,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productDescription: {
    fontSize: 14,
    color: "#555",
  },
  productPrice: {
    fontSize: 16,
    color: "#ff0000",
    marginVertical: 10,
  },
  addButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  addButtonIcon: {
    width: 30,
    height: 30,
  },
});

export default HomeScreen;
