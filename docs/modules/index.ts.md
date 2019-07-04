---
title: index.ts
nav_order: 2
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [applicative (function)](#applicative-function)
- [apply (function)](#apply-function)
- [eq (function)](#eq-function)
- [field (function)](#field-function)
- [functor (function)](#functor-function)
- [monad (function)](#monad-function)
- [monoid (function)](#monoid-function)
- [ord (function)](#ord-function)
- [ring (function)](#ring-function)
- [semigroup (function)](#semigroup-function)
- [semiring (function)](#semiring-function)

---

# applicative (function)

Tests the `Applicative` laws

**Signature**

```ts
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
): (lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<HKT<F, A>>, liftEq: <A>(Sa: Eq<A>) => Eq<HKT<F, A>>) => void { ... }
```

Added in v0.1.0

# apply (function)

Tests the `Apply` laws

**Signature**

```ts
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
): (lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<HKT<F, A>>, liftEq: <A>(Sa: Eq<A>) => Eq<HKT<F, A>>) => void { ... }
```

Added in v0.1.0

# eq (function)

Tests the `Eq` laws

**Signature**

```ts
export const eq = <A>(E: Eq<A>, arb: fc.Arbitrary<A>): void => ...
```

Added in v0.0.1

# field (function)

Tests the `Field` laws

**Signature**

```ts
export const field = <A>(F: Field<A>, S: Eq<A>, arb: fc.Arbitrary<A>, seed?: number): void => ...
```

Added in v0.0.1

# functor (function)

Tests the `Functor` laws

**Signature**

```ts
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
): (lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<HKT<F, A>>, liftEq: <A>(Sa: Eq<A>) => Eq<HKT<F, A>>) => void { ... }
```

Added in v0.1.0

# monad (function)

Tests the `Monad` laws

**Signature**

```ts
export function monad<M extends URIS3>(M: Monad3<M>): <U, L>(liftEq: <A>(Sa: Eq<A>) => Eq<Kind3<M, U, L, A>>) => void
export function monad<M extends URIS2>(M: Monad2<M>): <L>(liftEq: <A>(Sa: Eq<A>) => Eq<Kind2<M, L, A>>) => void
export function monad<M extends URIS2, L>(M: Monad2C<M, L>): (liftEq: <A>(Sa: Eq<A>) => Eq<Kind2<M, L, A>>) => void
export function monad<M extends URIS>(M: Monad1<M>): (liftEq: <A>(Sa: Eq<A>) => Eq<Kind<M, A>>) => void
export function monad<M>(M: Monad<M>): (liftEq: <A>(Sa: Eq<A>) => Eq<HKT<M, A>>) => void { ... }
```

Added in v0.1.0

# monoid (function)

Tests the `Monoid` laws

**Signature**

```ts
export const monoid = <A>(M: Monoid<A>, E: Eq<A>, arb: fc.Arbitrary<A>): void => ...
```

Added in v0.0.1

# ord (function)

Tests the `Ord` laws

**Signature**

```ts
export const ord = <A>(O: Ord<A>, arb: fc.Arbitrary<A>): void => ...
```

Added in v0.0.1

# ring (function)

Tests the `Ring` laws

**Signature**

```ts
export const ring = <A>(R: Ring<A>, S: Eq<A>, arb: fc.Arbitrary<A>, seed?: number): void => ...
```

Added in v0.0.1

# semigroup (function)

Tests the `Semigroup` laws

**Signature**

```ts
export const semigroup = <A>(S: Semigroup<A>, E: Eq<A>, arb: fc.Arbitrary<A>): void => ...
```

**Example**

```ts
import * as laws from 'fp-ts-laws'
import * as fc from 'fast-check'
import { Semigroup } from 'fp-ts/lib/Semigroup'
import { eqString } from 'fp-ts/lib/Eq'

const semigroupSpace: Semigroup<string> = {
  concat: (x, y) => x + ' ' + y
}
laws.semigroup(semigroupSpace, eqString, fc.string())
```

Added in v0.0.1

# semiring (function)

Tests the `Semiring` laws

**Signature**

```ts
export const semiring = <A>(S: Semiring<A>, E: Eq<A>, arb: fc.Arbitrary<A>, seed?: number): void => ...
```

Added in v0.0.1
