"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

export default function Home() {
  const [name, setName] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const search = async () => {
    const res = await axios.get(`http://localhost:8080/pokemon/${name}`);
    setPokemon(res.data);
  };

  return (
    <main className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">PokeDex Lite</h1>
      <input
        className="border p-2 mb-2"
        placeholder="Enter Pokémon name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={search}>
        Search
      </button>

      {pokemon && (
        <div className="mt-6 text-center">
          <h2 className="text-2xl capitalize">{pokemon.name}</h2>
          <Image 
            src={pokemon.sprites.front_default} 
            alt={pokemon.name}
            width={96}
            height={96}
          />
          <p>Type: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
        </div>
      )}
    </main>
  );
}
