import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'

describe('WordleBoard', () => {
  test('a victory message appears when a user guess a word that matches the word of the day', async () => {
    //Arrange
    const wrapper = mount(WordleBoard, { props: { wordOfTheDay: 'madam' } })

    //Act
    const guessInput = wrapper.find('input[type="text"]')
    await guessInput.setValue('madam')
    await guessInput.trigger('keydown.enter')

    //Assert
    expect(wrapper.text()).toContain('Congratulations! You guessed the word of the day!')
  })
})
