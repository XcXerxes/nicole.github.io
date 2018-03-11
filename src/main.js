import 'bootstrap'
import './assets/scss/public.scss'
import userInfo from '@/config/user.conf'
import render from './pages/header.art'
import ScrollReveal from 'scrollreveal'
import skills from './skills'
import {getSliderWidth, downloadFiles} from './collection'

const html = render({
  userInfo
})
document.getElementById('root').innerHTML = html
const sr = ScrollReveal()
sr.reveal('.header-user__contact h4', { origin: 'left', duration: 2000, viewFactor: 0.3, reset: true}, 50)
sr.reveal('.header-user__contact p', { origin: 'right', duration: 1000, viewFactor: 0.5, reset: true}, 200)
sr.reveal('.header-user__follow i', { origin: 'bottom', duration: 2000, reset: true }, 220)
sr.reveal('.header-user__name', { origin: 'bottom', duration: 2000, reset: true }, 150)
sr.reveal('.skills-content__words p', { origin: 'bottom', duration: 2000, reset: true}, 50)
sr.reveal('.tabs-item__content.active img', { origin: 'left', duration: 2000, viewFactor: 0.3, reset: true}, 50)

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
    const type = $(this).attr('type')
    $('.tabs-item__content').fadeOut(500).removeClass('active')
    
    $(`div[data-type=${type}]`).fadeIn(500).addClass('active')
    slider.style.left = ($(this)[0].offsetLeft) + 'px'
  })
})

// 下载简历
$('#downloads').click(() => {
  downloadFiles('./assets/Web前端2018.pdf', 'data:text/plain')
})
