import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function GalleryScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGridView, setIsGridView] = useState(false);

  useEffect(() => {
    fetch('https://68ce4ee76dc3f350777e9e67.mockapi.io/api/gallery')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const toggleView = () => {
    setIsGridView((prev) => !prev);
  };

  const renderItem = ({ item }) => (
    <View style={isGridView ? styles.gridItem : styles.listItem}>
      <Image
        source={{ uri: item.image }}
        style={isGridView ? styles.gridImage : styles.listImage}
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Gallery</Text>
          <TouchableOpacity onPress={toggleView}>
            <Ionicons
              name={isGridView ? 'list' : 'grid'}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Nổi bật</Text>
        <FlatList
          data={data.slice(0, 5)} 
          renderItem={({ item }) => (
            <View style={styles.featuredItem}>
              <Image
                source={{ uri: item.image }}
                style={styles.featuredImage}
              />
              <Text style={styles.name}>{item.name}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.sectionTitle}>Danh sách</Text>
        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 40 }} />
        ) : (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={isGridView ? 2 : 1}
            scrollEnabled={false} 
            key={isGridView ? 'G' : 'L'} 
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E7EB', 
  },
  header: {
    backgroundColor: '#1BA9FF',
    height: 65,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  sectionTitle: {
    marginTop: 20,
    marginLeft: 16,
    fontSize: 18,
    fontWeight: '700',
    color: '#1B3A57',
  },
  featuredItem: {
    marginHorizontal: 8,
    alignItems: 'center',
    width: 130,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  featuredImage: {
    width: 110,
    height: 110,
    borderRadius: 12,
    marginBottom: 6,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    padding: 14,
    backgroundColor: '#fff',
    marginVertical: 6,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  gridItem: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  listImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 14,
  },
  gridImage: {
    width: 110,
    height: 110,
    borderRadius: 12,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B3A57',
  },
  email: {
    fontSize: 14,
    color: '#6B7280', 
  },
});