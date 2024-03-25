import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import { DEFEAT_MSG, VICTORY_MSG } from '@/settings'

describe('WordleBoard', () => {
  const wordOfTheDay = 'FIGHT'
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(WordleBoard, { props: { wordOfTheDay } })
  })

  async function playerSubmitsGuess(guess: string) {
    const guessInput = wrapper.find('input[type="text"]')
    await guessInput.setValue(guess)
    await guessInput.trigger('keydown.enter')
  }

  describe('End of game messages', () => {
    test('a victory message appears when a user guess a word that matches the word of the day', async () => {
      await playerSubmitsGuess(wordOfTheDay)
      //Assert
      expect(wrapper.text()).toContain(VICTORY_MSG)
    })

    test('a defeat message appears if the user makes a guess that is incorrect', async () => {
      await playerSubmitsGuess('HELLO')
      expect(wrapper.text()).toContain(DEFEAT_MSG)
    })

    test('no end-of-game message appears if the user has not yet made a guess', async () => {
      expect(wrapper.text()).not.toContain(VICTORY_MSG)
      expect(wrapper.text()).not.toContain(DEFEAT_MSG)
    })
  })

  describe('Rules for defining tthe word of the day', () => {
    beforeEach(() => {
      console.warn = vi.fn()
    })
    test.each([
      { wordOfTheDay: 'FLY', reason: 'word-of-day must contain exactly 5 characters' },
      { wordOfTheDay: 'hello', reason: 'word-of-day must all be capital letters' },
      { wordOfTheDay: 'DFGHF', reason: 'word-of-day must be a valid english word' }
    ])(
      'Since $reason: $wordOfTheDay is invalid hence a warning must be emitted',
      async ({ wordOfTheDay }) => {
        mount(WordleBoard, { props: { wordOfTheDay } })
        expect(console.warn).toHaveBeenCalled()
      }
    )

    test('if a word is a valid english word no warning is emitted', async () => {
      mount(WordleBoard, { props: { wordOfTheDay: 'FIGHT' } })
      expect(console.warn).not.toHaveBeenCalled()
    })
  })

  describe('Player inputs', () => {
    test(`player guesses are limited to WORD_SIZE letters`, async () => {
      await playerSubmitsGuess(wordOfTheDay + 'EXTRA')
      expect(wrapper.text()).toContain(VICTORY_MSG)
    })
    test('player guesses can only be submitted if they are real words', async () => {
      await playerSubmitsGuess('QWERT')
      expect(wrapper.text()).not.toContain(DEFEAT_MSG)
      expect(wrapper.text()).not.toContain(VICTORY_MSG)
    })
    test('player guesses are not case-sensitive', async () => {
      await playerSubmitsGuess('fight')
      expect(wrapper.text()).toContain(VICTORY_MSG)
    })
    test('player guesses can only contain letters', async () => {
      await playerSubmitsGuess('763GT')
      expect(wrapper.find<HTMLInputElement>('input[type="text"]').element.value).toBe('GT')
    })
    test("don't display non-letters in the input field", async () => {
      await playerSubmitsGuess('333')
      expect(wrapper.find<HTMLInputElement>('input[type="text"]').element.value).toBe('333j')
    })
  })
})
