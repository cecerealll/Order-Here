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
      // set it back to empty string after
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
      <div className='main'>
        {this.state.user === 'owner' && 
        <div>
          <Orders /> 
          <button className='back-button' onClick={this.backButton}><i className="fas fa-arrow-left"></i></button>
        </div>
        }
        {this.state.user === 'customer' && 
        <div>
          <Menu />
          <button className='back-button' onClick={this.backButton}><i className="fas fa-arrow-left"></i></button>
        </div>
        } 
        {this.state.user === '' && 
          <div className='main-wrapper' >
            <h2>Welcome!</h2>
            <button onClick={this.handleChange} value='customer'>customer?</button>
            <button onClick={this.handleChange} value='owner' >owner?</button>
          </div>   
        }        
         
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));




