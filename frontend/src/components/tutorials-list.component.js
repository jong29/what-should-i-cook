import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.onChangeSearchIngredients = this.onChangeSearchIngredients.bind(this);
    this.retrieveRecipes = this.retrieveRecipes.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveRecipe = this.setActiveRecipe.bind(this);
    this.removeAllRecipes = this.removeAllRecipes.bind(this);
    this.searchName = this.searchName.bind(this);
    this.searchIngredients = this.searchIngredients.bind(this);

    this.state = {
      recipes: [],
      currentRecipe: null,
      currentIndex: -1,
      searchName: "",
      searchIngredients: ""
    };
  }

  componentDidMount() {
    this.retrieveRecipes();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  onChangeSearchIngredients(e) {
    const searchIngredients = e.target.value;

    this.setState({
      searchIngredients: searchIngredients
    });
  }

  retrieveRecipes() {
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          recipes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveRecipes();
    this.setState({
      currentRecipe: null,
      currentIndex: -1
    });
  }

  setActiveRecipe(recipe, index) {
    this.setState({
      currentRecipe: recipe,
      currentIndex: index
    });
  }

  removeAllRecipes() {
    TutorialDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    TutorialDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          recipes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchIngredients() {
    TutorialDataService.findByIngredients(this.state.searchIngredients)
      .then(response => {
        this.setState({
          recipes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, searchIngredients, recipes, currentRecipe, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                검색
              </button>
            </div>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Ingredient"
              value={searchIngredients}
              onChange={this.onChangeSearchIngredients}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchIngredients}
              >
                검색
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>레시피 목록</h4>

          <ul className="list-group">
            {recipes &&
              recipes.map((recipe, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveRecipe(recipe, index)}
                  key={index}
                >
                  {recipe.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.Recipes}
          >
            전체 제거
          </button>
        </div>
        <div className="col-md-6">
          {currentRecipe ? (
            <div>
              <h4>레시피</h4>
              <div>
                <label>
                  <strong>이름:</strong>
                </label>{" "}
                {currentRecipe.name}
              </div>
              <div>
                <label>
                  <strong>재료:</strong>
                </label>{" "}
                {currentRecipe.ingredients.join(', ')}
              </div>
              <div>
                <label>
                  <strong>링크:</strong>
                </label>{" "}
                {currentRecipe.link}
              </div>

              <Link
                to={"/tutorials/" + currentRecipe.id}
                className="btn btn-outline-primary btn-sm"
              >
                수정
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>요리를 선택하세요...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}