import * as laws from '../src'
import { setoidNumber, setoidString } from 'fp-ts/lib/Setoid'
import { ordNumber } from 'fp-ts/lib/Ord'
import * as fc from 'fast-check'
import { monoidSum } from 'fp-ts/lib/Monoid'
import { fieldNumber } from 'fp-ts/lib/Field'
import { Semigroup } from 'fp-ts/lib/Semigroup'

describe('setoid', () => {
  it('should test Setoid laws', () => {
    laws.setoid(setoidNumber, fc.float())
  })
})

describe('ord', () => {
  it('should test Ord laws', () => {
    laws.ord(ordNumber, fc.float())
  })
})

describe('my semigroup instance', () => {
  it('should test Semigroup laws', () => {
    const semigroupSpace: Semigroup<string> = {
      concat: (x, y) => x + ' ' + y
    }
    laws.semigroup(semigroupSpace, setoidString, fc.string())
  })
})

describe('monoid', () => {
  it('should test Monoid laws', () => {
    laws.monoid(monoidSum, setoidNumber, fc.float())
  })
})

describe('semiring', () => {
  it('should test Semiring laws', () => {
    const seed = 1552808164540
    laws.semiring(fieldNumber, setoidNumber, fc.float(), seed)
  })
})

describe('ring', () => {
  it('should test Ring laws', () => {
    const seed = 1552808164540
    laws.ring(fieldNumber, setoidNumber, fc.float(), seed)
  })
})

// describe('field', () => {
//   it('should test Field laws', () => {
//     const seed = Date.now()
//     // tslint:disable-next-line: no-console
//     console.log(seed)
//     laws.field(fieldNumber, setoidNumber, fc.float(), seed)
//   })
// })
