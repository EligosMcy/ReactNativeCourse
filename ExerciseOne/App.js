import { StyleSheet, View, Platform, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import PokemonCard from './components/PokemonCard';

export default function App() {

  const charmanderData = {
    name: "Charmander",
    image: require("./assets/charmander.png"),
    type: "Fire",
    hp: 39,
    moves: ["Scratch", "Ember", "Fire Spin", "Flame Thrower"],
    weaknesses: ["Water", "Ground", "Rock"],
  };


  const bulbasaurData = {
    name: "Bulbasaur",
    image: require("./assets/bulbasaur.png"),
    type: "Grass",
    hp: 45,
    moves: ["Tackle", "Vine Whip", "Razor Leaf", "Seed Bomb"],
    weaknesses: ["Fire", "Ice", "Flying", "Psychic"],
  };

  const squirtleData = {
    name: "Squirtle",
    image: require("./assets/squirtle.png"),
    type: "Water",
    hp: 44,
    moves: ["Tackle", "Water Gun", "Bubble", "Hydro Pump"],
    weaknesses: ["Electric", "Grass"],
  };

  const pikachuData = {
    name: "Pikachu",
    image: require("./assets/pikachu.png"),
    type: "Electric",
    hp: 35,
    moves: ["Quick Attack", "Volt Tackle", "Thunderbolt", "Iron Tail"],
    weaknesses: ["Ground"],
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <PokemonCard {...charmanderData} />
          <PokemonCard {...bulbasaurData} />
          <PokemonCard {...squirtleData} />
          <PokemonCard {...pikachuData} />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Platform.OS === 'android' ? 10 : 0,
  },
});
