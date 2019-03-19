import * as fc from 'fast-check'
import { failure, success, Validation } from 'fp-ts/lib/Validation'

/**
 * Returns an `Arbitrary` that yelds only `success`es
 * @since 0.0.2
 */
export function getSuccess<L, A>(arb: fc.Arbitrary<A>): fc.Arbitrary<Validation<L, A>> {
  return arb.map(a => success(a))
}

/**
 * Returns an `Arbitrary` that yelds only `failure`s
 * @since 0.0.2
 */
export function getFailure<L, A>(arb: fc.Arbitrary<L>): fc.Arbitrary<Validation<L, A>> {
  return arb.map(l => failure(l))
}

/**
 * Returns an `Arbitrary` that yelds both `failure`es and `success`s
 * @since 0.0.2
 */
export function getValidation<L, A>(
  failureArb: fc.Arbitrary<L>,
  successArb: fc.Arbitrary<A>
): fc.Arbitrary<Validation<L, A>> {
  return fc.oneof(getFailure(failureArb), getSuccess(successArb))
}
