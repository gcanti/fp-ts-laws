import * as fc from 'fast-check'
import * as laws from './laws'
import { Field } from 'fp-ts/lib/Field'
import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C } from 'fp-ts/lib/Functor'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from 'fp-ts/lib/HKT'
import { Monoid } from 'fp-ts/lib/Monoid'
import { Ord } from 'fp-ts/lib/Ord'
import { Ring } from 'fp-ts/lib/Ring'
import { Semigroup } from 'fp-ts/lib/Semigroup'
import { Semiring } from 'fp-ts/lib/Semiring'
import { Setoid, setoidBoolean, setoidNumber, setoidString } from 'fp-ts/lib/Setoid'
import { Monad, Monad1, Monad2C, Monad2, Monad3, Monad3C } from 'fp-ts/lib/Monad'
import { Apply3, Apply3C, Apply2, Apply2C, Apply1, Apply } from 'fp-ts/lib/Apply'
import {
  Applicative3,
  Applicative3C,
  Applicative2,
  Applicative2C,
  Applicative1,
  Applicative
} from 'fp-ts/lib/Applicative'
import { Function1 } from 'fp-ts/lib/function'

/**
 * Tests the `Setoid` laws
 * @since 0.0.1
 */
export const setoid = <A>(S: Setoid<A>, arb: fc.Arbitrary<A>): void => {
  const reflexivity = fc.property(arb, a => S.equals(a, a))
  const symmetry = fc.property(arb, arb, (a, b) => S.equals(a, b) === S.equals(b, a))
  const transitivity = fc.property(
    arb,
    arb,
    arb,
    (a, b, c) => (S.equals(a, b) && S.equals(b, c)) === (S.equals(a, b) && S.equals(a, c))
  )
  fc.assert(reflexivity)
  fc.assert(symmetry)
  fc.assert(transitivity)
}

/**
 * Tests the `Ord` laws
 * @since 0.0.1
 */
export const ord = <A>(O: Ord<A>, arb: fc.Arbitrary<A>): void => {
  setoid(O, arb)
  const totality = fc.property(arb, arb, (a, b) => O.compare(a, b) <= 0 || O.compare(b, a) <= 0)
  const reflexivity = fc.property(arb, a => O.compare(a, a) <= 0)
  const antisymmetry = fc.property(
    arb,
    arb,
    (a, b) => (O.compare(a, b) <= 0 && O.compare(b, a) <= 0) === O.equals(a, b)
  )
  const transitivity = fc.property(
    arb,
    arb,
    arb,
    (a, b, c) => !(O.compare(a, b) <= 0 && O.compare(b, c) <= 0) || O.compare(a, c) <= 0
  )
  fc.assert(totality)
  fc.assert(reflexivity)
  fc.assert(antisymmetry)
  fc.assert(transitivity)
}

/**
 * Tests the `Semigroup` laws
 * @since 0.0.1
 */
export const semigroup = <A>(S: Semigroup<A>, Eq: Setoid<A>, arb: fc.Arbitrary<A>): void => {
  const associativity = fc.property(arb, arb, arb, (a, b, c) =>
    Eq.equals(S.concat(S.concat(a, b), c), S.concat(a, S.concat(b, c)))
  )
  fc.assert(associativity)
}

/**
 * Tests the `Monoid` laws
 * @since 0.0.1
 */
export const monoid = <A>(M: Monoid<A>, Eq: Setoid<A>, arb: fc.Arbitrary<A>): void => {
  semigroup(M, Eq, arb)
  const rightIdentity = fc.property(arb, a => Eq.equals(M.concat(a, M.empty), a))
  const leftIdentity = fc.property(arb, a => Eq.equals(M.concat(M.empty, a), a))
  fc.assert(rightIdentity)
  fc.assert(leftIdentity)
}

const allEquals = <A>(S: Setoid<A>) => (a: A, ...as: Array<A>): boolean => {
  return as.every(item => S.equals(item, a))
}

/**
 * Tests the `Semiring` laws
 * @since 0.0.1
 */
