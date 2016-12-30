# gfs-loadingbar

状态加载

## 使用

* react+redux的使用方式

```js

	//redux-react
	
	import React, { Component } from 'react'
	import ReactDom from 'react-dom'

	import LoadingBarComponent,{LoadingBar} from '../../src/react/LoadingBar'
	import {fetching} from '../../src/react/fetching'
	import FetchMiddleware from '../../src/react/FetchMiddleware'

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

	@connect(state => {
	return { fetching: state.fetching}
	}, {})
	class Progress extends Component{
		constructor(props) {
			super(props)
			fetchingAction()
		}

		render(){
			console.log('props',this.props.fetching)
			return (
				<LoadingBarComponent fetching={this.props.fetching}></LoadingBarComponent>
			)
		}
	}

	class Page extends Component {
		constructor(props) {
			super(props)
		}

		render() {
			
			return (
				<Provider store={store}>
					<div>
					<button id="j-react-loadingbar">页面载入状态进度栏</button>
					<button id="j-react-maskbar">带有遮罩层的加载状态</button>
					<Progress />
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


	import '../../css/index.less'
	import MaskBar from '../../src/MaskBar'
	import LoadingBar from '../../src/LoadingBar'
	import append from './react'

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

			loadingBar.run()
			timeout = setTimeout(() => {
				loadingBar.end()
			}, 4000)
		}
		$('#j-maskbar')[0].onclick = function() {
			clearTimeout(masktimeout)

			maskBar.run()
			masktimeout = setTimeout(() => {
				maskBar.end()
			}, 4000)
		}

	} else {
		append()
	}
```

##待续...

## Command

```
	#测试	
	npm run test	
	#打包	
	npm run build	
	#例子演示	
	npm start
```


