
export interface BarInter{
    progress(percentage?:number):void;
    percentage:number;
    end():void;
    run(p?:number):void;
}

export interface BarPropsInter{
    //初始进度值,默认为0
    defaultPercentage?:number;
    //loading中显示的文案
    text?:string;
    bar?:any;
    fetching?:number;
    
}

abstract class Bar implements BarInter{
    fetchStatus:number;
    percentage:number;
    bar:any;
    //具体的进度对象
    protected props:BarPropsInter;
    constructor(props:BarPropsInter){
        
        //this.bar = props.bar || null;
        this.props = props || {
            text: '加载中...'
        };
        this.fetchStatus = 0;
        this.resetPercentage();
    }

    resetPercentage(){
        this.percentage = 0;
    }

    progress(p:number){
        //更新进度条状态

        this.setPercentage(p);
    }

    abstract run(p?:number);

    abstract end();

    restart(){
        this.resetPercentage();
        this.run(0);
    }

    setFetchStatus(status:number){
        this.fetchStatus = this.fetchStatus + status;
    }

    getFetchStatus(){
        return this.fetchStatus;
    }

    setPercentage(percentage:number){
        //todo 设置进度条宽度
        this.percentage  = this.percentage + percentage;
        
        if(percentage>=100 || this.fetchStatus<=0){
            //todo 隔600毫秒隐藏进度条
            // this.bar && (
            //     this.bar.style.display = 'none'
            // );
            setTimeout(()=>{
                this.resetPercentage();
            });
        }
    }

    getPercentage(){
        return this.percentage;
    }

}

export default Bar;