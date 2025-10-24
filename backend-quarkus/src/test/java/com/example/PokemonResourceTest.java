package com.example;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
public class PokemonResourceTest {

    @Test
    public void testHelloEndpoint() {
        given()
          .when().get("/pokemon")
          .then()
             .statusCode(200)
             .body(is("Pokemon API is ready!"));
    }

}
