import React from 'react';  



// this allows me to recieve data from firebase specifically the menu section?
class Menu extends React.Component {
    constructor() {
        super();
        this.state = {
            menuItem: [],
            order: [],
            number: '',
            firstname: '',
            lastname: ''
        };
        this.handleAddToOrder = this.handleAddToOrder.bind(this);
        this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.calcTotal = this.calcTotal.bind(this);
    }
    
    

    handleChange(e) {
        // e.preventDefault();
        
        this.setState({
            [e.target.id]: e.target.value
            // number: e.target.value
        });
    }

    handleAddToOrder(e) {
        // e.preventDefault();
        // const order = this.state.order;


        this.setState({
            order: this.state.order.concat([e])
        });

    }

    handleSubmitOrder(e) {
        e.preventDefault();
        const dbRef = firebase.database().ref('/orders');
        dbRef.push({
            food: this.state.order,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            number: this.state.number
        });

        // console.log(this.state);
    }

    componentDidMount() {
        const dbRef = firebase.database().ref('/menu');
        const state = [];
        dbRef.on('value', (menu) => {
            const items = menu.val();
            // console.log(menu.val());
            for (let item in items) {
                state.push(items[item]);

            }

            console.log(state);
            this.setState({
                menuItem: state
            })
            // const state = [];
            // for(let item in items) {
            //   state.push(items[item]);
            // }
            // console.log(state);      

        });

    }

    calcTotal() {
        let total = 0;
        this.state.order.forEach((order) => {
            total += order.price;
        });
        return total;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmitOrder}>
                <ul>
                    {/* {this} */}
                    {this.state.menuItem.map((item, i) => {
                        return (
                            <li key={i}>
                                <p>  {item.food}</p> 
                                <p>{item.price}</p>
                                <div onClick={() => this.handleAddToOrder(item)}>add to order</div>
                            </li>
                        )
                    
                    })}
                </ul>
                <input type="text" id='number' placeholder='Phone Number' required onChange={this.handleChange} />
                <input type="text" id='firstname' placeholder='First Name' required onChange={this.handleChange} />
                <input type="text" id='lastname' placeholder='Last Name' required onChange={this.handleChange}/>   
                <p>my total {this.calcTotal()}</p>             
                <button>checkout</button>
            </form>
        )
    }
}

export default Menu;