export const semiring = <A>(S: Semiring<A>, Eq: Setoid<A>, arb: fc.Arbitrary<A>, seed?: number): void => {
  const allEqualsEq = allEquals(Eq)
  const addAssociativity = fc.property(arb, arb, arb, (a, b, c) =>
    Eq.equals(S.add(S.add(a, b), c), S.add(a, S.add(b, c)))
  )
  const addIdentity = fc.property(arb, a => allEqualsEq(a, S.add(a, S.zero), S.add(S.zero, a)))
  const commutativity = fc.property(arb, arb, (a, b) => Eq.equals(S.add(a, b), S.add(b, a)))
  const mulAssociativity = fc.property(arb, arb, arb, (a, b, c) =>
    Eq.equals(S.mul(S.mul(a, b), c), S.mul(a, S.mul(b, c)))
  )
  const mulIdentity = fc.property(arb, a => allEqualsEq(a, S.mul(a, S.one), S.mul(S.one, a)))
  const leftDistributivity = fc.property(arb, arb, arb, (a, b, c) =>
    Eq.equals(S.mul(a, S.add(b, c)), S.add(S.mul(a, b), S.mul(a, c)))
  )
  const rightDistributivity = fc.property(arb, arb, arb, (a, b, c) =>
    Eq.equals(S.mul(S.add(a, b), c), S.add(S.mul(a, c), S.mul(b, c)))
  )
  const annihilation = fc.property(arb, a => allEqualsEq(S.zero, S.mul(a, S.zero), S.mul(S.zero, a)))
  fc.assert(addAssociativity, { seed })
  fc.assert(addIdentity, { seed })
  fc.assert(commutativity, { seed })
  fc.assert(mulAssociativity, { seed })
  fc.assert(mulIdentity, { seed })
  fc.assert(leftDistributivity, { seed })
  fc.assert(rightDistributivity, { seed })
  fc.assert(annihilation, { seed })
}

/**
 * Tests the `Ring` laws
 * @since 0.0.1
 */
export const ring = <A>(R: Ring<A>, S: Setoid<A>, arb: fc.Arbitrary<A>, seed?: number): void => {
  semiring(R, S, arb, seed)
  const allEqualsEq = allEquals(S)
  const additiveInverse = fc.property(arb, a => allEqualsEq(R.sub(a, a), R.add(R.sub(R.zero, a), a), R.zero))
  fc.assert(additiveInverse)
}

/**
 * Tests the `Field` laws
 * @since 0.0.1
 */
export const field = <A>(F: Field<A>, S: Setoid<A>, arb: fc.Arbitrary<A>, seed?: number): void => {
  const allEqualsS = allEquals(S)
  ring(F, S, arb, seed)
  if (S.equals(F.zero, F.one)) {
    throw new Error(`one should not be equal to zero`)
  }
  const commutativity = fc.property(arb, arb, (a, b) => S.equals(F.mul(a, b), F.mul(b, a)))
  const integralDomain = fc.property(
    arb,
    arb,
    (a, b) => S.equals(a, F.zero) || S.equals(b, F.zero) || !S.equals(F.mul(a, b), F.zero)
  )
  const nonNegativity = fc.property(arb, a => S.equals(a, F.zero) || F.degree(a) >= 0)
  const quotient = fc.property(arb, arb, (a, b) => {
    const q = F.div(a, b)
    const r = F.mod(a, b)
    return S.equals(b, F.zero) || S.equals(a, F.add(F.mul(q, b), r))
  })
  const reminder = fc.property(arb, arb, (a, b) => {
    const r = F.mod(a, b)
    return S.equals(b, F.zero) || S.equals(r, F.zero) || F.degree(a) <= F.degree(b)
  })
  const submultiplicative = fc.property(
    arb,
    arb,
    (a, b) => S.equals(a, F.zero) || S.equals(b, F.zero) || F.degree(a) <= F.degree(F.mul(a, b))
  )
  const inverse = fc.property(arb, a => {
    const i = F.div(F.one, a)
    return S.equals(a, F.zero) || allEqualsS(F.one, F.mul(i, a), F.mul(a, i))
  })
  fc.assert(commutativity, { seed })
  fc.assert(integralDomain, { seed })
  fc.assert(nonNegativity, { seed })
  fc.assert(quotient, { seed })
  fc.assert(reminder, { seed })
  fc.assert(submultiplicative, { seed })
  fc.assert(inverse, { seed })
}

/**
 * Tests the `Functor` laws
 * @since 0.0.2
 */
