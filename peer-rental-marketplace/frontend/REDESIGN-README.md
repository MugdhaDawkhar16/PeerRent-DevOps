# PeerRent frontend redesign

This package redesigns the frontend layout and visual system while retaining the existing React routes, API service functions, request/response contracts, authentication state, booking flows, wishlist actions, reviews, and payment verification logic. No backend files are included or changed.

## What changed

- Marketplace home page: editorial split hero, working search, category filters, listing count, redesigned cards, and a call-to-action section.
- Navigation: responsive desktop/mobile navigation, cleaner action hierarchy, notification menu, and list-item entry point.
- Authentication: redesigned login/register layouts, password visibility controls, clearer fields and states.
- Item creation/editing: reorganized listing editor with sections, photo preview/upload area, and clearer price/category inputs.
- Account/activity pages: consistent presentation for dashboard, bookings, wishlist, listings, notifications, and item details.
- Password recovery pages: updated styling and layout.
- Responsive behavior, subtle motion, focus styles, and reduced-motion support.

## Apply it

1. Back up your current `frontend` folder.
2. Extract the contents of this archive into your existing `frontend` folder and allow source files to be replaced.
3. Keep your existing `.env` file and do not overwrite backend files.
4. From the frontend folder run:

   ```powershell
   npm run lint
   npm run build
   ```

The source passed ESLint in the build workspace. A production build could not be run in the Linux workspace because the uploaded `node_modules` did not include the Linux-specific optional native binding for Vite/Rolldown. Run the build locally on your Windows setup to verify.
