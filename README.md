# gfs-loadingbar

状态加载

## 安装

```js

	npm instsall gfs-loadingbar --save
```

## 使用

### 组件提供了多种loadingbar呈现方式，包括

* `MaskBar` 	类似蒙层在页面中剧中展示加载状态效果，加载状态内容可自定义文字、图片均可

* `LoadingBar` 	仿YouTube页面加载状态效果

```js
	//引入loadingbar
	import {LoadingBar,MaskBar} from 'gfs-loadingbar'

	//初次使用需实例化loadingbar
	let loadingbar = new LoadingBar()

	//显示和隐藏loadingbar状态
	loadingbar.run()
	loadingbar.end()
```

### React调用方式

与原生方式不同的是，此方式提供了redux middleware中间件、store状态机；并且能够与gfs-fetch、gfs-redux-bind-react配合使用；具体请参考`例子：react-redux的使用方式`

## 例子

* react+redux的使用方式

```js

	//redux-react
	
	import React, { Component } from 'react'
	import ReactDom from 'react-dom'

	import LoadingBarComponent,{LoadingBar} from 'gfs-loadingbar/lib/react/LoadingBar'
	import {fetching} from 'gfs-loadingbar/lib/react/fetching'
	import {Connect} from 'gfs-loadingbar/lib/react/Connect'
	import FetchMiddleware from 'gfs-loadingbar/lib/react/FetchMiddleware'

	//或者这样

	//import {LoadingBarComponent,fetching,FetchMiddleware,LoadingBar,Connect} from 'gfs-loadingbar/lib/index.react';

	import { Provider,connect } from 'react-redux'
	import { createStore,applyMiddleware,combineReducers } from 'redux'


	//loadingbar实例，且页面中只能有一个
	let loadingbar = new LoadingBar()

	//action
	function fetchingAction(){
		
		//开始获取数据时显示loadingbar
		loadingbar.run()
		setTimeout( ()=>{
			//数据请求完成关闭loadingbar
			loadingbar.end()
		},2000)
	}

	//将组建内部写好的store合并到redux store中，并将提供的中间件注册好
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
	
```

* 普通调用方式

```js

	import {MaskBar,LoadingBar} from 'gfs-loadingbar'

	let $ = function() {
		return document.querySelectorAll(arguments[0])
	}

	let loadingBar = new LoadingBar()

	let maskBar = new MaskBar({
		text: '拼命加载中'
	})

	let timeout = null
	let masktimeout = null

	if ($('#j-loadingbar').length > 0) {
		$('#j-loadingbar')[0].onclick = function() {

			clearTimeout(timeout)
			//渲染loadingbar
			loadingBar.run()
			timeout = setTimeout(() => {
				//结束
				loadingBar.end()
			}, 4000)
		}
		$('#j-maskbar')[0].onclick = function() {
			clearTimeout(masktimeout)
			//渲染loadingbar
			maskBar.run()
			masktimeout = setTimeout(() => {
				//结束
				maskBar.end()
			}, 4000)
		}

	}
```

## 通用方法

* `show()`

* `hide()`

* `run()`

* `end()`

## 属性

	text?:string;
    fetching?:number;


## Command

```
	#测试	
	npm run test	
	#打包	
	npm run build	
	#例子演示	
	npm start
```


