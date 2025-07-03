import { describe, it, expect } from 'vitest'
import { voiceAssistant } from '../src/services/voiceAssistant'

describe('voiceAssistant.parseCommand', () => {
  it('detects add_food intent', () => {
    const cmd = voiceAssistant.parseCommand('Add apples to inventory')
    expect(cmd.intent).toBe('add_food')
    expect(cmd.entities.food).toBe('apples')
  })

  it('detects check_expiring intent', () => {
    const cmd = voiceAssistant.parseCommand('Check expiring items')
    expect(cmd.intent).toBe('check_expiring')
  })

  it('detects suggest_meal intent', () => {
    const cmd = voiceAssistant.parseCommand('Suggest dinner')
    expect(cmd.intent).toBe('suggest_meal')
    expect(cmd.entities.mealType).toBe('dinner')
  })

  it('detects grocery_list intent', () => {
    const cmd = voiceAssistant.parseCommand('Show grocery list')
    expect(cmd.intent).toBe('grocery_list')
  })
})
