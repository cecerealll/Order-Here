import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './menu';
import Orders from './orders';

var config = {
  apiKey: "AIzaSyC3w2D15l09gkuUWsBafWDNmJ3-m8iKYNI",
  authDomain: "order-pick-up.firebaseapp.com",
  databaseURL: "https://order-pick-up.firebaseio.com",
  projectId: "order-pick-up",
  storageBucket: "order-pick-up.appspot.com",
  messagingSenderId: "194537367454"
};

firebase.initializeApp(config);




class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.backButton =this.backButton.bind(this);
    
  }
  


  handleChange(e) {
    // console.log (e.target.value);
    // console.log(e.target);
    this.setState({
      user: e.target.value
    });

  }

  backButton() {
    this.setState({
      user: ''
    });
  }

  render() {
    return (
      <div>
        { this.state.user === 'owner' && <Orders />}
        {this.state.user === 'customer' && <Menu />} 
    
        
        <p>customer? <input type="radio" name="user" onChange={this.handleChange} value='customer'/></p>
        <p>owner? <input type="radio" name="user" onChange={this.handleChange} value='owner' /></p>
        <button onClick={this.backButton}>back</button>                
        
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));




