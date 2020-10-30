---
title: Option.ts
nav_order: 4
parent: Modules
---

## Option overview

Added in v0.0.2

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [getNone](#getnone)
  - [getOption](#getoption)
  - [getSome](#getsome)

---

# utils

## getNone

Returns an `Arbitrary` that yelds only `none`s

**Signature**

```ts
export declare function getNone<A>(): fc.Arbitrary<Option<A>>
```

Added in v0.0.2

## getOption

Returns an `Arbitrary` that yelds both `none`s and `some`s

**Signature**

```ts
export declare function getOption<A>(arb: fc.Arbitrary<A>): fc.Arbitrary<Option<A>>
```

Added in v0.0.2

## getSome

Returns an `Arbitrary` that yelds only `some`s

**Signature**

```ts
export declare function getSome<A>(arb: fc.Arbitrary<A>): fc.Arbitrary<Option<A>>
```

Added in v0.0.2
