import * as fc from 'fast-check'
import * as E from 'fp-ts/lib/Either'
import { fieldNumber } from 'fp-ts/lib/Field'
import { monoidSum, getArrayMonoid } from 'fp-ts/lib/Monoid'
import * as O from 'fp-ts/lib/Option'
import { ordNumber } from 'fp-ts/lib/Ord'
import { Semigroup } from 'fp-ts/lib/Semigroup'
import { setoidNumber, setoidString } from 'fp-ts/lib/Setoid'
import * as V from 'fp-ts/lib/Validation'
import * as laws from '../src'
import { getEither } from '../src/Either'
import { getOption } from '../src/Option'
import { getValidation } from '../src/Validation'

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

describe('functor', () => {
  it('should test Functor laws', () => {
    laws.functor(O.option, (arb, S) => [getOption(arb), O.getSetoid(S)])
    laws.functor(E.either, (arb, S) => [getEither(fc.string(), arb), E.getSetoid(setoidString, S)])
    laws.functor(V.validation, (arb, S) => [getValidation(fc.string(), arb), V.getSetoid(setoidString, S)])
  })
})

describe('monad', () => {
  it('should test Monad laws', () => {
    laws.monad(O.option, (arb, S) => [getOptions(arb), O.getSetoid(S)])
    laws.monad(E.either, (arb, S) => [getEithers(fc.string(), arb), E.getSetoid(setoidString, S)])
    laws.monad(V.getMonad(getArrayMonoid<string>()), (arb, S) => [
      getValidations(fc.string(), arb),
      V.getSetoid(setoidString, S)
    ])
  })
})
