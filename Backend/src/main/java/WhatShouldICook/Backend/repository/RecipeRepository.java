package WhatShouldICook.Backend.repository;

import WhatShouldICook.Backend.model.Recipe;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {

//    List<Recipe> findBy(boolean published);

    List<Recipe> findByNameContaining(String name);

}
