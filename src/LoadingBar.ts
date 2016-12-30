import Bar,{BarPropsInter} from './Bar';
import '../css/loadingbar.less';

export default class LoadingBar extends Bar{
    timeoutObj:any;
    constructor(props:BarPropsInter){
        
        super(props || null );
        this.render();
    }

    run(p?:number){

        p = p|| 0;
        if(this.getFetchStatus() >=1 ){
            return ;
        }

        this.setFetchStatus(+1);
        this.show();
        clearTimeout(this.timeoutObj);
        this.timeoutObj = setTimeout(((p:number)=>{
            return ()=>{
                this.progress((50 + Math.random() * 30)+p);
                //设置进度
                this.setProgress(this.getPercentage() );
            }
        })(p),100);
        
    }

    setProgress(progress:number){
        this.bar.style.width = progress+'%';
    }

    show(){
        this.bar.style.display = 'block';
    }

    hide(){
        this.bar.style.display = 'none';
        this.setProgress(0);
        //this.setPercentage(0);
    }

    end(){

        if(this.bar){
            
            this.setFetchStatus(-1);

            if(this.getFetchStatus() <= 0 ){
                this.setPercentage(101);
                this.setProgress(this.getPercentage() );
                setTimeout(()=>{
                    
                    this.hide();
                },1000);
            }
        }
        
    }

    render(){
        if(this.bar) return ;
        let loading = document.createElement('div');
        loading.setAttribute('class','gfs-loadingbar');
        document.body.appendChild(loading);

        this.bar = loading;
    }
}