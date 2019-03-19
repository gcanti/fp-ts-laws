---
title: Option.ts
nav_order: 3
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [getNone (function)](#getnone-function)
- [getOption (function)](#getoption-function)
- [getSome (function)](#getsome-function)

---

# getNone (function)

Returns an `Arbitrary` that yelds only `none`s

**Signature**

```ts
export function getNone<A>(): fc.Arbitrary<Option<A>> { ... }
```

Added in v0.0.2

# getOption (function)

Returns an `Arbitrary` that yelds both `none`s and `some`s

**Signature**

```ts
export function getOption<A>(arb: fc.Arbitrary<A>): fc.Arbitrary<Option<A>> { ... }
```

Added in v0.0.2

# getSome (function)

Returns an `Arbitrary` that yelds only `some`s

**Signature**

```ts
export function getSome<A>(arb: fc.Arbitrary<A>): fc.Arbitrary<Option<A>> { ... }
```

Added in v0.0.2
