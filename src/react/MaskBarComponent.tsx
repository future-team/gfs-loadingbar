import * as React from 'react';
import {Component,PropTypes} from 'react';
import LoadingBarComponent from './LoadingBarComponent';

import '../../css/loadingbar-mask.less';

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
                    {this.props['message'] || '加载中...'}
                </div>
            </div>
        );
    }
}