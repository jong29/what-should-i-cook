import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { withRouter } from '../common/with-router';

class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeIngredients = this.onChangeIngredients.bind(this);
    this.onChangeLink = this.onChangeLink.bind(this);
    this.getRecipe = this.getRecipe.bind(this);
    this.updateRecipe = this.updateRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);

    this.state = {
      currentRecipe: {
        id: null,
        name: "",
        Ingredients: [],
        Link: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getRecipe(this.props.router.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentRecipe: {
          ...prevState.currentRecipe,
          name: name
        }
      };
    });
  }

  onChangeLink(e) {
    const link = e.target.value;
    
    this.setState(prevState => ({
      currentRecipe: {
        ...prevState.currentRecipe,
        link: link
      }
    }));
  }

  onChangeIngredients(e) {
    const ingredients = e.target.value;
    
    this.setState(prevState => ({
      currentRecipe: {
        ...prevState.currentRecipe,
        ingredients: ingredients.split(',').map(element => element.trim())
      }
    }));
  }

  getRecipe(id) {
    TutorialDataService.get(id)
      .then(response => {
        this.setState({
          currentRecipe: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateRecipe() {
    TutorialDataService.update(
      this.state.currentRecipe.id,
      this.state.currentRecipe
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "레시피가 성공적으로 업데이트 되었습니다!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteRecipe() {    
    TutorialDataService.delete(this.state.currentRecipe.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/tutorials');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentRecipe } = this.state;

    return (
      <div>
        {currentRecipe ? (
          <div className="edit-form">
            <h4>레시피</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">이름</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentRecipe.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ingredients">재료</label>
                <input
                  type="text"
                  className="form-control"
                  id="ingredients"
                  value={currentRecipe.ingredients}
                  onChange={this.onChangeIngredients}
                />
              </div><div className="form-group">
                <label htmlFor="ingredients">링크</label>
                <input
                  type="text"
                  className="form-control"
                  id="link"
                  value={currentRecipe.link}
                  onChange={this.onChangeLink}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteRecipe}
            >
              삭제
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateRecipe}
            >
              업데이트
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>레시피를 선택하세요...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Tutorial);