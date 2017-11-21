function asTabs (node) {
  let tabs = []
  for (let i = 0; i < node.childNodes.length; i++) {
    var child = node.childNodes[i]
    if (child.nodeType === document.ELEMENT_NODE) { tabs.push(child) }
  }

  let tabList = document.createElement('div')
  tabs.forEach(function (tab, i) {
    let button = document.createElement('button')
    button.textContent = tab.getAttribute('data-tabname')
    button.addEventListener('click', function () { selectTab(i) })
    tabList.appendChild(button)
  })
  node.insertBefore(tabList, node.firstChild)

  function selectTab (n) {
    tabs.forEach(function (tab, i) {
      if (i === n) { tab.style.display = '' } else { tab.style.display = 'none' }
    })
    for (let i = 0; i < tabList.childNodes.length; i++) {
      if (i === n) { tabList.childNodes[i].style.background = 'violet' } else { tabList.childNodes[i].style.background = '' }
    }
  }
  selectTab(0)
}
