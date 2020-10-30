---
title: Either.ts
nav_order: 1
parent: Modules
---

## Either overview

Added in v0.0.2

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [getEither](#geteither)
  - [getLeft](#getleft)
  - [getRight](#getright)

---

# utils

## getEither

Returns an `Arbitrary` that yelds both `left`s and `right`s

**Signature**

```ts
export declare function getEither<L, A>(leftArb: fc.Arbitrary<L>, rightArb: fc.Arbitrary<A>): fc.Arbitrary<Either<L, A>>
```

Added in v0.0.2

## getLeft

Returns an `Arbitrary` that yelds only `left`s

**Signature**

```ts
export declare function getLeft<L, A>(arb: fc.Arbitrary<L>): fc.Arbitrary<Either<L, A>>
```

Added in v0.0.2

## getRight

Returns an `Arbitrary` that yelds only `right`s

**Signature**

```ts
export declare function getRight<L, A>(arb: fc.Arbitrary<A>): fc.Arbitrary<Either<L, A>>
```

Added in v0.0.2