export function functor<F extends URIS3>(
  F: Functor3<F>,
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Type3<F, any, any, A>>,
  liftSetoid: <A>(Sa: Setoid<A>) => Setoid<Type3<F, any, any, A>>
): void
export function functor<F extends URIS3, U, L>(
  F: Functor3C<F, U, L>,
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Type3<F, any, any, A>>,
  liftSetoid: <A>(Sa: Setoid<A>) => Setoid<Type3<F, any, any, A>>
): void
export function functor<F extends URIS2>(
  F: Functor2<F>,
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Type2<F, any, A>>,
  liftSetoid: <A>(Sa: Setoid<A>) => Setoid<Type2<F, any, A>>
): void
export function functor<F extends URIS2, L>(
  F: Functor2C<F, L>,
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Type2<F, any, A>>,
  liftSetoid: <A>(Sa: Setoid<A>) => Setoid<Type2<F, any, A>>
): void
export function functor<F extends URIS>(
  F: Functor1<F>,
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Type<F, A>>,
  liftSetoid: <A>(Sa: Setoid<A>) => Setoid<Type<F, A>>
): void
export function functor<F>(
  F: Functor<F>,
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<HKT<F, A>>,
  liftSetoid: <A>(Sa: Setoid<A>) => Setoid<HKT<F, A>>
): void
export function functor<F>(
  F: Functor<F>,
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<HKT<F, A>>,
  liftSetoid: <A>(Sa: Setoid<A>) => Setoid<HKT<F, A>>
): void {
  const arb = lift(fc.string())
  const Sa = liftSetoid(setoidString)
  const Sc = liftSetoid(setoidBoolean)
  const identity = fc.property(arb, laws.functor.identity(F, Sa))
  const ab: Function1<string, number> = s => s.length
  const bc: Function1<number, boolean> = n => n > 2
  const composition = fc.property(arb, laws.functor.composition(F, Sc, ab, bc))

  fc.assert(identity)
  fc.assert(composition)
}

/**
 * Tests the `Apply` laws
 * @since 0.0.3
 */
export function apply<F extends URIS3>(
  F: Apply3<F>,
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Type3<F, any, any, A>>,
  liftSetoid: <A>(Sa: Setoid<A>) => Setoid<Type3<F, any, any, A>>
): void
export function apply<F extends URIS3, U, L>(
  F: Apply3C<F, U, L>,
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Type3<F, any, any, A>>,
  liftSetoid: <A>(Sa: Setoid<A>) => Setoid<Type3<F, any, any, A>>
): void
export function apply<F extends URIS2>(
  F: Apply2<F>,
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Type2<F, any, A>>,
  liftSetoid: <A>(Sa: Setoid<A>) => Setoid<Type2<F, any, A>>
): void
export function apply<F extends URIS2, L>(
  F: Apply2C<F, L>,
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Type2<F, any, A>>,
  liftSetoid: <A>(Sa: Setoid<A>) => Setoid<Type2<F, any, A>>
): void
export function apply<F extends URIS>(
  F: Apply1<F>,
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Type<F, A>>,
  liftSetoid: <A>(Sa: Setoid<A>) => Setoid<Type<F, A>>
): void
export function apply<F>(
  F: Apply<F>,
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<HKT<F, A>>,
  liftSetoid: <A>(Sa: Setoid<A>) => Setoid<HKT<F, A>>
): void
export function apply<F>(
  F: Apply<F>,
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<HKT<F, A>>,
  liftSetoid: <A>(Sa: Setoid<A>) => Setoid<HKT<F, A>>
): void {
  functor(F, lift, liftSetoid)

  const Sc = liftSetoid(setoidBoolean)
  const arbFa = lift(fc.string())
  const arbFab = lift(fc.constant((a: string) => a.length))
  const arbFbc = lift(fc.constant((b: number) => b > 2))
  const associativeComposition = fc.property(arbFa, arbFab, arbFbc, laws.apply.associativeComposition(F, Sc))

  fc.assert(associativeComposition)
}

/**
 * Tests the `Applicative` laws
 * @since 0.0.3
 */
