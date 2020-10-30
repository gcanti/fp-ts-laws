/**
 * @since 0.1.0
 */
import { Eq } from 'fp-ts/lib/Eq'
import { Functor } from 'fp-ts/lib/Functor'
import { HKT } from 'fp-ts/lib/HKT'
import { Apply } from 'fp-ts/lib/Apply'
import { Chain } from 'fp-ts/lib/Chain'
import { Applicative } from 'fp-ts/lib/Applicative'
import { Monad } from 'fp-ts/lib/Monad'
import { Ord } from 'fp-ts/lib/Ord'
import { Semigroup } from 'fp-ts/lib/Semigroup'
import { Monoid } from 'fp-ts/lib/Monoid'
import { Semiring } from 'fp-ts/lib/Semiring'
import { Ring } from 'fp-ts/lib/Ring'
import { Field } from 'fp-ts/lib/Field'
import { FunctionN } from 'fp-ts/lib/function'

/**
 * @since 0.1.0
 */
export const eq = {
  reflexivity: <A>(E: Eq<A>) => (a: A): boolean => {
    return E.equals(a, a)
  },
  simmetry: <A>(E: Eq<A>) => (a: A, b: A): boolean => {
    return E.equals(a, b) === E.equals(b, a)
  },
  transitivity: <A>(E: Eq<A>) => (a: A, b: A, c: A): boolean => {
    return (E.equals(a, b) && E.equals(b, c)) === (E.equals(a, b) && E.equals(a, c))
  }
}

/**
 * @since 0.1.0
 */
export const ord = {
  totality: <A>(O: Ord<A>) => (a: A, b: A): boolean => {
    return O.compare(a, b) <= 0 || O.compare(b, a) <= 0
  },
  reflexivity: <A>(O: Ord<A>) => (a: A): boolean => {
    return O.compare(a, a) <= 0
  },
  antisimmetry: <A>(O: Ord<A>) => (a: A, b: A): boolean => {
    return (O.compare(a, b) <= 0 && O.compare(b, a) <= 0) === O.equals(a, b)
  },
  transitivity: <A>(O: Ord<A>) => (a: A, b: A, c: A): boolean => {
    return !(O.compare(a, b) <= 0 && O.compare(b, c) <= 0) || O.compare(a, c) <= 0
  }
}

/**
 * @since 0.1.0
 */
export const semigroup = {
  associativity: <A>(S: Semigroup<A>, E: Eq<A>) => (a: A, b: A, c: A): boolean => {
    return E.equals(S.concat(S.concat(a, b), c), S.concat(a, S.concat(b, c)))
  }
}

/**
 * @since 0.1.0
 */
export const monoid = {
  rightIdentity: <A>(M: Monoid<A>, E: Eq<A>) => (a: A): boolean => {
    return E.equals(M.concat(a, M.empty), a)
  },
  leftIdentity: <A>(M: Monoid<A>, E: Eq<A>) => (a: A): boolean => {
    return E.equals(M.concat(M.empty, a), a)
  }
}

const allEquals = <A>(E: Eq<A>) => (a: A, ...as: Array<A>): boolean => {
  return as.every(item => E.equals(item, a))
}

/**
 * @since 0.1.0
 */
export const semiring = {
  addAssociativity: <A>(S: Semiring<A>, E: Eq<A>) => (a: A, b: A, c: A): boolean => {
    return E.equals(S.add(S.add(a, b), c), S.add(a, S.add(b, c)))
  },
  addIdentity: <A>(S: Semiring<A>, E: Eq<A>) => (a: A): boolean => {
    return allEquals(E)(a, S.add(a, S.zero), S.add(S.zero, a))
  },
  commutativity: <A>(S: Semiring<A>, E: Eq<A>) => (a: A, b: A): boolean => {
    return E.equals(S.add(a, b), S.add(b, a))
  },
  mulAssociativity: <A>(S: Semiring<A>, E: Eq<A>) => (a: A, b: A, c: A): boolean => {
    return E.equals(S.mul(S.mul(a, b), c), S.mul(a, S.mul(b, c)))
  },
  mulIdentity: <A>(S: Semiring<A>, E: Eq<A>) => (a: A): boolean => {
    return allEquals(E)(a, S.mul(a, S.one), S.mul(S.one, a))
  },
  leftDistributivity: <A>(S: Semiring<A>, E: Eq<A>) => (a: A, b: A, c: A): boolean => {
    return E.equals(S.mul(a, S.add(b, c)), S.add(S.mul(a, b), S.mul(a, c)))
  },
  rightDistributivity: <A>(S: Semiring<A>, E: Eq<A>) => (a: A, b: A, c: A): boolean => {
    return E.equals(S.mul(S.add(a, b), c), S.add(S.mul(a, c), S.mul(b, c)))
  },
  annihilation: <A>(S: Semiring<A>, E: Eq<A>) => (a: A): boolean => {
    return allEquals(E)(S.zero, S.mul(a, S.zero), S.mul(S.zero, a))
  }
}

/**
 * @since 0.1.0
 */
export const ring = {
  additiveInverse: <A>(R: Ring<A>, E: Eq<A>) => (a: A): boolean => {
    return allEquals(E)(R.sub(a, a), R.add(R.sub(R.zero, a), a), R.zero)
  }
}

/**
 * @since 0.1.0
 */
