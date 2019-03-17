---
title: Either.ts
nav_order: 1
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [getEithers (function)](#geteithers-function)
- [getLefts (function)](#getlefts-function)
- [getRights (function)](#getrights-function)

---

# getEithers (function)

Returns an `Arbitrary` that yelds both `right`s and `left`s

**Signature**

```ts
export function getEithers<L, A>(leftArb: fc.Arbitrary<L>, rightArb: fc.Arbitrary<A>): fc.Arbitrary<Either<L, A>> { ... }
```

Added in v0.0.2

# getLefts (function)

Returns an `Arbitrary` that yelds only `left`s

**Signature**

```ts
export function getLefts<L, A>(arb: fc.Arbitrary<L>): fc.Arbitrary<Either<L, A>> { ... }
```

Added in v0.0.2

# getRights (function)

Returns an `Arbitrary` that yelds only `right`s

**Signature**

```ts
export function getRights<L, A>(arb: fc.Arbitrary<A>): fc.Arbitrary<Either<L, A>> { ... }
```

Added in v0.0.2
