import * as fc from 'fast-check'
import * as E from 'fp-ts/lib/Either'
import { fieldNumber } from 'fp-ts/lib/Field'
import { monoidSum, monoidString } from 'fp-ts/lib/Monoid'
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
    laws.functor(O.option, getOption, O.getSetoid)
    laws.functor(E.either, arb => getEither(fc.string(), arb), S => E.getSetoid(setoidString, S))
    laws.functor(V.validation, arb => getValidation(fc.string(), arb), S => V.getSetoid(setoidString, S))
  })
})

describe('apply', () => {
  it('should test Apply laws', () => {
    laws.apply(O.option, getOption, O.getSetoid)
    laws.apply(E.either, arb => getEither(fc.string(), arb), S => E.getSetoid(setoidString, S))
    laws.apply(
      V.getApplicative(monoidString),
      arb => getValidation(fc.string(), arb),
      S => V.getSetoid(setoidString, S)
    )
  })
})

describe('applicative', () => {
  it('should test Applicative laws', () => {
    laws.applicative(O.option, getOption, O.getSetoid)
    laws.applicative(E.either, arb => getEither(fc.string(), arb), S => E.getSetoid(setoidString, S))
    laws.applicative(
      V.getApplicative(monoidString),
      arb => getValidation(fc.string(), arb),
      S => V.getSetoid(setoidString, S)
    )
  })
})

describe('monad', () => {
  it('should test Monad laws', () => {
    laws.monad(O.option, O.getSetoid)
    laws.monad(E.either, S => E.getSetoid(setoidString, S))
    laws.monad(V.getMonad(monoidString), S => V.getSetoid(setoidString, S))
  })
})
