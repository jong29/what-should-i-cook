package WhatShouldICook.Backend.model;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "recipes")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name")
    private String name;

    @ElementCollection
    @Column(name = "ingredients")
    private List<String> ingredients = new ArrayList<>();

    @Column(name = "link")
    private String link;

    public Recipe(String name, List<String> ingredients, String link) {
        this.name = name;
        this.ingredients = ingredients;
        this.link = link;
    }

    public Recipe() {

    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    @Override
    public String toString() {
        return "Recipe{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", ingredients=" + ingredients +
            ", link='" + link + '\'' +
            '}';
    }
}
