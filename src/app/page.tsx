import PokemonSearch from '../components/PokemonSearch';

export default function Home() {
  return (
    <main>
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Search Pokémon</h1>
      <PokemonSearch />
    </main>
  );
}
