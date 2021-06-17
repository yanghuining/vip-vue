import Vue from 'vue'
import Memory from '@/components/memory'

describe('memory.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Memory)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .toEqual('Welcome to Your Vue.js App')
  })
})
