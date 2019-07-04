# Changelog

> **Tags:**
>
> - [New Feature]
> - [Bug Fix]
> - [Breaking Change]
> - [Documentation]
> - [Internal]
> - [Polish]
> - [Experimental]

**Note**: Gaps between patch versions are faulty/broken releases.
**Note**: A feature tagged as Experimental is in a high state of flux, you're at risk of it changing without notice.

# 0.2.0

- **Breaking Change**
  - upgrade to `fp-ts@2.x` (@gcanti)
  - remove `lib/Validation` module (@gcanti)
  - rename `setoid` law to `eq` (@gcanti)

# 0.1.0

- **Breaking Change**
  - `Functor`, `Apply`, `Applicative` and `Monad` laws are now curried (@gcanti)

# 0.0.3

- **New Feature**
  - add missing derivedAp test to monad (@giogonzo)
  - extract setoid, ord, semigroup, monoid, semiring, ring, field laws (@giogonzo)

# 0.0.2

- **New Feature**
  - add `Functor` laws (@gcanti)
  - add `Apply`, `Applicative`, `Chain`, `Monad` laws (@giogonzo)

# 0.0.1

Initial release
