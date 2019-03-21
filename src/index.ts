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
  const reflexivity = fc.property(arb, laws.setoid.reflexivity(S))
  const symmetry = fc.property(arb, arb, laws.setoid.simmetry(S))
  const transitivity = fc.property(arb, arb, arb, laws.setoid.transitivity(S))
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
 * @since 0.0.1
 */
export const semigroup = <A>(S: Semigroup<A>, Eq: Setoid<A>, arb: fc.Arbitrary<A>): void => {
  const associativity = fc.property(arb, arb, arb, laws.semigroup.associativity(S, Eq))
  fc.assert(associativity)
}

/**
 * Tests the `Monoid` laws
 * @since 0.0.1
 */
export const monoid = <A>(M: Monoid<A>, Eq: Setoid<A>, arb: fc.Arbitrary<A>): void => {
  semigroup(M, Eq, arb)
  const rightIdentity = fc.property(arb, laws.monoid.rightIdentity(M, Eq))
  const leftIdentity = fc.property(arb, laws.monoid.leftIdentity(M, Eq))
  fc.assert(rightIdentity)
  fc.assert(leftIdentity)
}

/**
 * Tests the `Semiring` laws
 * @since 0.0.1
 */
export const semiring = <A>(S: Semiring<A>, Eq: Setoid<A>, arb: fc.Arbitrary<A>, seed?: number): void => {
  const addAssociativity = fc.property(arb, arb, arb, laws.semiring.addAssociativity(S, Eq))
  const addIdentity = fc.property(arb, laws.semiring.addIdentity(S, Eq))
  const commutativity = fc.property(arb, arb, laws.semiring.commutativity(S, Eq))
  const mulAssociativity = fc.property(arb, arb, arb, laws.semiring.mulAssociativity(S, Eq))
  const mulIdentity = fc.property(arb, laws.semiring.mulIdentity(S, Eq))
  const leftDistributivity = fc.property(arb, arb, arb, laws.semiring.leftDistributivity(S, Eq))
  const rightDistributivity = fc.property(arb, arb, arb, laws.semiring.rightDistributivity(S, Eq))
  const annihilation = fc.property(arb, laws.semiring.annihilation(S, Eq))
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
  const additiveInverse = fc.property(arb, laws.ring.additiveInverse(R, S))
  fc.assert(additiveInverse)
}

/**
 * Tests the `Field` laws
 * @since 0.0.1
 */
export const field = <A>(F: Field<A>, S: Setoid<A>, arb: fc.Arbitrary<A>, seed?: number): void => {
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
 * @since 0.0.2
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
 * @since 0.0.2
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
 * @since 0.0.2
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
  const Sb = liftSetoid(setoidNumber)
  const fab: HKT<M, Function1<string, number>> = M.of((a: string) => a.length)
  const derivedAp = fc.property(arbFa, laws.chain.derivedAp(M, Sb, fab))

  fc.assert(associativity)
  fc.assert(derivedAp)

  const arb = fc.string().map(M.of)
  const Sa = liftSetoid(setoidString)
  const leftIdentity = fc.property(fc.string(), laws.monad.leftIdentity(M, Sb, afb))
  const rightIdentity = fc.property(arb, laws.monad.rightIdentity(M, Sa))
  const ab: Function1<string, number> = a => a.length
  const derivedMap = fc.property(arb, laws.monad.derivedMap(M, Sb, ab))

  fc.assert(leftIdentity)
  fc.assert(rightIdentity)
  fc.assert(derivedMap)
}
