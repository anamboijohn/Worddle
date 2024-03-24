import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import { DEFEAT_MSG, VICTORY_MSG } from '@/settings'

describe('WordleBoard', () => {
  const wordOfTheDay = 'madam'
  let wrapper: ReturnType<typeof mount>
  beforeEach(() => {
    wrapper = mount(WordleBoard, { props: { wordOfTheDay } })
  })
  test('a victory message appears when a user guess a word that matches the word of the day', async () => {
    //Act
    const guessInput = wrapper.find('input[type="text"]')
    await guessInput.setValue('madam')
    await guessInput.trigger('keydown.enter')

    //Assert
    expect(wrapper.text()).toContain(VICTORY_MSG)
  })

  test('a defeat message appears if the user makes a guess that is incorrect', async () => {
    const guessInput = wrapper.find('input[type="text"]')
    await guessInput.setValue('hello')
    await guessInput.trigger('keydown.enter')
    expect(wrapper.text()).toContain(DEFEAT_MSG)
  })
  test('no end-of-game message appears if the user has not yet made a guess', async () => {
    expect(wrapper.text()).not.toContain(VICTORY_MSG)
    expect(wrapper.text()).not.toContain(DEFEAT_MSG)
  })
})
