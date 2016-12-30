import * as React from 'react';
import {Component,PropTypes} from 'react';
import LoadingBarComponent,{LoadingBar} from './LoadingBar';

export default class MaskBarComponent extends LoadingBarComponent {
    
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="gfs-loadingbar-mask" style={{
                display:this.state.display
            }}>
                <div className="gfs-content">
                    {this.props.children || '加载中...'}
                </div>
            </div>
        );
    }
}