import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import api from './services/api';

const App = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then(response => {
      console.log(response.data);
      setProjects(response.data);
    });
  }, []);

  const handleAddProject = async () => {
    const response = await api.post('/projects', {
      title: `novo projeto ${Date.now()}`,
      owner: 'wiliam Lee',
    });

    const project = response.data;

    setProjects([...projects, project]);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.container}
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({item: project}) => (
            <Text key={project.id} style={styles.title}>
              {project.title}
            </Text>
          )}
        />
      </SafeAreaView>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.6}
        onPress={handleAddProject}>
        <Text style={styles.buttonText}>Adicionar projetos</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#fff',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default App;