export function applicative<F extends URIS3>(
  F: Applicative3<F>,
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Type3<F, any, any, A>>,
  liftSetoid: <A>(Sa: Setoid<A>) => Setoid<Type3<F, any, any, A>>
): void
export function applicative<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>,
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Type3<F, any, any, A>>,
  liftSetoid: <A>(Sa: Setoid<A>) => Setoid<Type3<F, any, any, A>>
): void
export function applicative<F extends URIS2>(
  F: Applicative2<F>,
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Type2<F, any, A>>,
  liftSetoid: <A>(Sa: Setoid<A>) => Setoid<Type2<F, any, A>>
): void
export function applicative<F extends URIS2, L>(
  F: Applicative2C<F, L>,
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Type2<F, any, A>>,
  liftSetoid: <A>(Sa: Setoid<A>) => Setoid<Type2<F, any, A>>
): void
export function applicative<F extends URIS>(
  F: Applicative1<F>,
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Type<F, A>>,
  liftSetoid: <A>(Sa: Setoid<A>) => Setoid<Type<F, A>>
): void
export function applicative<F>(
  F: Applicative<F>,
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<HKT<F, A>>,
  liftSetoid: <A>(Sa: Setoid<A>) => Setoid<HKT<F, A>>
): void
export function applicative<F>(
  F: Applicative<F>,
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<HKT<F, A>>,
  liftSetoid: <A>(Sa: Setoid<A>) => Setoid<HKT<F, A>>
): void {
  apply(F, lift, liftSetoid)

  const arbFa = lift(fc.string())
  const Sa = liftSetoid(setoidString)
  const Sb = liftSetoid(setoidNumber)
  const identity = fc.property(arbFa, laws.applicative.identity(F, Sa))
  const ab: Function1<string, number> = a => a.length
  const homomorphism = fc.property(fc.string(), laws.applicative.homomorphism(F, Sb, ab))
  const arbFab = lift(fc.constant(ab))
  const interchange = fc.property(fc.string(), arbFab, laws.applicative.interchange(F, Sb))
  const derivedMap = fc.property(arbFa, laws.applicative.derivedMap(F, Sb, ab))

  fc.assert(identity)
  fc.assert(homomorphism)
  fc.assert(interchange)
  fc.assert(derivedMap)
}

/**
 * Tests the `Monad` laws
 * @since 0.0.3
 */
export function monad<M extends URIS3>(
  M: Monad3<M>,
  liftSetoid: <A>(Sa: Setoid<A>) => Setoid<Type3<M, any, any, A>>
): void
export function monad<M extends URIS3, U, L>(
  M: Monad3C<M, U, L>,
  liftSetoid: <A>(Sa: Setoid<A>) => Setoid<Type3<M, any, any, A>>
): void
export function monad<M extends URIS2>(M: Monad2<M>, liftSetoid: <A>(Sa: Setoid<A>) => Setoid<Type2<M, any, A>>): void
export function monad<M extends URIS2, L>(
  M: Monad2C<M, L>,
  liftSetoid: <A>(Sa: Setoid<A>) => Setoid<Type2<M, L, A>>
): void
export function monad<M extends URIS>(M: Monad1<M>, liftSetoid: <A>(Sa: Setoid<A>) => Setoid<Type<M, A>>): void
export function monad<M>(M: Monad<M>, liftSetoid: <A>(Sa: Setoid<A>) => Setoid<HKT<M, A>>): void
export function monad<M>(M: Monad<M>, liftSetoid: <A>(Sa: Setoid<A>) => Setoid<HKT<M, A>>): void {
  applicative(M, arb => arb.map(M.of), liftSetoid)

  const Sc = liftSetoid(setoidBoolean)
  const arbFa = fc.string().map(M.of)
  const afb: Function1<string, HKT<M, number>> = a => M.of(a.length)
  const bfc: Function1<number, HKT<M, boolean>> = b => M.of(b > 2)
  const associativity = fc.property(arbFa, laws.chain.associativity(M, Sc, afb, bfc))

  fc.assert(associativity)

  const arb = fc.string().map(M.of)
  const Sa = liftSetoid(setoidString)
  const Sb = liftSetoid(setoidNumber)
  const leftIdentity = fc.property(fc.string(), laws.monad.leftIdentity(M, Sb, afb))
  const rightIdentity = fc.property(arb, laws.monad.rightIdentity(M, Sa))
  const ab: Function1<string, number> = a => a.length
  const derivedMap = fc.property(arb, laws.monad.derivedMap(M, Sb, ab))

  fc.assert(leftIdentity)
  fc.assert(rightIdentity)
  fc.assert(derivedMap)
}
