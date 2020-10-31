import * as fc from 'fast-check'
import * as E from 'fp-ts/lib/Either'
import { fieldNumber } from 'fp-ts/lib/Field'
import { monoidString, monoidSum } from 'fp-ts/lib/Monoid'
import * as O from 'fp-ts/lib/Option'
import { ordNumber } from 'fp-ts/lib/Ord'
import { Semigroup } from 'fp-ts/lib/Semigroup'
import { eqNumber, eqString } from 'fp-ts/lib/Eq'
import * as laws from '../src'
import { getEither } from '../src/Either'
import { getOption } from '../src/Option'

describe('eq', () => {
  it('should test Eq laws', () => {
    laws.eq(eqNumber, fc.float())
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
    laws.semigroup(semigroupSpace, eqString, fc.string())
  })
})

describe('monoid', () => {
  it('should test Monoid laws', () => {
    laws.monoid(monoidSum, eqNumber, fc.float())
  })
})

describe('semiring', () => {
  it('should test Semiring laws', () => {
    const seed = 1552808164540
    laws.semiring(fieldNumber, eqNumber, fc.float(), seed)
  })
})

describe('ring', () => {
  it('should test Ring laws', () => {
    const seed = 1552808164540
    laws.ring(fieldNumber, eqNumber, fc.float(), seed)
  })
})

// describe('field', () => {
//   it('should test Field laws', () => {
//     const seed = Date.now()
//     // tslint:disable-next-line: no-console
//     console.log(seed)
//     laws.field(fieldNumber, eqNumber, fc.float(), seed)
//   })
// })

describe('functor', () => {
  it('should test Functor laws', () => {
    laws.functor(O.option)(getOption, O.getEq)
    laws.functor(E.either)(arb => getEither(fc.string(), arb), S => E.getEq(eqString, S))
  })
})

describe('apply', () => {
  it('should test Apply laws', () => {
    laws.apply(O.option)(getOption, O.getEq)
    laws.apply(E.either)(arb => getEither(fc.string(), arb), S => E.getEq(eqString, S))
    laws.apply(E.getValidation(monoidString))(arb => getEither(fc.string(), arb), S => E.getEq(eqString, S))
  })
})

describe('applicative', () => {
  it('should test Applicative laws', () => {
    laws.applicative(O.option)(getOption, O.getEq)
    laws.applicative(E.either)(arb => getEither(fc.string(), arb), S => E.getEq(eqString, S))
    laws.applicative(E.getValidation(monoidString))(arb => getEither(fc.string(), arb), S => E.getEq(eqString, S))
  })
})

describe('monad', () => {
  it('should test Monad laws', () => {
    laws.monad(O.option)(O.getEq)
    laws.monad(E.either)(S => E.getEq(eqString, S))
    laws.monad(E.getValidation(monoidString))(S => E.getEq(eqString, S))
  })
})

describe('traversable', () => {
  it('should test Traversable laws', () => {
    laws.traversable(O.option)(getOption, O.getEq)
    laws.traversable(E.either)(arb => getEither(fc.string(), arb), S => E.getEq(eqString, S))
  })
})
