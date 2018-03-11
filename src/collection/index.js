const getSliderWidth = (selector) => {
  const el = document.getElementsByClassName(selector)[0]
  const {width, left} = el.getBoundingClientRect()
  return {
    width: `${width}px`,
    left: `${left-width-14}px`
  }
}

export {getSliderWidth}
