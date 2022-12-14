import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/recipes");
  }

  get(id) {
    return http.get(`/recipes/${id}`);
  }

  create(data) {
    return http.post("/recipes", data);
  }

  update(id, data) {
    return http.put(`/recipes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/recipes/${id}`);
  }

  deleteAll() {
    return http.delete(`/recipes`);
  }

  findByName(name) {
    return http.get(`/recipes?name=${name}`);
  }

  findByIngredients(ingredients) {
    return http.get(`/recipeByIngredients?ingredients=${ingredients}`);
  }
  
}

export default new TutorialDataService();