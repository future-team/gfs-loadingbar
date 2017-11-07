import * as React from 'react';
import {Component,PropTypes} from 'react';
import Bar,{BarPropsInter} from '../Bar';

var fetching = 0;

let dispatch = (props:any)=>{
    switch(props.type){
        case 'fetch_begin':
            props.show(props.type);
            break;
        case 'fetch_submit_begin':
            props.show(props.type);
            break;
        case 'fetch_end':
            props.hide();
            break;

    }
};

function getDispatch(){
    return window['dispatch'] || dispatch;
};

export default class LoadingBar extends Bar{
    bar:any;
    constructor(options:{
        bar?:any
    }={bar:null}){

        super( options );
        this.bar = options.bar || null;
    }

    run(props:any={
        method:'get'
    }){
        // dispatch();
        if (fetching === 0) {
            getDispatch()({
                type: props.method.toLowerCase() === 'get' ?'fetch_begin':'fetch_submit_begin',
                show:this.bar ? this.bar.show:()=>{}
            });
        }
        fetching+=1;
    }

    end(){
        fetching -= 1;
        if(fetching<=0){
            fetching = 0;
        }
        if (fetching === 0) {
            getDispatch()({
                type: 'fetch_end',
                hide:this.bar ? this.bar.hide:()=>{}
            });
        }
    }
}