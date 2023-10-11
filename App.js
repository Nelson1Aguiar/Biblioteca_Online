import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "./src/components/pesquisaLivro/index";
import BibliotecaOnline from "./src/components/pesquisaLivro/index";

export default function App() {
  return (
    <View style={styles.container}>
      <BibliotecaOnline/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
