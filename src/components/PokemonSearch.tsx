"use client";

import { useState, ChangeEvent, KeyboardEvent } from "react";
import {
  TextInput,
  Group,
  Badge,
  Text,
  Image,
  Button,
  Loader,
  Card,
  Paper,
} from "@mantine/core";

interface PokemonType {
  type: {
    name: string;
  };
}

interface Pokemon {
  name: string;
  weight: number;
  height: number;
  sprites: {
    front_default: string;
  };
  types: PokemonType[];
}

const PokemonSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {

    if (query.trim() === "") {
    setError("Please enter a Pokémon name.");
    return;
  }
    
    setLoading(true);
    setError(null);
    setPokemon(null);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error("Pokémon not found");
      }
      const data: Pokemon = await response.json();
      setPokemon(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: "1rem" }}>
      <TextInput
        placeholder="Pokémon's name"
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
        onKeyPress={handleKeyPress}
      />
      <Button
        onClick={handleSearch}
        disabled={loading}
        style={{ marginTop: "1rem" }}
      >
        Search
      </Button>
      {loading && <Loader style={{ marginTop: "1rem"}} />}
      {error && (
        <Text color="red" style={{ marginTop: "1rem" }}>
          {error}
        </Text>
      )}
      {pokemon && (
        <div
          style={{
            paddingTop: "1rem",
            maxWidth: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Paper p="xl" radius="xl">
            <Card shadow="sm" padding="lg" radius="xl" withBorder>
              <Card.Section>
                <Image
                  src={pokemon.sprites.front_default}
                  height={200}
                  width={200}
                />
              </Card.Section>
              
              <Group justify="space-between" mt="md" mb="xs">

                <Text fw={500}>
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </Text>
              </Group>

              <Text size="sm" color="dimmed">
                Peso: {pokemon.weight}
              </Text>
              <Text size="sm" color="dimmed">
                Altezza: {pokemon.height}
              </Text>
              <Text size="sm" color="dimmed">
                Tipo:{" "}
                {pokemon.types
                  .map(
                    (t) =>
                      t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
                  )
                  .join(", ")}
              </Text>
            </Card>
          </Paper>
        </div>
      )}
    </div>
  );
};

export default PokemonSearch;
