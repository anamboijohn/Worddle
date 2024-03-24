import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import { DEFEAT_MSG, VICTORY_MSG } from '@/settings'

describe('WordleBoard', () => {
  const wordOfTheDay = 'madam'
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(WordleBoard, { props: { wordOfTheDay } })
  })

  async function playerSubmitsGuess(guess: string) {
    const guessInput = wrapper.find('input[type="text"]')
    await guessInput.setValue(guess)
    await guessInput.trigger('keydown.enter')
  }

  test('a victory message appears when a user guess a word that matches the word of the day', async () => {
    await playerSubmitsGuess(wordOfTheDay)
    //Assert
    expect(wrapper.text()).toContain(VICTORY_MSG)
  })

  test('a defeat message appears if the user makes a guess that is incorrect', async () => {
    await playerSubmitsGuess('hello')
    expect(wrapper.text()).toContain(DEFEAT_MSG)
  })

  test('no end-of-game message appears if the user has not yet made a guess', async () => {
    expect(wrapper.text()).not.toContain(VICTORY_MSG)
    expect(wrapper.text()).not.toContain(DEFEAT_MSG)
  })

  test('if the word of the day does not have exactly five letters, a warning message appears', async () => {
    console.warn = vi.fn()
    mount(WordleBoard, { props: { wordOfTheDay: 'fly' } })
    expect(console.warn).toHaveBeenCalled()
  })

  test('if the word of the day are all not in uppercase a warning is emitted', async () => {
    console.warn = vi.fn()
    mount(WordleBoard, { props: { wordOfTheDay: 'hello' } })
    expect(console.warn).toHaveBeenCalled()
  })

  test('if a word is not an english word a warning is emitted', async () => {
    console.warn = vi.fn()
    mount(WordleBoard, { props: { wordOfTheDay: 'DFGHF' } })
    expect(console.warn).toHaveBeenCalled()
  })

  test('if a word is a valid english word no warning is emitted', async () => {
    console.warn = vi.fn()
    mount(WordleBoard, { props: { wordOfTheDay: 'FIGHT' } })
    expect(console.warn).not.toHaveBeenCalled()
  })
})
