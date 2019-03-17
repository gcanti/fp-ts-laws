import * as fc from 'fast-check'
import { failure, success, Validation } from 'fp-ts/lib/Validation'

/**
 * Returns an `Arbitrary` that yelds both `success`es and `failure`s
 * @since 0.0.2
 */
export function getValidations<L, A>(
  failureArb: fc.Arbitrary<L>,
  successArb: fc.Arbitrary<A>
): fc.Arbitrary<Validation<L, A>> {
  return fc.tuple(failureArb, successArb).chain(([l, a]) => fc.boolean().map(b => (b ? success(a) : failure(l))))
}

/**
 * Returns an `Arbitrary` that yelds only `success`es
 * @since 0.0.2
 */
export function getSuccesses<L, A>(arb: fc.Arbitrary<A>): fc.Arbitrary<Validation<L, A>> {
  return arb.map(a => success(a))
}

/**
 * Returns an `Arbitrary` that yelds only `failure`s
 * @since 0.0.2
 */
export function getFailures<L, A>(arb: fc.Arbitrary<L>): fc.Arbitrary<Validation<L, A>> {
  return arb.map(l => failure(l))
}
