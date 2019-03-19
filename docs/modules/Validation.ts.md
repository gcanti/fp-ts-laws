---
title: Validation.ts
nav_order: 5
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [getFailure (function)](#getfailure-function)
- [getSuccess (function)](#getsuccess-function)
- [getValidation (function)](#getvalidation-function)

---

# getFailure (function)

Returns an `Arbitrary` that yelds only `failure`s

**Signature**

```ts
export function getFailure<L, A>(arb: fc.Arbitrary<L>): fc.Arbitrary<Validation<L, A>> { ... }
```

Added in v0.0.2

# getSuccess (function)

Returns an `Arbitrary` that yelds only `success`es

**Signature**

```ts
export function getSuccess<L, A>(arb: fc.Arbitrary<A>): fc.Arbitrary<Validation<L, A>> { ... }
```

Added in v0.0.2

# getValidation (function)

Returns an `Arbitrary` that yelds both `failure`es and `success`s

**Signature**

```ts
export function getValidation<L, A>(
  failureArb: fc.Arbitrary<L>,
  successArb: fc.Arbitrary<A>
): fc.Arbitrary<Validation<L, A>> { ... }
```

Added in v0.0.2
