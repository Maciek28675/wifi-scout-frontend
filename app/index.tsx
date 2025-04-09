import { Text, View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

export default function Index() {

  const [data, setData] = useState<string>("");

  const getSampleData = async () => {
    try {
      const response = await fetch('http://192.168.1.3:8000/')
      const json = await response.json();
      setData(json.message);
    } 
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getSampleData()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1575B9'
  }

})
