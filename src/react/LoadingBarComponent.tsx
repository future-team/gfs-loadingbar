import * as React from 'react';
import {Component,PropTypes} from 'react';
import Bar,{BarPropsInter} from '../Bar';
import '../../css/loadingbar.less';

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