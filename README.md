Oolong.js
=========
[![NPM version][npm-badge]](http://badge.fury.io/js/oolong)
[npm-badge]: https://badge.fury.io/js/oolong.png

**Oolong.js** is a library for JavaScript full of **object-related
utilities**.  It's similar to [Underscore.js][underscore], but it focuses
strictly on functions **dealing with objects**.  It's implementation emphasizes
**simplicity** and **good taste**. For example, it always **takes inherited
properties** into account leading to less surprises for users of your code.

**Oolong.js** grew out of my frustration with [Underscore.js][underscore]
and [Lodash.js][lodash] and their inconsistent and sometimes outright ignoring
of inherited properties. This leads to unnecessary complexity, arbitrary
constraints and a leaky-implementation in your code or public APIs. This
behavior is cancer propelled around by ignorance and misunderstandings between
dictionaries and interfaces. Oolong.js is my first step at killing it.

[underscore]: https://underscorejs.org
[lodash]: https://lodash.com


Installing
----------
```sh
npm install oolong
```

Oolong.js follows [semantic versioning](http://semver.org/), so feel free to
depend on its major version with something like `>= 1.0.0 < 2` (a.k.a `^1.0.0`).


API
---
For extended documentation on all functions, please see the
[Oolong.js API Documentation][api].

[api]: https://github.com/moll/js-oolong/blob/master/doc/API.md

### [Oolong](https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong)
- [assign](https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.assign)(target, source...)
- [clone](https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.clone)(object)
- [cloneDeep](https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.cloneDeep)(object)
- [create](https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.create)(prototype, [source...])
- [defaults](https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.defaults)(target, source...)
- [each](https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.each)(object, callback, [thisArg])
- [eachOwn](https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.eachOwn)(object, callback, [thisArg])
- [filter](https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.filter)(object, callback, [thisArg])
- [forEach](https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.forEach)(object, callback, [thisArg])
- [forEachOwn](https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.forEachOwn)(object, callback, [thisArg])
- [has](https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.has)(object, key)
- [hasOwn](https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.hasOwn)(object, key)
- [isEmpty](https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.isEmpty)(object)
- [isIn](https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.isIn)(object, key)
- [isInOwn](https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.isInOwn)(object, key)
- [isOwnEmpty](https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.isOwnEmpty)(object)
- [isPlainObject](https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.isPlainObject)(object)
- [keys](https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.keys)(object)
- [map](https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.map)(object, callback, [thisArg])
- [mapKeys](https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.mapKeys)(object, callback, [thisArg])
- [merge](https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.merge)(target, source...)
- [ownKeys](https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.ownKeys)(object)
- [reject](https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.reject)(object, callback, [thisArg])
- [values](https://github.com/moll/js-oolong/blob/master/doc/API.md#Oolong.values)(object)


License
-------
Oolong.js is released under a *Lesser GNU Affero General Public License*,
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

If you find Oolong.js needs improving, please don't hesitate to type to me
now at [andri@dot.ee][email] or [create an issue online][issues].

[email]: mailto:andri@dot.ee
[issues]: https://github.com/moll/js-oolong/issues
[moll]: http://themoll.com
[monday]: https://mondayapp.com
