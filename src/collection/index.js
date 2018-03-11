const getSliderWidth = (selector) => {
  const el = document.getElementsByClassName(selector)[0]
  const left = el.offsetLeft
  const {width} = el.getBoundingClientRect()
  return {
    width: `${width}px`,
    left: `${left}px`
  }
}
// 文件下载
const downloadFiles = (fileName, content) => {
  const aLink = document.createElement('a')
  const blob = new Blob([content])
  const evt = document.createEvent('MousEevents')
  evt.initEvent('click', false, false)
  aLink.download = fileName
  aLink.href = URL.createObjectURL(blob)
  aLink.dispatchEvent(evt)
}

export {getSliderWidth, downloadFiles}
