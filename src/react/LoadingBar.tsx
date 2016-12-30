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

export class LoadingBar extends Bar{
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

/**
 * 
 * <LoadingBarComponent fetching={1} />
 */
export default class LoadingBarComponent extends Component<BarPropsInter,any>{

    //bar:Bar;
    constructor(props){
        super(props);

        //this.bar = new Bar();
        this.state = {
            display:'none',
            width:0
        };
    }

    static defaultProps = {
        
    }
    
    isShow():boolean{
        let {display=''} = {...this.state};
        return display == '' || display.toLowerCase() == 'block' ;
    }

    show(){
        this.setState({
            display:'block'
        });
        setTimeout(()=>{
            this.setProgress();
        },200);
    }

    hide(){
        this.setState({
            display:'none',
            width:0
        });
    }

    setProgress(){
        //(50 + Math.random() * 30)
        let p:number = this.state.width+(50 + Math.random() * 30);
        let w:number = this.state.width;
        const d:number= 5;

        if(p<=w){
            p = w+d;
        }
        if(p>=100){
            p = w;
        }

        this.setState({
            width:p
        });
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.fetching==0){
            this.setState({
                width:101
            });
            setTimeout(()=>{
                this.hide();
            },1200);
        }else{
            this.show();
        }
    }

    componentDidMount(){
        if(this.props.fetching){
            this.show();
        }
    }

    render(){
        return (
            <div className="gfs-loadingbar" style={{
                display:this.state.display,
                width:this.state.width+'%'
            }}></div>
        );
    }
}