---
title: laws.ts
nav_order: 3
parent: Modules
---

## laws overview

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [applicative](#applicative)
  - [apply](#apply)
  - [chain](#chain)
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

**Signature**

```ts
export declare const applicative: {
  identity: <F, A>(F: Applicative<F>, S: Eq<HKT<F, A>>) => (fa: HKT<F, A>) => boolean
  homomorphism: <F, A, B>(F: Applicative<F>, S: Eq<HKT<F, B>>, ab: FunctionN<[A], B>) => (a: A) => boolean
  interchange: <F, A, B>(F: Applicative<F>, S: Eq<HKT<F, B>>) => (a: A, fab: HKT<F, FunctionN<[A], B>>) => boolean
  derivedMap: <F, A, B>(F: Applicative<F>, S: Eq<HKT<F, B>>, ab: FunctionN<[A], B>) => (fa: HKT<F, A>) => boolean
}
```

Added in v0.1.0

## apply

**Signature**

```ts
export declare const apply: {
  associativeComposition: <F, A, B, C>(
    F: Apply<F>,
    S: Eq<HKT<F, C>>
  ) => (fa: HKT<F, A>, fab: HKT<F, FunctionN<[A], B>>, fbc: HKT<F, FunctionN<[B], C>>) => boolean
}
```

Added in v0.1.0

## chain

**Signature**

```ts
export declare const chain: {
  associativity: <F, A, B, C>(
    F: Chain<F>,
    S: Eq<HKT<F, C>>,
    afb: FunctionN<[A], HKT<F, B>>,
    bfc: FunctionN<[B], HKT<F, C>>
  ) => (fa: HKT<F, A>) => boolean
  derivedAp: <F, A, B>(F: Chain<F>, S: Eq<HKT<F, B>>, fab: HKT<F, FunctionN<[A], B>>) => (fa: HKT<F, A>) => boolean
}
```

Added in v0.1.0

## eq

**Signature**

```ts
export declare const eq: {
  reflexivity: <A>(E: Eq<A>) => (a: A) => boolean
  simmetry: <A>(E: Eq<A>) => (a: A, b: A) => boolean
  transitivity: <A>(E: Eq<A>) => (a: A, b: A, c: A) => boolean
}
```

Added in v0.1.0

## field

**Signature**

```ts
export declare const field: {
  commutativity: <A>(F: Field<A>, S: Eq<A>) => (a: A, b: A) => boolean
  integralDomain: <A>(F: Field<A>, S: Eq<A>) => (a: A, b: A) => boolean
  nonNegativity: <A>(F: Field<A>, S: Eq<A>) => (a: A) => boolean
  quotient: <A>(F: Field<A>, S: Eq<A>) => (a: A, b: A) => boolean
  reminder: <A>(F: Field<A>, S: Eq<A>) => (a: A, b: A) => boolean
  submultiplicative: <A>(F: Field<A>, S: Eq<A>) => (a: A, b: A) => boolean
  inverse: <A>(F: Field<A>, S: Eq<A>) => (a: A) => boolean
}
```

Added in v0.1.0

## functor

**Signature**

```ts
export declare const functor: {
  identity: <F, A>(F: Functor<F>, S: Eq<HKT<F, A>>) => (fa: HKT<F, A>) => boolean
  composition: <F, A, B, C>(
    F: Functor<F>,
    S: Eq<HKT<F, C>>,
    ab: FunctionN<[A], B>,
    bc: FunctionN<[B], C>
  ) => (fa: HKT<F, A>) => boolean
}
```

Added in v0.1.0

## monad

**Signature**

```ts
export declare const monad: {
  leftIdentity: <M, A, B>(M: Monad<M>, S: Eq<HKT<M, B>>, afb: FunctionN<[A], HKT<M, B>>) => (a: A) => boolean
  rightIdentity: <M, A>(M: Monad<M>, S: Eq<HKT<M, A>>) => (fa: HKT<M, A>) => boolean
  derivedMap: <M, A, B>(M: Monad<M>, S: Eq<HKT<M, B>>, ab: FunctionN<[A], B>) => (fa: HKT<M, A>) => boolean
}
```

Added in v0.1.0

## monoid

**Signature**

```ts
export declare const monoid: {
  rightIdentity: <A>(M: Monoid<A>, E: Eq<A>) => (a: A) => boolean
  leftIdentity: <A>(M: Monoid<A>, E: Eq<A>) => (a: A) => boolean
}
```

Added in v0.1.0

## ord

**Signature**

```ts
export declare const ord: {
  totality: <A>(O: Ord<A>) => (a: A, b: A) => boolean
  reflexivity: <A>(O: Ord<A>) => (a: A) => boolean
  antisimmetry: <A>(O: Ord<A>) => (a: A, b: A) => boolean
  transitivity: <A>(O: Ord<A>) => (a: A, b: A, c: A) => boolean
}
```

Added in v0.1.0

## ring

**Signature**

```ts
export declare const ring: { additiveInverse: <A>(R: Ring<A>, E: Eq<A>) => (a: A) => boolean }
```

Added in v0.1.0

## semigroup

**Signature**

```ts
export declare const semigroup: { associativity: <A>(S: Semigroup<A>, E: Eq<A>) => (a: A, b: A, c: A) => boolean }
```

Added in v0.1.0

## semiring

**Signature**

```ts
export declare const semiring: {
  addAssociativity: <A>(S: Semiring<A>, E: Eq<A>) => (a: A, b: A, c: A) => boolean
  addIdentity: <A>(S: Semiring<A>, E: Eq<A>) => (a: A) => boolean
  commutativity: <A>(S: Semiring<A>, E: Eq<A>) => (a: A, b: A) => boolean
  mulAssociativity: <A>(S: Semiring<A>, E: Eq<A>) => (a: A, b: A, c: A) => boolean
  mulIdentity: <A>(S: Semiring<A>, E: Eq<A>) => (a: A) => boolean
  leftDistributivity: <A>(S: Semiring<A>, E: Eq<A>) => (a: A, b: A, c: A) => boolean
  rightDistributivity: <A>(S: Semiring<A>, E: Eq<A>) => (a: A, b: A, c: A) => boolean
  annihilation: <A>(S: Semiring<A>, E: Eq<A>) => (a: A) => boolean
}
```

Added in v0.1.0
