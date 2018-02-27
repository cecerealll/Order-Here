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
            // counter: 0
        };
        this.handleAddToOrder = this.handleAddToOrder.bind(this);
        this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.calcTotal = this.calcTotal.bind(this);
        // this.orderCounter = this.orderCounter.bind(this);
        // this.showOrder = this.showOrder.bind(this);
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

        // console.log(e);
        this.setState({
            order: this.state.order.concat([e])
        });

        // return this.state.order;
        // return e.target.value;
        // console.log(this.state.order);

    }

    
    // orderCounter() {
    //     let orderArray = this.state.order;
    //     // let newArray = [];
    //     orderArray.forEach((order) => {
    //         let count = 0;
    //         order.count = count;

    //     //     order.count = count;
    //         // console.log(orderArray);
    //     });
    //     console.log(orderArray);
    // }

        // // });
        // for(let i = 0; i < orderArray.length; i++) {
        //     let count = 0;
        //     for( let j = i; j< orderArray.length; j++) {
        //         if(i !==j && orderArray[i] === orderArray[j]){
        //             // console.log(orderArray[j]);
        //             orderArray[j].count = count;
        //             count ++;
        //             newArray.push(orderArray[j]);
        //         }
        //         // console.log ('fine');
        //     }
        // }
        //     // orderArray[i].count = count;
        //     console.log(newArray);


        // }
        // for(let i=0; i<orderArray.length; i++) {
        //     let counts;
        //     console.log(orderArray[i])
        //     if(orderArray[i].food === undefined) {
        //         orderArray[i].food.counts = 1;
        //     } else {
        //         console.log('dup');
        //     }
            
        // }
        // console.log(orderArray);
        // let count ={};
        // orderArray.forEach(function(i) {
        //     count[i] = (count[i] || 0) + 1
        //     console.log(i);
        // });

        // uniqueCount = ["a", "b", "c", "d", "d", "e", "a", "b", "c", "f", "g", "h", "h", "h", "e", "a"];
        // var count = {};
        // uniqueCount.forEach(function (i) { count[i] = (count[i] || 0) + 1; });
        // console.log(count);

    

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
                            <p>my total {this.calcTotal()}</p>  
                            <div><p>my order</p>
                                {this.state.order.map((foodItem, i) => {
                                    // for(let food in foodItem){
                                    //     // console.log(foodItem[food]);
                                    // }
                                return ( 
                                    <p key={`${this.state.order.key}-${i}`}>{foodItem.food}   {foodItem.price}</p>
                                )
                            })}
                            </div> 
                            <button>checkout</button>

                        </div>    
                    </form>
                    : 
                    <div className='order-conf'>
                        <div>
                        <p>order confirmation</p>
                        <p>my total {this.calcTotal()}</p>
                        <p>Thank you {this.state.firstname}     {this.state.lastname} for your order, it will be processed shortly</p>
                        <p>{this.state.number}</p>
                            {this.state.order.map((foodItem, i) => {
                                // for(let food in foodItem){
                                //     // console.log(foodItem[food]);
                                // }
                                return (
                                    <p key={`${this.state.order.key}-${i}`}>{foodItem.food} {foodItem.price}</p>
                                )
                            })}
                        </div>     
                    </div>}
                </div>
            </div>
        )
    }
}

export default Menu;