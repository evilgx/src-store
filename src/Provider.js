import React from 'react';
import PropTypes from 'prop-types';
import { storeShape } from './untils/PropsTypes'

class Provider extends React.Component{
    static propTypes ={
        store:storeShape.isRequired,
        children:PropTypes.element.isRequired
    }

    static childContextTypes={
        store:storeShape.isRequired
    }

    constructor(props,context){
        super(props,context);
        this.store = props.store;
    }

    getChildContext() {
        return { store: this.store}
    }

    render() {
        return React.Children.only(this.props.children);
    }
}

export function create(props){
    let listen = [];
    let curProps = props;
    return {
        getState(){
            return curProps;
        },
        subscribe(handle){
            if(typeof handle !=='function'){
                throw new Error('argument must be a function');
            }

            listen.push(handle);
            return function unsubscribe(){
                let idx = listen.indexOf(handle);
                listen.splice(idx,1);
            }
        },
        dispatch(nextProps){
            if(!listen.length) return;

            curProps = {...curProps,...nextProps};

            for(let i=0;i<listen.length;i++){
                listen[i]();
            }
        }
    }
}

export default Provider;