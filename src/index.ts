import * as fc from 'fast-check'
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
  lift: <A>(arb: fc.Arbitrary<A>, S: Setoid<A>) => [fc.Arbitrary<Type3<F, any, any, A>>, Setoid<Type3<F, any, any, A>>]
): void
export function functor<F extends URIS3, U, L>(
  F: Functor3C<F, U, L>,
  lift: <A>(arb: fc.Arbitrary<A>, S: Setoid<A>) => [fc.Arbitrary<Type3<F, any, any, A>>, Setoid<Type3<F, any, any, A>>]
): void
export function functor<F extends URIS2>(
  F: Functor2<F>,
  lift: <A>(arb: fc.Arbitrary<A>, S: Setoid<A>) => [fc.Arbitrary<Type2<F, any, A>>, Setoid<Type2<F, any, A>>]
): void
export function functor<F extends URIS2, L>(
  F: Functor2C<F, L>,
  lift: <A>(arb: fc.Arbitrary<A>, S: Setoid<A>) => [fc.Arbitrary<Type2<F, L, A>>, Setoid<Type2<F, L, A>>]
): void
export function functor<F extends URIS>(
  F: Functor1<F>,
  lift: <A>(arb: fc.Arbitrary<A>, S: Setoid<A>) => [fc.Arbitrary<Type<F, A>>, Setoid<Type<F, A>>]
): void
export function functor<F>(
  F: Functor<F>,
  lift: <A>(arb: fc.Arbitrary<A>, S: Setoid<A>) => [fc.Arbitrary<HKT<F, A>>, Setoid<HKT<F, A>>]
): void {
  const [arb1, S1] = lift(fc.string(), setoidString)
  const [arb2, S2] = lift(fc.float(), setoidNumber)
  const [, S3] = lift(fc.boolean(), setoidBoolean)
  const identity1 = fc.property(arb1, fa => S1.equals(F.map(fa, a => a), fa))
  const identity2 = fc.property(arb2, fa => S2.equals(F.map(fa, a => a), fa))

  const len = (s: string): number => s.length
  const gt2 = (n: number): boolean => n > 2

  const composition = fc.property(arb1, fa => S3.equals(F.map(fa, a => gt2(len(a))), F.map(F.map(fa, len), gt2)))

  fc.assert(identity1)
  fc.assert(identity2)
  fc.assert(composition)
}

export function monad<M extends URIS3>(
  M: Monad3<M>,
  lift: <A>(arb: fc.Arbitrary<A>, S: Setoid<A>) => [fc.Arbitrary<Type3<M, any, any, A>>, Setoid<Type3<M, any, any, A>>]
): void
export function monad<M extends URIS3, U, L>(
  M: Monad3C<M, U, L>,
  lift: <A>(arb: fc.Arbitrary<A>, S: Setoid<A>) => [fc.Arbitrary<Type3<M, any, any, A>>, Setoid<Type3<M, any, any, A>>]
): void
export function monad<M extends URIS2>(
  M: Monad2<M>,
  lift: <A>(arb: fc.Arbitrary<A>, S: Setoid<A>) => [fc.Arbitrary<Type2<M, any, A>>, Setoid<Type2<M, any, A>>]
): void
export function monad<M extends URIS2, L>(
  M: Monad2C<M, L>,
  lift: <A>(arb: fc.Arbitrary<A>, S: Setoid<A>) => [fc.Arbitrary<Type2<M, any, A>>, Setoid<Type2<M, any, A>>]
): void
export function monad<M extends URIS>(
  M: Monad1<M>,
  lift: <A>(arb: fc.Arbitrary<A>, S: Setoid<A>) => [fc.Arbitrary<Type<M, A>>, Setoid<Type<M, A>>]
): void
export function monad<M>(
  M: Monad<M>,
  lift: <A>(arb: fc.Arbitrary<A>, S: Setoid<A>) => [fc.Arbitrary<HKT<M, A>>, Setoid<HKT<M, A>>]
): void
export function monad<M>(
  M: Monad<M>,
  lift: <A>(arb: fc.Arbitrary<A>, S: Setoid<A>) => [fc.Arbitrary<HKT<M, A>>, Setoid<HKT<M, A>>]
): void {
  const [arb1, S1] = lift(fc.integer(), setoidNumber)
  const [arb2, S2] = lift(fc.string(), setoidString)
  const len = (s: string): HKT<M, number> => M.of(s.length)
  const concat = (s: string): HKT<M, string> => M.of(s + s)
  const double = (n: number): number => n * 2
  const removeA = (s: string): string => s.replace('A', '')

  const leftIdentity1 = fc.property(fc.string(), a => S1.equals(M.chain(M.of(a), len), len(a)))
  const rightIdentity1 = fc.property(arb1, fa => S1.equals(M.chain(fa, M.of), fa))
  const derivedMap1 = fc.property(arb1, fa => S1.equals(M.map(fa, double), M.chain(fa, a => M.of(double(a)))))

  const leftIdentity2 = fc.property(fc.string(), a => S2.equals(M.chain(M.of(a), concat), concat(a)))
  const rightIdentity2 = fc.property(arb2, fa => S2.equals(M.chain(fa, M.of), fa))
  const derivedMap2 = fc.property(arb2, fa => S2.equals(M.map(fa, removeA), M.chain(fa, a => M.of(removeA(a)))))

  fc.assert(leftIdentity1)
  fc.assert(rightIdentity1)
  fc.assert(derivedMap1)
  fc.assert(leftIdentity2)
  fc.assert(rightIdentity2)
  fc.assert(derivedMap2)
}
