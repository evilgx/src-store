import React from 'react';
import {storeShape}  from './untils/PropsTypes';
import simpleEqual from 'simple-equal';
import hoistNonReactStatics from 'hoist-non-react-statics';

export default function connect(mapStateToProps){
    function getDisplayName(component){
        return component.displayName||component.name||'Component';
    }

    let defaultMapStateToProps = ()=>({});
    let finalMapStateToProps = mapStateToProps||function(){return {}};
    let souldSubscribe = Boolean(mapStateToProps);
    let souldComponentUpdate = true;

    return function(WrappedComponent){
        class Connect extends React.Component{
            static contextTypes = {
                store:storeShape
            }

            static displayName  = `HOC-CONNECTED-${getDisplayName(WrappedComponent)}`

            constructor(props,context){
                super(props,context);
                this.store = context.store;
                let mapProps = finalMapStateToProps(this.store.getState(),props);
                this.state = {data:mapProps};
            }

            componentDidMount(){
                this.trySubscribe();
            }

            componentWillUnmount(){
                if(this.unsbuscribe){
                    this.unsubscribe();
                }
            }

            souldComponentUpdate(){
                return souldComponentUpdate;
            }

            trySubscribe(){
                if(souldSubscribe){
                    this.unsbuscribe = this.store.subscribe(()=>{
                        let nextState = this.store.getState();
                        let nextProps = finalMapStateToProps(nextState);
                        this.onStateChange(nextProps);
                    });
                }
            }

            onStateChange(nextProps){
                if(!simpleEqual(this.state.data,nextProps)){
                    let newData = {...this.state.data,...nextProps};
                    souldComponentUpdate = true;
                    this.setState({data:newData});
                }else{
                    souldComponentUpdate = false;
                }
            }

            getWrappedInstance(){
                return this.wrappedInstance;
            }

            render(){
                let mapProps = {...this.props,...this.state.data};
                let props = {
                    ...mapProps,
                    store:this.store
                };

                return <WrappedComponent {...props} ref={ref=>{this.wrappedInstance = ref}}/>
            }
        }

        return hoistNonReactStatics(Connect,WrappedComponent);
    }
}