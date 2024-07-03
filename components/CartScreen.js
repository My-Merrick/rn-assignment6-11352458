import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const [cart, setCart] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem("cart");
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        } else {
          setCart([]);
        }
      } catch (error) {
        console.error("Error loading cart from AsyncStorage:", error);
        Alert.alert("Error", "Failed to load cart from AsyncStorage.");
      }
    };
    loadCart();
  }, []);

  const removeFromCart = async (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
    try {
      await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Error saving cart to AsyncStorage:", error);
      Alert.alert("Error", "Failed to save cart to AsyncStorage.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/images/back.png")}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        <Text style={styles.businessName}>CHECKOUT</Text>
        <TouchableOpacity>
          <Image
            source={require("../assets/images/Search.png")}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
      </View>
      {/* <Text style={styles.title}>CHECKOUT</Text> */}
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()} // Ensure key is a string
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image
              source={
                item.image ? item.image : require("../assets/images/dress1.png")
              }
              style={styles.productImage}
            />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDescription}>{item.description}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFromCart(item)}
            >
              <Image
                source={require("../assets/images/remove.png")}
                style={styles.removeButtonIcon}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  product: {
    flexDirection: "row",
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
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
  removeButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonIcon: {
    width: 24,
    height: 24,
  },
});

export default CartScreen;
