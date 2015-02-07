Objectware.js
=============
[![NPM version][npm-badge]](http://badge.fury.io/js/objectware)
[npm-badge]: https://badge.fury.io/js/objectware.png

**Objectware.js** is a library for JavaScript full of **object-related
utilities**.  It's similar to [Underscore.js][underscore], but it focuses
strictly on functions **dealing with objects**.  It's implementation emphasizes
**simplicity** and **good taste**. For example, it always **takes inherited
properties** into account leading to less surprises for users of your code.

**Objectware.js** grew out of my frustration with [Underscore.js][underscore]
and [Lodash.js][lodash] and their inconsistent and sometimes outright ignoring
of inherited properties. This leads to unnecessary complexity, arbitrary
constraints and a leaky-implementation in your code or public APIs. This
behavior is cancer propelled around by ignorance and misunderstandings between
dictionaries and interfaces. Objectware.js is my first step at killing it.

[underscore]: https://underscorejs.org
[lodash]: https://lodash.com


Installing
----------
```sh
npm install objectware
```

Objectware.js follows [semantic versioning](http://semver.org/), so feel free to
depend on its major version with something like `>= 1.0.0 < 2` (a.k.a `^1.0.0`).


API
---
For extended documentation on all functions, please see the
[Objectware.js API Documentation][api].

[api]: https://github.com/moll/js-objectware/blob/master/doc/API.md

### [Objectware](https://github.com/moll/js-objectware/blob/master/doc/API.md#Objectware)
- [assign](https://github.com/moll/js-objectware/blob/master/doc/API.md#Objectware.assign)(target, source...)
- [clone](https://github.com/moll/js-objectware/blob/master/doc/API.md#Objectware.clone)(object)
- [filter](https://github.com/moll/js-objectware/blob/master/doc/API.md#Objectware.filter)(object, callback, [thisArg])
- [isEmpty](https://github.com/moll/js-objectware/blob/master/doc/API.md#Objectware.isEmpty)(object)
- [isPlainObject](https://github.com/moll/js-objectware/blob/master/doc/API.md#Objectware.isPlainObject)(object)
- [keys](https://github.com/moll/js-objectware/blob/master/doc/API.md#Objectware.keys)(object)
- [map](https://github.com/moll/js-objectware/blob/master/doc/API.md#Objectware.map)(object, callback, [thisArg])
- [mapKeys](https://github.com/moll/js-objectware/blob/master/doc/API.md#Objectware.mapKeys)(object, callback, [thisArg])
- [values](https://github.com/moll/js-objectware/blob/master/doc/API.md#Objectware.values)(object)


License
-------
Objectware.js is released under a *Lesser GNU Affero General Public License*,
which in summary means:

- You **can** use this program for **no cost**.
- You **can** use this program for **both personal and commercial reasons**.
- You **do not have to share your own program's code** which uses this program.
- You **have to share modifications** (e.g. bug-fixes) you've made to this
  program.

For more convoluted language, see the `LICENSE` file.


About
-----
**[Andri Möll][moll]** typed this and the code.  
[Monday Calendar][monday] supported the engineering work.

If you find Objectware.js needs improving, please don't hesitate to type to me
now at [andri@dot.ee][email] or [create an issue online][issues].

[email]: mailto:andri@dot.ee
[issues]: https://github.com/moll/js-objectware/issues
[moll]: http://themoll.com
[monday]: https://mondayapp.com
