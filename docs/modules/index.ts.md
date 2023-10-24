---
title: index.ts
nav_order: 2
parent: Modules
---

## index overview

Added in v0.0.1

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [applicative](#applicative)
  - [apply](#apply)
  - [eq](#eq)
  - [field](#field)
  - [functor](#functor)
  - [monad](#monad)
  - [monoid](#monoid)
  - [ord](#ord)
  - [ring](#ring)
  - [semigroup](#semigroup)
  - [semiring](#semiring)

---

# utils

## applicative

Tests the `Applicative` laws

**Signature**

```ts
export declare function applicative<F extends URIS3>(
  F: Applicative3<F>
): <U, L>(
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Kind3<F, U, L, A>>,
  liftEq: <A>(Sa: Eq<A>) => Eq<Kind3<F, U, L, A>>
) => void
export declare function applicative<F extends URIS2>(
  F: Applicative2<F>
): <L>(
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Kind2<F, L, A>>,
  liftEq: <A>(Sa: Eq<A>) => Eq<Kind2<F, L, A>>
) => void
export declare function applicative<F extends URIS2, L>(
  F: Applicative2C<F, L>
): (lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Kind2<F, L, A>>, liftEq: <A>(Sa: Eq<A>) => Eq<Kind2<F, L, A>>) => void
export declare function applicative<F extends URIS>(
  F: Applicative1<F>
): (lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Kind<F, A>>, liftEq: <A>(Sa: Eq<A>) => Eq<Kind<F, A>>) => void
export declare function applicative<F>(
  F: Applicative<F>
): (lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<HKT<F, A>>, liftEq: <A>(Sa: Eq<A>) => Eq<HKT<F, A>>) => void
```

Added in v0.1.0

## apply

Tests the `Apply` laws

**Signature**

```ts
export declare function apply<F extends URIS3>(
  F: Apply3<F>
): <U, L>(
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Kind3<F, U, L, A>>,
  liftEq: <A>(Sa: Eq<A>) => Eq<Kind3<F, U, L, A>>
) => void
export declare function apply<F extends URIS2>(
  F: Apply2<F>
): <L>(
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Kind2<F, L, A>>,
  liftEq: <A>(Sa: Eq<A>) => Eq<Kind2<F, L, A>>
) => void
export declare function apply<F extends URIS2, L>(
  F: Apply2C<F, L>
): (lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Kind2<F, L, A>>, liftEq: <A>(Sa: Eq<A>) => Eq<Kind2<F, L, A>>) => void
export declare function apply<F extends URIS>(
  F: Apply1<F>
): (lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Kind<F, A>>, liftEq: <A>(Sa: Eq<A>) => Eq<Kind<F, A>>) => void
export declare function apply<F>(
  F: Apply<F>
): (lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<HKT<F, A>>, liftEq: <A>(Sa: Eq<A>) => Eq<HKT<F, A>>) => void
```

Added in v0.1.0

## eq

Tests the `Eq` laws

**Signature**

```ts
export declare const eq: <A>(E: Eq<A>, arb: fc.Arbitrary<A>) => void
```

Added in v0.0.1

## field

Tests the `Field` laws

**Signature**

```ts
export declare const field: <A>(F: Field<A>, S: Eq<A>, arb: fc.Arbitrary<A>, seed?: number) => void
```

Added in v0.0.1

## functor

Tests the `Functor` laws

**Signature**

```ts
export declare function functor<F extends URIS3>(
  F: Functor3<F>
): <U, L>(
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Kind3<F, U, L, A>>,
  liftEq: <A>(Sa: Eq<A>) => Eq<Kind3<F, U, L, A>>
) => void
export declare function functor<F extends URIS2>(
  F: Functor2<F>
): <L>(
  lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Kind2<F, L, A>>,
  liftEq: <A>(Sa: Eq<A>) => Eq<Kind2<F, L, A>>
) => void
export declare function functor<F extends URIS2, L>(
  F: Functor2C<F, L>
): (lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Kind2<F, L, A>>, liftEq: <A>(Sa: Eq<A>) => Eq<Kind2<F, L, A>>) => void
export declare function functor<F extends URIS>(
  F: Functor1<F>
): (lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Kind<F, A>>, liftEq: <A>(Sa: Eq<A>) => Eq<Kind<F, A>>) => void
export declare function functor<F>(
  F: Functor<F>
): (lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<HKT<F, A>>, liftEq: <A>(Sa: Eq<A>) => Eq<HKT<F, A>>) => void
```

Added in v0.1.0

## monad

Tests the `Monad` laws

**Signature**

```ts
export declare function monad<M extends URIS3>(
  M: Monad3<M>
): <U, L>(liftEq: <A>(Sa: Eq<A>) => Eq<Kind3<M, U, L, A>>) => void
export declare function monad<M extends URIS2>(M: Monad2<M>): <L>(liftEq: <A>(Sa: Eq<A>) => Eq<Kind2<M, L, A>>) => void
export declare function monad<M extends URIS2, L>(
  M: Monad2C<M, L>
): (liftEq: <A>(Sa: Eq<A>) => Eq<Kind2<M, L, A>>) => void
export declare function monad<M extends URIS>(M: Monad1<M>): (liftEq: <A>(Sa: Eq<A>) => Eq<Kind<M, A>>) => void
export declare function monad<M>(M: Monad<M>): (liftEq: <A>(Sa: Eq<A>) => Eq<HKT<M, A>>) => void
```

Added in v0.1.0

## monoid

Tests the `Monoid` laws

**Signature**

```ts
export declare const monoid: <A>(M: Monoid<A>, E: Eq<A>, arb: fc.Arbitrary<A>) => void
```

Added in v0.0.1

## ord

Tests the `Ord` laws

**Signature**

```ts
export declare const ord: <A>(O: Ord<A>, arb: fc.Arbitrary<A>) => void
```

Added in v0.0.1

## ring

Tests the `Ring` laws

**Signature**

```ts
export declare const ring: <A>(R: Ring<A>, S: Eq<A>, arb: fc.Arbitrary<A>, seed?: number) => void
```

Added in v0.0.1

## semigroup

Tests the `Semigroup` laws

**Signature**

```ts
export declare const semigroup: <A>(S: Semigroup<A>, E: Eq<A>, arb: fc.Arbitrary<A>) => void
```

**Example**

```ts
import * as laws from 'fp-ts-laws'
import * as fc from 'fast-check'
import { Semigroup } from 'fp-ts/Semigroup'
import { eqString } from 'fp-ts/Eq'

const semigroupSpace: Semigroup<string> = {
  concat: (x, y) => x + ' ' + y
}
laws.semigroup(semigroupSpace, eqString, fc.string())
```

Added in v0.0.1

## semiring

Tests the `Semiring` laws

**Signature**

```ts
export declare const semiring: <A>(S: Semiring<A>, E: Eq<A>, arb: fc.Arbitrary<A>, seed?: number) => void
```

Added in v0.0.1
