# src-store

A simple state store like react-redux for React

## Install

```sh
$ npm install --save src-store
```

## Example

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider,create,connect} from 'src-store';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.store = create({sum:0});
    }

    render() {
        return <Provider store={this.store}>
                    <Counter/>
                </Provider>

    }
}

class Counter extends React.Component{
    componentDidMount(){
        let res = this.refs.res.getWrappedInstance();
        res.setStyle();
    }

    render(){
        return  <div>
                    <Buttons />
                    <Result ref={'res'}/>
                </div>
    }
}

@connect()
class Buttons extends React.Component {
    handleClick = num => () => {
        const {store} = this.props;
        const {sum} = store.getState();
        store.dispatch({ sum:sum + num });
    }

    render() {
        return <div>
                    <button onClick={this.handleClick(1)}>+</button>
                    <button onClick={this.handleClick(-1)}>-</button>
            </div>
    }
}

@connect((state) => ({sum:state.sum}))
class Result extends React.Component {
    setStyle(){
        this.refs.num.style.color = 'red';
    }

    render() {
        return (
            <div ref={'num'}>{this.props.sum}</div>
        );
    };
}

ReactDOM.render(<Index/>,document.getElementById('root'));
```

##API

### `create(initialState)`
A function like redux's createStore,return a store handle state change,accpet a plain object;

### `<Provider store>`
A Connect wrapper that the store transfer state available; 

### `connect(mapStateToProps)`
A function like react-readux's connect but only accept mapStateToProps,handle changes call `store.dipatch(newState)`
