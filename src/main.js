import 'bootstrap'
import './assets/scss/public.scss'
import userInfo from '@/config/user.conf'
import render from './pages/header.art'
import ScrollReveal from 'scrollreveal'
import skills from './skills'
import {getSliderWidth} from './collection'

const html = render({
  userInfo
})
document.getElementById('root').innerHTML = html
const sr = ScrollReveal()
sr.reveal('.header-user__contact h4', { origin: 'left', duration: 2000 }, 50)
sr.reveal('.header-user__contact p', { origin: 'right', duration: 1000 }, 200)
sr.reveal('.header-user__follow i', { origin: 'bottom', duration: 2000 }, 220)
sr.reveal('.header-user__name', { origin: 'bottom', duration: 2000 }, 150)
sr.reveal('.skills-content__words p', { origin: 'bottom', duration: 2000 , reset: true}, 50)

// 图表
skills.initChart('myChart')

// 作品集
const slider = document.getElementById('tabSlider')
debugger
slider.style.width = getSliderWidth('tabs-div').width
slider.style.left = getSliderWidth('tabs-div').left

$('.tabs-div').each((index, item) => {
  $(item).click(function(event) {
    const width = parseFloat(getSliderWidth('tabs-div').width)
    debugger
    slider.style.left = ($(this)[0].getBoundingClientRect().left - width - 14) + 'px'
  })
})

