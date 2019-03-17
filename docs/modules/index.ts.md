---
title: index.ts
nav_order: 2
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [field (function)](#field-function)
- [functor (function)](#functor-function)
- [monoid (function)](#monoid-function)
- [ord (function)](#ord-function)
- [ring (function)](#ring-function)
- [semigroup (function)](#semigroup-function)
- [semiring (function)](#semiring-function)
- [setoid (function)](#setoid-function)

---

# field (function)

Tests the `Field` laws

**Signature**

```ts
export const field = <A>(F: Field<A>, S: Setoid<A>, arb: fc.Arbitrary<A>, seed?: number): void => ...
```

Added in v0.0.1

# functor (function)

Tests the `Functor` laws

**Signature**

```ts
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
): void { ... }
```

Added in v0.0.2

# monoid (function)

Tests the `Monoid` laws

**Signature**

```ts
export const monoid = <A>(M: Monoid<A>, Eq: Setoid<A>, arb: fc.Arbitrary<A>): void => ...
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
export const ring = <A>(R: Ring<A>, S: Setoid<A>, arb: fc.Arbitrary<A>, seed?: number): void => ...
```

Added in v0.0.1

# semigroup (function)

Tests the `Semigroup` laws

**Signature**

```ts
export const semigroup = <A>(S: Semigroup<A>, Eq: Setoid<A>, arb: fc.Arbitrary<A>): void => ...
```

Added in v0.0.1

# semiring (function)

Tests the `Semiring` laws

**Signature**

```ts
export const semiring = <A>(S: Semiring<A>, Eq: Setoid<A>, arb: fc.Arbitrary<A>, seed?: number): void => ...
```

Added in v0.0.1

# setoid (function)

Tests the `Setoid` laws

**Signature**

```ts
export const setoid = <A>(S: Setoid<A>, arb: fc.Arbitrary<A>): void => ...
```

Added in v0.0.1
