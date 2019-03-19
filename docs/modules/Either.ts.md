---
title: Either.ts
nav_order: 1
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [getEither (function)](#geteither-function)
- [getLeft (function)](#getleft-function)
- [getRight (function)](#getright-function)

---

# getEither (function)

Returns an `Arbitrary` that yelds both `left`s and `right`s

**Signature**

```ts
export function getEither<L, A>(leftArb: fc.Arbitrary<L>, rightArb: fc.Arbitrary<A>): fc.Arbitrary<Either<L, A>> { ... }
```

Added in v0.0.2

# getLeft (function)

Returns an `Arbitrary` that yelds only `left`s

**Signature**

```ts
export function getLeft<L, A>(arb: fc.Arbitrary<L>): fc.Arbitrary<Either<L, A>> { ... }
```

Added in v0.0.2

# getRight (function)

Returns an `Arbitrary` that yelds only `right`s

**Signature**

```ts
export function getRight<L, A>(arb: fc.Arbitrary<A>): fc.Arbitrary<Either<L, A>> { ... }
```

Added in v0.0.2
