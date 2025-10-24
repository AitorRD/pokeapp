package com.example;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import jakarta.inject.Inject;
import java.util.Map;

@Path("/pokemon")
public class PokemonResource {

    @Inject
    @RestClient
    PokeApiService pokeApiService;

    @GET
    @Path("/{name}")
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, Object> getPokemon(@PathParam("name") String name) {
        return pokeApiService.getPokemon(name);
    }
}

@RegisterRestClient(baseUri = "https://pokeapi.co/api/v2")
interface PokeApiService {
    @GET
    @Path("/pokemon/{name}")
    @Produces(MediaType.APPLICATION_JSON)
    Map<String, Object> getPokemon(@PathParam("name") String name);
}
