PeerRent frontend lint-fix package
==================================

This archive is a source-only copy of your frontend with lint fixes applied.
It intentionally excludes node_modules, dist, and .env (your local secrets/config).
Keep your existing .env file in place.

Fixes:
- Split useAuth/useNotifications/useWishlist hooks into separate modules so
  provider files only export React components.
- Updated app hook imports to use the new hook modules.
- Deferred initial API-loading calls in NotificationContext, WishlistContext,
  EditItem, MyBookings, and Wishlist to avoid synchronous effect-state lint errors.
- Preserved existing service/API calls and application flows.

To use:
1. Back up your current frontend folder.
2. Extract this archive into your existing frontend folder, allowing files to merge/replace.
3. Do not delete your existing .env file.
4. Run `npm run lint` and `npm run build`.

If dependencies need to be restored, run `npm install` in the frontend folder.
