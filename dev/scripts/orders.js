import React from 'react';

// Initialize Firebase


class Orders extends React.Component {
    constructor() {
        super();
        this.state = {
            orders: []
        }
        this.calcTotal = this.calcTotal.bind(this);
        
    }

    componentDidMount() {
        const dbRef = firebase.database().ref('/orders');
        const state = [];
        dbRef.on('value', (orders) => {
            // console.log(orders.val());
            // order
            // userOrders = order
            for(let order in orders.val()) {
                let userOrders = orders.val()[order];
                userOrders.key = order;
                state.push(userOrders);

            }
            console.log(state);
            this.setState({
                orders: state
            });
        })
    }

    calcTotal(order) {
        let total = 0;
        order.forEach(item => {
            total += item.price;
        });
        return total;
    }

    render() {
        return (
            <div className='orders'>
                    <h1>orders</h1>
                <div className ='orders-wrapper'>
                    {/* <div className ='orders' */}
                    {this.state.orders.map((order, i) => {
                        return (
                            <div key={order.key} className='order-list'> 
                                <div className='order'>
                                    <p className='order-num'> { i + 1 }</p>
                                    <p className='order-name'><span>First Name:</span>  {order.firstname}, <span>Last Name:</span>   {order.lastname}</p>
                                                               
                                    <div className='order-food-list'>{order.food.map((foodItem, i) => {
                                        return (
                                            <div>
                                                <p key={`${order.key}-${i}`} className='order-food'>{foodItem.food}</p>
                                                <p className='order-price'>${foodItem.price}</p>
                                            </div>

                                        )
                                    })}
                                    </div>
                                    <p className='order-total'><span>Total:</span> ${this.calcTotal(order.food)}</p> 
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Orders;

// issue with ordering without
