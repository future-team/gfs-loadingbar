import * as React from 'react';
import {Component,PropTypes} from 'react';
import { connect } from 'react-redux';

@connect(state => ({
    fetching: state.fetching
}))
export default class Connect extends Component<any,any>{
    constructor(props){
        super(props);
    }

    render(){
        let {props} = this;
        return (
            <div>{
                React.Children.map(props.children, (child:any) => {
                    return React.cloneElement(child, {...props})
                })
            }</div>
        );
    }
}