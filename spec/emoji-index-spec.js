import { EmojiIndex, EmojiData, EmojiView } from '../src/utils/emoji-data'
import data from '../data/all.json'

describe('#EmojiIndex', () => {
  describe('search', function() {
    it('should find pineapple emoji by id', () => {
      const emojiIndex = new EmojiIndex(data)
      let emojis = emojiIndex.search('pineapple')

      expect(emojis).toEqual([
        new EmojiData({
          short_names: ['pineapple'],
          name: 'Pineapple',
          unified: '1f34d',
          added_in: '6.0',
          emoticons: undefined,
          has_img_apple: true,
          has_img_emojione: true,
          has_img_facebook: true,
          has_img_google: true,
          has_img_messenger: true,
          has_img_twitter: true,
          keywords: ['fruit', 'nature', 'food'],
          non_qualified: undefined,
          search: 'pineapple,fruit,nature,food',
          sheet_x: 7,
          sheet_y: 15,
          text: '',
          unified: '1F34D',
        }),
      ])

      expect(emojis[0].id).toEqual('pineapple')
      expect(emojis[0].colons).toEqual(':pineapple:')
      expect(emojis[0].native).toEqual('🍍')

      let emojiView = new EmojiView(emojis[0], 1, 'apple', true, undefined)
      expect(emojiView._hasEmoji()).toEqual(true)
      expect(emojiView.canRender).toEqual(true)
    })

    it('should filter only emojis we care about, exclude pineapple', () => {
      let emojisToShowFilter = (data) => {
        return data.unified !== '1F34D'
      }
      const emojiIndex = new EmojiIndex(data, { emojisToShowFilter })

      expect(emojiIndex.search('apple').map((obj) => obj.id)).not.toContain(
        'pineapple',
      )
    })

    it('can include/exclude categories', () => {
      const emojiIndex = new EmojiIndex(data, { include: ['people'] })
      expect(emojiIndex.search('flag')).toEqual([])
    })

    it('can search for thinking_face', () => {
      const emojiIndex = new EmojiIndex(data)
      expect(emojiIndex.search('thinking_fac').map((x) => x.id)).toEqual([
        'thinking_face',
      ])
    })

    it('can search for woman-facepalming', () => {
      const emojiIndex = new EmojiIndex(data)
      expect(emojiIndex.search('woman-facep').map((x) => x.id)).toEqual([
        'woman-facepalming',
      ])
    })
  })
})
