import React, { Component } from 'react'
import ReactDom from 'react-dom'

// import LoadingBarComponent,{LoadingBar} from '../../src/react/LoadingBar'
// import {fetching} from '../../src/react/fetching'
// import FetchMiddleware from '../../src/react/FetchMiddleware'
import {LoadingBarComponent,fetching,FetchMiddleware,LoadingBar,Connect} from '../../src/index.react';

import { Provider,connect } from 'react-redux'
import { createStore,applyMiddleware,combineReducers } from 'redux'


let loadingbar = new LoadingBar()

function fetchingAction(){
    
    loadingbar.run()
    setTimeout( ()=>{
        loadingbar.end()
    },2000)
}


let store = createStore(combineReducers({fetching:fetching}),applyMiddleware(FetchMiddleware) )

class Page extends Component {
    constructor(props) {
        super(props)
        
        fetchingAction()
    }

    render() {
        
        return (
             <Provider store={store}>
                <div>
                    <button id="j-react-loadingbar">页面载入状态进度栏</button>
                    <button id="j-react-maskbar">带有遮罩层的加载状态</button>
                    <Connect>
                        <LoadingBarComponent />
                    </Connect>
                </div>
             </Provider>
           
        )
    }
}

export default function append(){
    window.onload = function(){
        let root = document.getElementById('root')
        if(root){
            ReactDom.render( <Page /> ,root)
        }
        
    }
}