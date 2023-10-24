/**
 * @since 0.0.1
 */
import * as fc from 'fast-check'
import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3 } from 'fp-ts/lib/Applicative'
import { Apply, Apply1, Apply2, Apply2C, Apply3 } from 'fp-ts/lib/Apply'
import { Eq, eqBoolean, eqNumber, eqString } from 'fp-ts/lib/Eq'
import { Field } from 'fp-ts/lib/Field'
import { Functor, Functor1, Functor2, Functor2C, Functor3 } from 'fp-ts/lib/Functor'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from 'fp-ts/lib/HKT'
import { Monad, Monad1, Monad2, Monad2C, Monad3 } from 'fp-ts/lib/Monad'
import { Monoid } from 'fp-ts/lib/Monoid'
import { Ord } from 'fp-ts/lib/Ord'
import { Ring } from 'fp-ts/lib/Ring'
import { Semigroup } from 'fp-ts/lib/Semigroup'
import { Semiring } from 'fp-ts/lib/Semiring'
import * as laws from './laws'

/**
 * Tests the `Eq` laws
 *
 * @since 0.0.1
 */
export const eq = <A>(E: Eq<A>, arb: fc.Arbitrary<A>): void => {
  const reflexivity = fc.property(arb, laws.eq.reflexivity(E))
  const symmetry = fc.property(arb, arb, laws.eq.simmetry(E))
  const transitivity = fc.property(arb, arb, arb, laws.eq.transitivity(E))
  fc.assert(reflexivity)
  fc.assert(symmetry)
  fc.assert(transitivity)
}

/**
 * Tests the `Ord` laws
 *
 * @since 0.0.1
 */
export const ord = <A>(O: Ord<A>, arb: fc.Arbitrary<A>): void => {
  eq(O, arb)
  const totality = fc.property(arb, arb, laws.ord.totality(O))
  const reflexivity = fc.property(arb, laws.ord.reflexivity(O))
  const antisymmetry = fc.property(arb, arb, laws.ord.antisimmetry(O))
  const transitivity = fc.property(arb, arb, arb, laws.ord.transitivity(O))
  fc.assert(totality)
  fc.assert(reflexivity)
  fc.assert(antisymmetry)
  fc.assert(transitivity)
}

/**
 * Tests the `Semigroup` laws
 *
 * @example
 * import * as laws from 'fp-ts-laws'
 * import * as fc from 'fast-check'
 * import { Semigroup } from 'fp-ts/Semigroup'
 * import { eqString } from 'fp-ts/Eq'
 *
 * const semigroupSpace: Semigroup<string> = {
 *   concat: (x, y) => x + ' ' + y
 * }
 * laws.semigroup(semigroupSpace, eqString, fc.string())
 *
 * @since 0.0.1
 */
export const semigroup = <A>(S: Semigroup<A>, E: Eq<A>, arb: fc.Arbitrary<A>): void => {
  const associativity = fc.property(arb, arb, arb, laws.semigroup.associativity(S, E))
  fc.assert(associativity)
}

/**
 * Tests the `Monoid` laws
 *
 * @since 0.0.1
 */
export const monoid = <A>(M: Monoid<A>, E: Eq<A>, arb: fc.Arbitrary<A>): void => {
  semigroup(M, E, arb)
  const rightIdentity = fc.property(arb, laws.monoid.rightIdentity(M, E))
  const leftIdentity = fc.property(arb, laws.monoid.leftIdentity(M, E))
  fc.assert(rightIdentity)
  fc.assert(leftIdentity)
}

/**
 * Tests the `Semiring` laws
 *
 * @since 0.0.1
 */
