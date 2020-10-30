/**
 * @since 0.0.2
 */
import * as fc from 'fast-check'
import { Either, left, right } from 'fp-ts/lib/Either'

/**
 * Returns an `Arbitrary` that yelds only `right`s
 *
 * @since 0.0.2
 */
export function getRight<L, A>(arb: fc.Arbitrary<A>): fc.Arbitrary<Either<L, A>> {
  return arb.map(a => right(a))
}

/**
 * Returns an `Arbitrary` that yelds only `left`s
 *
 * @since 0.0.2
 */
export function getLeft<L, A>(arb: fc.Arbitrary<L>): fc.Arbitrary<Either<L, A>> {
  return arb.map(l => left(l))
}

/**
 * Returns an `Arbitrary` that yelds both `left`s and `right`s
 *
 * @since 0.0.2
 */
export function getEither<L, A>(leftArb: fc.Arbitrary<L>, rightArb: fc.Arbitrary<A>): fc.Arbitrary<Either<L, A>> {
  return fc.oneof(getLeft<L, A>(leftArb), getRight<L, A>(rightArb))
}
