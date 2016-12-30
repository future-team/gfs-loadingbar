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