import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import { DEFEAT_MSG, VICTORY_MSG } from '@/settings'

describe('WordleBoard', () => {
  test('a victory message appears when a user guess a word that matches the word of the day', async () => {
    //Arrange
    const wrapper = mount(WordleBoard, { props: { wordOfTheDay: 'madam' } })

    //Act
    const guessInput = wrapper.find('input[type="text"]')
    await guessInput.setValue('madam')
    await guessInput.trigger('keydown.enter')

    //Assert
    expect(wrapper.text()).toContain(VICTORY_MSG)
  })

  test('a defeat message appears if the user makes a guess that is incorrect', async () => {
    const wrapper = mount(WordleBoard, { props: { wordOfTheDay: 'madam' } })
    const guessInput = wrapper.find('input[type="text"]')
    await guessInput.setValue('hello')
    await guessInput.trigger('keydown.enter')
    expect(wrapper.text()).toContain(DEFEAT_MSG)
  })
  test.todo('no end-of-game message appears if the user has not yet made a guess')
})
