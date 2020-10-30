/**
 * @since 0.0.2
 */
import * as fc from 'fast-check'
import { none, Option, some } from 'fp-ts/lib/Option'

/**
 * Returns an `Arbitrary` that yelds only `some`s
 *
 * @since 0.0.2
 */
export function getSome<A>(arb: fc.Arbitrary<A>): fc.Arbitrary<Option<A>> {
  return arb.map(some)
}

/**
 * Returns an `Arbitrary` that yelds only `none`s
 *
 * @since 0.0.2
 */
export function getNone<A>(): fc.Arbitrary<Option<A>> {
  return fc.constant(none)
}

/**
 * Returns an `Arbitrary` that yelds both `none`s and `some`s
 *
 * @since 0.0.2
 */
export function getOption<A>(arb: fc.Arbitrary<A>): fc.Arbitrary<Option<A>> {
  return fc.oneof(getNone<A>(), getSome<A>(arb))
}