export const field = {
  commutativity: <A>(F: Field<A>, S: Eq<A>) => (a: A, b: A): boolean => {
    return S.equals(F.mul(a, b), F.mul(b, a))
  },
  integralDomain: <A>(F: Field<A>, S: Eq<A>) => (a: A, b: A): boolean => {
    return S.equals(a, F.zero) || S.equals(b, F.zero) || !S.equals(F.mul(a, b), F.zero)
  },
  nonNegativity: <A>(F: Field<A>, S: Eq<A>) => (a: A): boolean => {
    return S.equals(a, F.zero) || F.degree(a) >= 0
  },
  quotient: <A>(F: Field<A>, S: Eq<A>) => (a: A, b: A): boolean => {
    const q = F.div(a, b)
    const r = F.mod(a, b)
    return S.equals(b, F.zero) || S.equals(a, F.add(F.mul(q, b), r))
  },
  reminder: <A>(F: Field<A>, S: Eq<A>) => (a: A, b: A): boolean => {
    const r = F.mod(a, b)
    return S.equals(b, F.zero) || S.equals(r, F.zero) || F.degree(a) <= F.degree(b)
  },
  submultiplicative: <A>(F: Field<A>, S: Eq<A>) => (a: A, b: A): boolean => {
    return S.equals(a, F.zero) || S.equals(b, F.zero) || F.degree(a) <= F.degree(F.mul(a, b))
  },
  inverse: <A>(F: Field<A>, S: Eq<A>) => (a: A): boolean => {
    const i = F.div(F.one, a)
    return S.equals(a, F.zero) || allEquals(S)(F.one, F.mul(i, a), F.mul(a, i))
  }
}

/**
 * @since 0.1.0
 */
export const functor = {
  identity: <F, A>(F: Functor<F>, S: Eq<HKT<F, A>>) => (fa: HKT<F, A>): boolean => {
    return S.equals(F.map(fa, a => a), fa)
  },
  composition: <F, A, B, C>(F: Functor<F>, S: Eq<HKT<F, C>>, ab: FunctionN<[A], B>, bc: FunctionN<[B], C>) => (
    fa: HKT<F, A>
  ): boolean => {
    return S.equals(F.map(fa, a => bc(ab(a))), F.map(F.map(fa, ab), bc))
  }
}

/**
 * @since 0.1.0
 */
export const apply = {
  associativeComposition: <F, A, B, C>(F: Apply<F>, S: Eq<HKT<F, C>>) => (
    fa: HKT<F, A>,
    fab: HKT<F, FunctionN<[A], B>>,
    fbc: HKT<F, FunctionN<[B], C>>
  ): boolean => {
    return S.equals(
      F.ap(F.ap(F.map(fbc, bc => (ab: FunctionN<[A], B>) => (a: A) => bc(ab(a))), fab), fa),
      F.ap(fbc, F.ap(fab, fa))
    )
  }
}

/**
 * @since 0.1.0
 */
export const applicative = {
  identity: <F, A>(F: Applicative<F>, S: Eq<HKT<F, A>>) => (fa: HKT<F, A>): boolean => {
    return S.equals(F.ap(F.of((a: A) => a), fa), fa)
  },
  homomorphism: <F, A, B>(F: Applicative<F>, S: Eq<HKT<F, B>>, ab: FunctionN<[A], B>) => (a: A): boolean => {
    return S.equals(F.ap(F.of(ab), F.of(a)), F.of(ab(a)))
  },
  interchange: <F, A, B>(F: Applicative<F>, S: Eq<HKT<F, B>>) => (a: A, fab: HKT<F, FunctionN<[A], B>>): boolean => {
    return S.equals(F.ap(fab, F.of(a)), F.ap(F.of((ab: FunctionN<[A], B>) => ab(a)), fab))
  },
  derivedMap: <F, A, B>(F: Applicative<F>, S: Eq<HKT<F, B>>, ab: FunctionN<[A], B>) => (fa: HKT<F, A>): boolean => {
    return S.equals(F.map(fa, ab), F.ap(F.of(ab), fa))
  }
}

/**
 * @since 0.1.0
 */
export const chain = {
  associativity: <F, A, B, C>(
    F: Chain<F>,
    S: Eq<HKT<F, C>>,
    afb: FunctionN<[A], HKT<F, B>>,
    bfc: FunctionN<[B], HKT<F, C>>
  ) => (fa: HKT<F, A>): boolean => {
    return S.equals(F.chain(F.chain(fa, afb), bfc), F.chain(fa, a => F.chain(afb(a), bfc)))
  },
  derivedAp: <F, A, B>(F: Chain<F>, S: Eq<HKT<F, B>>, fab: HKT<F, FunctionN<[A], B>>) => (fa: HKT<F, A>): boolean => {
    return S.equals(F.ap(fab, fa), F.chain(fab, f => F.map(fa, f)))
  }
}

/**
 * @since 0.1.0
 */
export const monad = {
  leftIdentity: <M, A, B>(M: Monad<M>, S: Eq<HKT<M, B>>, afb: FunctionN<[A], HKT<M, B>>) => (a: A): boolean => {
    return S.equals(M.chain(M.of(a), afb), afb(a))
  },
  rightIdentity: <M, A>(M: Monad<M>, S: Eq<HKT<M, A>>) => (fa: HKT<M, A>): boolean => {
    return S.equals(M.chain(fa, M.of), fa)
  },
  derivedMap: <M, A, B>(M: Monad<M>, S: Eq<HKT<M, B>>, ab: FunctionN<[A], B>) => (fa: HKT<M, A>): boolean => {
    return S.equals(M.map(fa, ab), M.chain(fa, a => M.of(ab(a))))
  }
}
