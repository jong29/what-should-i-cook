import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeIngredients = this.onChangeIngredients.bind(this);
    this.onChangeLink = this.onChangeLink.bind(this);
    this.saveDish = this.saveDish.bind(this);
    this.newDish = this.newDish.bind(this);

    this.state = {
      id: null,
      name: "",
      ingredients: [], //change to array
      link: "",

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeIngredients(e) {
    this.setState({
      ingredients: e.target.value.split(',').map(element => element.trim()) //change to array
    });
  }

  onChangeLink(e) {
    this.setState({
      link: e.target.value //change to array
    });
  }

  saveDish() {
    var data = {
      name: this.state.name,
      ingredients: this.state.ingredients,
      link: this.state.link
    };

    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          ingredients: response.data.ingredients,
          link: response.data.link,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newDish() {
    this.setState({
      id: null,
      name: "",
      ingredients: [],
      link: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>성공적으로 제출되었습니다!</h4>
            <button className="btn btn-success" onClick={this.newDish}>
              추가
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">요리</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ingredients">재료</label>
              <input
                type="text"
                className="form-control"
                id="ingredients"
                required
                value={this.state.ingredients}
                onChange={this.onChangeIngredients}
                name="ingredients"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ingredients">링크</label>
              <input
                type="text"
                className="form-control"
                id="link"
                required
                value={this.state.link}
                onChange={this.onChangeLink}
                name="link"
              />
            </div>

            <button onClick={this.saveDish} className="btn btn-success">
              제출
            </button>
          </div>
        )}
      </div>
    );
  }
}