import { describe, expect, it } from 'bun:test'
import { voiceAssistant } from '../src/services/voiceAssistant'

describe('voiceAssistant.parseCommand', () => {
  it('parses add food command', () => {
    const result = voiceAssistant.parseCommand('Add apples to my food list')
    expect(result.intent).toBe('add_food')
    expect(result.entities.food).toBe('apples')
  })

  it('parses check expiring command', () => {
    const result = voiceAssistant.parseCommand('Check expiring items')
    expect(result.intent).toBe('check_expiring')
  })

  it('parses suggest meal command', () => {
    const result = voiceAssistant.parseCommand('Could you recommend a meal for dinner?')
    expect(result.intent).toBe('suggest_meal')
    expect(result.entities.mealType).toBe('dinner')
  })

  it('parses grocery list command', () => {
    const result = voiceAssistant.parseCommand('Show my grocery list')
    expect(result.intent).toBe('grocery_list')
  })

  it('returns unknown for random text', () => {
    const result = voiceAssistant.parseCommand('foobar')
    expect(result.intent).toBe('unknown')
  })
})
