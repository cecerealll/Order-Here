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
            <div>
                {this.state.orders.map((order, i) => {
                    return (
                        <div key={order.key}> 
                            <p> order# { i + 1 }</p>
                            <p>{order.firstname}</p>
                            <p>{order.lastname}</p>
                            <p>total {this.calcTotal(order.food)}</p>                            
                            <div>{order.food.map((foodItem, i) => {
                                return (
                                    <p key={`${order.key}-${i}`}>{foodItem.food} {foodItem.price}</p>
                                )
                            })}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Orders;
