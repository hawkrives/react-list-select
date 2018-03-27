# Changes

## v0.4.0
- Split `focusItem({next, previous, index})` into `focusNext()`, `focusPrevious()`, and `focusIndex(index)`
- Removed `makeList` factory. To replicate the functionality, pass `keyboardEvents={false}` directly to the List component
- Upgraded React dependency to `>=15`
- Updated build tooling and internal dependencies
- Moved compiled files to `dist/` folder
