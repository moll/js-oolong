Overstrike.js
=============
[![NPM version][npm-badge]](http://badge.fury.io/js/overstrike)
[npm-badge]: https://badge.fury.io/js/overstrike.png

**Overstrike.js** is utility library in the style of Underscore.js with
**consistent inherited property** handling and the **simplest implementation**
and more usefulness curated by yours truly.

If you know Underscore.js (or Lodash.js), then you might know it has
inconsistent handling of inherited properties, often outright ignoring them.
This leads to unnecessary complexity, arbitrary constraints and
a leaky-implementation in your code or public APIs. Among other things, this
library is a fix to those problems by always honoring inherited properties in
given objects.

Overstrike.js is work-in-progress and gets expanded on a need-to basis at the
moment. It'll get most of the utility methods of Underscore at one point and API
documentation.


Using
-----
Install with: `npm install overstrike`


License
-------
Overstrike.js is released under a *Lesser GNU Affero General Public License*, which
in summary means:

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

If you find Overstrike.js needs improving, please don't hesitate to type to me
now at [andri@dot.ee][email] or [create an issue online][issues].

[email]: mailto:andri@dot.ee
[issues]: https://github.com/moll/js-overstrike/issues
[moll]: http://themoll.com
[monday]: https://mondayapp.com
