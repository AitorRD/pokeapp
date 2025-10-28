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
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px' }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '16px' }}>PokeDex Lite</h1>
      <input
        style={{ border: '1px solid #ccc', padding: '8px', marginBottom: '8px', borderRadius: '4px' }}
        placeholder="Enter Pokémon name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button 
        style={{ backgroundColor: '#3b82f6', color: 'white', padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer' }} 
        onClick={search}
      >
        Search
      </button>

      {pokemon && (
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', textTransform: 'capitalize' }}>{pokemon.name}</h2>
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
