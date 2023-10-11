import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet} from 'react-native';

const BibliotecaOnline = () => {
  const [consultaPesquisa, setConsultaPesquisa] = useState('');
  const [livros, setLivros] = useState([]);
  const [nota, setNota] = useState({});
  const [livroAtualId, setLivroAtualId] = useState('');

  const pesquisa = async () => {
    try {
      const resposta = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${consultaPesquisa}`
      );

      const dados = await resposta.json();
      const livrosComNota = dados.items.map((livro) => ({
        ...livro,
        nota: nota[livro.id] || 0,
      }));

      setLivros(livrosComNota);
    } catch (erro) {
      console.error("Erro ao buscar livros:", erro);
    }
  };

  const renderizarEstrelas = (numEstrelas) => {
    const estrelas = [];
    for (let i = 1; i <= 5; i++) {
      estrelas.push(
        <Text
          key={i}
          style={{
            fontSize: 30,
            color: i <= numEstrelas ? 'gold' : 'gray',
            marginRight: 10,
          }}
        >
          ★
        </Text>
      );
    }
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {estrelas}
      </View>
    );
  };


  const definirNota = (id) => {
    setLivroAtualId(id);
    const livrosAtualizados = livros.map((livro) => {
      if (livro.id === livroAtualId) {
        livro.nota = nota[livroAtualId];
      }
      return livro;
    });
    setLivros(livrosAtualizados);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Biblioteca online</Text>
      <TextInput
        style={styles.entrada}
        placeholder="Digite sua pesquisa"
        onChangeText={(texto) => setConsultaPesquisa(texto)}
        value={consultaPesquisa}
      />
      <Button styles title="Pesquisar" onPress={pesquisa} />
      <FlatList
        data={livros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemLivro}>
            <Text style={styles.tituloLivro}>{item.volumeInfo.title}</Text>
            <Text>Autor: {item.volumeInfo.authors && item.volumeInfo.authors.join(', ')}</Text>
            <Text style={styles.URL}>{item.volumeInfo.previewLink}</Text>
            {renderizarEstrelas(item.nota)}
            <TextInput
              style={styles.entradaNota}
              placeholder="Defina a nota (0-5)"
              keyboardType="numeric"
              onChangeText={(texto) => setNota({ ...nota, [item.id]: parseInt(texto, 10) })}
              value={nota[item.id] ? nota[item.id].toString() : ''}
            />
            <Button title="Definir Nota" onPress={() => definirNota(item.id)} />

          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 70,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  entrada: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  itemLivro: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
  tituloLivro: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  entradaNota: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 8,
  },
  URL: {
    color: 'blue',
  },
});

export default BibliotecaOnline;
