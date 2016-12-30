import LoadingBar from './LoadingBar';
import {BarPropsInter} from './Bar';

export default class MaskBar extends LoadingBar{

    constructor(props:BarPropsInter){
        super(props);
    }

    setProgress(progress:number){
        //this.bar.style.width = progress+'%';
    }

    render(){
        /*
        <div class="gfs-loadingbar-mask" style="display: ;">
            <div class="gfs-content">
                加载中。。。
            </div>
        </div>
        */
        if(this.bar) return ;
        let loading = document.createElement('div');
        loading.setAttribute('class','gfs-loadingbar-mask');
        loading.innerHTML = `
            <div class="gfs-content">
                ${this.props.text}
            </div>
        `;
        document.body.appendChild(loading);

        this.bar = loading;
    }
}

