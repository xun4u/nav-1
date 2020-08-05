const siteListObj = localStorage.getItem('siteList')

const hashMap = JSON.parse(siteListObj) || [
    { logo: 'A', url: 'acfun.cn' }
]
const $siteList = $(".siteList")
const $lastLi = $siteList.find('li.last')

//简化url 需要用到字符串替换和正则
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}

//渲染 先清空list的dom 然后遍历数组挨个添加dom
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close"><svg class="icon">
                <use xlink:href="#icon-delete"></use>
            </svg></div>
            </div>
    </li>`).insertBefore($lastLi)

        //添加点击跳转事件(代替a标签)和删除事件
        $li.on('click', () => {
            window.open(node.url)
        })

        $li.on('click', '.close', (e) => {
            console.log('del')
            e.stopPropagation()
            hashMap.splice(index, 1)
            setStorage()
            alert('删除成功')
            render()
        })

    })
}

render()

//新增网站
$(".addbutton").on('click', () => {
    let url = window.prompt('请输入要添加的网址？')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    //将新的数据push到数组后 重新渲染
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url
    })
    setStorage()
    render()
})

//网站关闭时保存hash到localstorage
// window.onbeforeunload = () => {
//         const hashStr = JSON.stringify(hashMap)
//         localStorage.setItem('siteList', hashStr)
//     }
//改为每次增加和删除都操作localStorage
const setStorage = () => {
    const hashStr = JSON.stringify(hashMap)
    localStorage.setItem('siteList', hashStr)
}

//键盘事件
$(document).on('keypress', (e) => {
    console.log(e.key)
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})