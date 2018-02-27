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
            lastname: '',
            submitted: false
        };
        this.handleAddToOrder = this.handleAddToOrder.bind(this);
        this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.calcTotal = this.calcTotal.bind(this);
    }
    
    

    handleChange(e) {

        
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleAddToOrder(e) {
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
        this.setState({
            submitted: true
        })

        // console.log(this.state);
    }

    confirmOrder() {
        this.setState({
            submitted:false
        })
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
            <div className='menu'> 
                <div className='menu-wrapper'>
                    <h1>menu</h1>
                    {!this.state.submitted ? 
                    <form onSubmit={this.handleSubmitOrder}>
                        <ul className='menu-items'>
                            {/* {this} */}
                            {this.state.menuItem.map((item, i) => {
                                return (
                                    <li key={i}>
                                        <div className='menu-item' >
                                            <p>{item.food}</p> 
                                             <p className='price'>${item.price}</p>
                                        </div>
                                        <div className='add-to-order' onClick={() => this.handleAddToOrder(item)}>+</div>
                                    </li>
                                )
                            
                            })}
                        </ul>
                        <div className='my-order'>
                            <input type="text" id='number' placeholder='Phone Number' required onChange={this.handleChange} />
                            <input type="text" id='firstname' placeholder='First Name' required onChange={this.handleChange} />
                            <input type="text" id='lastname' placeholder='Last Name' required onChange={this.handleChange}/>   
                            <div><p className='my-order-text'>my order</p>
                                {this.state.order.map((foodItem, i) => {
                                    // for(let food in foodItem){
                                    //     // console.log(foodItem[food]);
                                    // }
                                return ( 
                                    <p key={`${this.state.order.key}-${i}`}>{foodItem.food}   ${foodItem.price}</p>
                                )
                            })}
                            </div> 
                            <p className='total'>my total {this.calcTotal()}</p>    
                            <button className='checkout'>checkout</button>

                        </div>    
                    </form>
                    : 
                    <div className='order-conf'>
                        <div>
                            <h2>order confirmation!</h2>
                            {/* <p>order confirmation</p> */}
                            <p>Thank you {this.state.firstname}   {this.state.lastname} for your order! It will be processed shortly</p>
                            <p className="conf-num"><span>Your Number:</span> {this.state.number}</p>
                            <p><span>Your Order:</span></p>
                                {this.state.order.map((foodItem, i) => {
                                    return (
                                        <p key={`${this.state.order.key}-${i}`}>{foodItem.food} {foodItem.price}</p>
                                    )
                                })}
                            <p className="conf-total"><span>Your total is</span> ${this.calcTotal()}</p>
                        </div>     
                    </div>}
                </div>
            </div>
        )
    }
}

export default Menu;