export const semiring = <A>(S: Semiring<A>, E: Eq<A>, arb: fc.Arbitrary<A>, seed?: number): void => {
  const addAssociativity = fc.property(arb, arb, arb, laws.semiring.addAssociativity(S, E))
  const addIdentity = fc.property(arb, laws.semiring.addIdentity(S, E))
  const commutativity = fc.property(arb, arb, laws.semiring.commutativity(S, E))
  const mulAssociativity = fc.property(arb, arb, arb, laws.semiring.mulAssociativity(S, E))
  const mulIdentity = fc.property(arb, laws.semiring.mulIdentity(S, E))
  const leftDistributivity = fc.property(arb, arb, arb, laws.semiring.leftDistributivity(S, E))
  const rightDistributivity = fc.property(arb, arb, arb, laws.semiring.rightDistributivity(S, E))
  const annihilation = fc.property(arb, laws.semiring.annihilation(S, E))
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
 *
 * @since 0.0.1
 */
export const ring = <A>(R: Ring<A>, S: Eq<A>, arb: fc.Arbitrary<A>, seed?: number): void => {
  semiring(R, S, arb, seed)
  const additiveInverse = fc.property(arb, laws.ring.additiveInverse(R, S))
  fc.assert(additiveInverse)
}

/**
 * Tests the `Field` laws
 *
 * @since 0.0.1
 */
export const field = <A>(F: Field<A>, S: Eq<A>, arb: fc.Arbitrary<A>, seed?: number): void => {
  ring(F, S, arb, seed)
  if (S.equals(F.zero, F.one)) {
    throw new Error(`one should not be equal to zero`)
  }
  const commutativity = fc.property(arb, arb, laws.field.commutativity(F, S))
  const integralDomain = fc.property(arb, arb, laws.field.integralDomain(F, S))
  const nonNegativity = fc.property(arb, laws.field.nonNegativity(F, S))
  const quotient = fc.property(arb, arb, laws.field.quotient(F, S))
  const reminder = fc.property(arb, arb, laws.field.reminder(F, S))
  const submultiplicative = fc.property(arb, arb, laws.field.submultiplicative(F, S))
  const inverse = fc.property(arb, laws.field.inverse(F, S))
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
 *
 * @since 0.1.0
 */
export function functor<F extends URIS3>(
  F: Functor3<F>
): <U, L>(
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Kind3<F, U, L, A>>,
  liftEq: <A>(Sa: Eq<A>) => Eq<Kind3<F, U, L, A>>
) => void
export function functor<F extends URIS2>(
  F: Functor2<F>
): <L>(
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Kind2<F, L, A>>,
  liftEq: <A>(Sa: Eq<A>) => Eq<Kind2<F, L, A>>
) => void
export function functor<F extends URIS2, L>(
  F: Functor2C<F, L>
): (lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Kind2<F, L, A>>, liftEq: <A>(Sa: Eq<A>) => Eq<Kind2<F, L, A>>) => void
export function functor<F extends URIS>(
  F: Functor1<F>
): (lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Kind<F, A>>, liftEq: <A>(Sa: Eq<A>) => Eq<Kind<F, A>>) => void
export function functor<F>(
  F: Functor<F>
): (lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<HKT<F, A>>, liftEq: <A>(Sa: Eq<A>) => Eq<HKT<F, A>>) => void
export function functor<F>(
  F: Functor<F>
): (lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<HKT<F, A>>, liftEq: <A>(Sa: Eq<A>) => Eq<HKT<F, A>>) => void {
  return (lift, liftEq) => {
    const arb = lift(fc.string())
    const Sa = liftEq(eqString)
    const Sc = liftEq(eqNumber)
    const identity = fc.property(arb, laws.functor.identity(F, Sa))
    const ab = (s: string): number | undefined | null => (s.length === 1 ? undefined : s.length === 2 ? null : s.length)
    const bc = (n: number | undefined | null): number => (n === undefined ? 1 : n === null ? 2 : n * 2)

    const composition = fc.property(arb, laws.functor.composition(F, Sc, ab, bc))

    fc.assert(identity)
    fc.assert(composition)
  }
}

/**
 * Tests the `Apply` laws
 *
 * @since 0.1.0
 */
export function apply<F extends URIS3>(
  F: Apply3<F>
): <U, L>(
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Kind3<F, U, L, A>>,
  liftEq: <A>(Sa: Eq<A>) => Eq<Kind3<F, U, L, A>>
) => void
export function apply<F extends URIS2>(
  F: Apply2<F>
): <L>(
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Kind2<F, L, A>>,
  liftEq: <A>(Sa: Eq<A>) => Eq<Kind2<F, L, A>>
) => void
export function apply<F extends URIS2, L>(
  F: Apply2C<F, L>
): (lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Kind2<F, L, A>>, liftEq: <A>(Sa: Eq<A>) => Eq<Kind2<F, L, A>>) => void
export function apply<F extends URIS>(
  F: Apply1<F>
): (lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Kind<F, A>>, liftEq: <A>(Sa: Eq<A>) => Eq<Kind<F, A>>) => void
export function apply<F>(
  F: Apply<F>
): (lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<HKT<F, A>>, liftEq: <A>(Sa: Eq<A>) => Eq<HKT<F, A>>) => void
export function apply<F>(
  F: Apply<F>
): (lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<HKT<F, A>>, liftEq: <A>(Sa: Eq<A>) => Eq<HKT<F, A>>) => void {
  const functorF = functor(F)
  return (lift, liftEq) => {
    functorF(lift, liftEq)

    const Sc = liftEq(eqBoolean)
    const arbFa = lift(fc.string())
    const arbFab = lift(fc.constant((a: string) => a.length))
    const arbFbc = lift(fc.constant((b: number) => b > 2))
    const associativeComposition = fc.property(arbFa, arbFab, arbFbc, laws.apply.associativeComposition(F, Sc))

    fc.assert(associativeComposition)
  }
}

/**
 * Tests the `Applicative` laws
 *
 * @since 0.1.0
 */
export function applicative<F extends URIS3>(
  F: Applicative3<F>
): <U, L>(
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Kind3<F, U, L, A>>,
  liftEq: <A>(Sa: Eq<A>) => Eq<Kind3<F, U, L, A>>
) => void
export function applicative<F extends URIS2>(
  F: Applicative2<F>
): <L>(
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Kind2<F, L, A>>,
  liftEq: <A>(Sa: Eq<A>) => Eq<Kind2<F, L, A>>
) => void
export function applicative<F extends URIS2, L>(
  F: Applicative2C<F, L>
): (lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Kind2<F, L, A>>, liftEq: <A>(Sa: Eq<A>) => Eq<Kind2<F, L, A>>) => void
export function applicative<F extends URIS>(
  F: Applicative1<F>
): (lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Kind<F, A>>, liftEq: <A>(Sa: Eq<A>) => Eq<Kind<F, A>>) => void
export function applicative<F>(
  F: Applicative<F>
): (lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<HKT<F, A>>, liftEq: <A>(Sa: Eq<A>) => Eq<HKT<F, A>>) => void
export function applicative<F>(
  F: Applicative<F>
): (lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<HKT<F, A>>, liftEq: <A>(Sa: Eq<A>) => Eq<HKT<F, A>>) => void {
  const applyF = apply(F)
  return (lift, liftEq) => {
    applyF(lift, liftEq)

    const arbFa = lift(fc.string())
    const Sa = liftEq(eqString)
    const Sb = liftEq(eqNumber)
    const identity = fc.property(arbFa, laws.applicative.identity(F, Sa))
    const ab = (s: string) => s.length
    const homomorphism = fc.property(fc.string(), laws.applicative.homomorphism(F, Sb, ab))
    const arbFab = lift(fc.constant(ab))
    const interchange = fc.property(fc.string(), arbFab, laws.applicative.interchange(F, Sb))
    const derivedMap = fc.property(arbFa, laws.applicative.derivedMap(F, Sb, ab))

    fc.assert(identity)
    fc.assert(homomorphism)
    fc.assert(interchange)
    fc.assert(derivedMap)
  }
}

/**
 * Tests the `Monad` laws
 *
 * @since 0.1.0
 */
export function monad<M extends URIS3>(M: Monad3<M>): <U, L>(liftEq: <A>(Sa: Eq<A>) => Eq<Kind3<M, U, L, A>>) => void
export function monad<M extends URIS2>(M: Monad2<M>): <L>(liftEq: <A>(Sa: Eq<A>) => Eq<Kind2<M, L, A>>) => void
export function monad<M extends URIS2, L>(M: Monad2C<M, L>): (liftEq: <A>(Sa: Eq<A>) => Eq<Kind2<M, L, A>>) => void
export function monad<M extends URIS>(M: Monad1<M>): (liftEq: <A>(Sa: Eq<A>) => Eq<Kind<M, A>>) => void
export function monad<M>(M: Monad<M>): (liftEq: <A>(Sa: Eq<A>) => Eq<HKT<M, A>>) => void
export function monad<M>(M: Monad<M>): (liftEq: <A>(Sa: Eq<A>) => Eq<HKT<M, A>>) => void {
  const applicativeM = applicative(M)
  return liftEq => {
    applicativeM(arb => arb.map(M.of), liftEq)

    const Sc = liftEq(eqBoolean)
    const arbFa = fc.string().map(M.of)
    const afb = (s: string) => M.of(s.length)
    const bfc = (n: number) => M.of(n > 2)
    const associativity = fc.property(arbFa, laws.chain.associativity(M, Sc, afb, bfc))
    const Sb = liftEq(eqNumber)
    const fab = M.of((a: string) => a.length)
    const derivedAp = fc.property(arbFa, laws.chain.derivedAp(M, Sb, fab))

    fc.assert(associativity)
    fc.assert(derivedAp)

    const arb = fc.string().map(M.of)
    const Sa = liftEq(eqString)
    const leftIdentity = fc.property(fc.string(), laws.monad.leftIdentity(M, Sb, afb))
    const rightIdentity = fc.property(arb, laws.monad.rightIdentity(M, Sa))
    const ab = (s: string) => s.length
    const derivedMap = fc.property(arb, laws.monad.derivedMap(M, Sb, ab))

    fc.assert(leftIdentity)
    fc.assert(rightIdentity)
    fc.assert(derivedMap)
  }
}
