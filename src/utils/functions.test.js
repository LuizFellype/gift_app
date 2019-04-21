import { capitalize } from './functions'

test('Should capitlize the word', () => {
  expect(capitalize('name')).toBe('Name')
  expect(capitalize('Name')).toBe('Name')
  expect(capitalize('duas Palavas')).toBe('Duas Palavas')
  expect(capitalize('Duas palavas')).toBe('Duas palavas')
})
