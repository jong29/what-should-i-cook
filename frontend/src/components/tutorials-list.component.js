import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";
import "./tutorials-list.css";

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveRecipes = this.retrieveRecipes.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveRecipe = this.setActiveRecipe.bind(this);
    this.removeAllRecipes = this.removeAllRecipes.bind(this);
    this.searchName = this.searchName.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);

    this.state = {
      recipes: [],
      currentRecipe: null,
      currentIndex: -1,
      searchName: "",
      searchType: true
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
    if (this.state.searchType) {
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
    } else {
      TutorialDataService.findByIngredients(this.state.searchName)
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
  }

  toggleSearch() {
    if (this.state.searchType) {
      this.state.searchType = false;
    } else {
      this.state.searchType = true;
    }
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
              id = "nameBar"
              placeholder="????????????"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                id = "nameButton"
                onClick={this.searchName}
              >
                ??????
              </button>
            </div>
          </div>
          <div className="input-group-toggle">
            <span>?????? </span>
            <label className="switch">
              <input type="checkbox"
              onChange={this.toggleSearch}/>
              <span class="slider round"></span>
            </label>
            <span> ??????</span>
          </div>
        </div>
        <div className="col-md-6">
          <h4>????????? ??????</h4>

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
            ?????? ??????
          </button>
        </div>
        <div className="col-md-6">
          {currentRecipe ? (
            <div>
              <h4>?????????</h4>
              <div>
                <label>
                  <strong>??????:</strong>
                </label>{" "}
                {currentRecipe.name}
              </div>
              <div>
                <label>
                  <strong>??????:</strong>
                </label>{" "}
                {currentRecipe.ingredients.join(', ')}
              </div>
              <div>
                <label>
                  <strong>??????:</strong>
                </label>{" "}
                {currentRecipe.link}
              </div>

              <Link
                to={"/tutorials/" + currentRecipe.id}
                className="btn btn-outline-primary btn-sm"
              >
                ??????
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>????????? ???????????????...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}