Redux Toolkit simplifies the process of writing Redux logic and helps manage complex state and async operations in a scalable way.

### Store Structure

- The Redux store is configured in [`src/redux/store.js`](src/redux/store.js).
- State slices include:
  - [`auth`](src/redux/auth/authSlice.js): Handles authentication state and user info.
  - [`trains`](src/redux/train/trainSlice.js): Manages train search, filters, and selected train details.
  - [`bookings`](src/redux/bookings/bookingsSlice.js): Manages booking creation and user booking history.

### Async Actions

- Async thunks are defined using `createAsyncThunk` for operations like fetching trains, user authentication, and booking creation.
- Example: [`fetchTrains`](src/redux/train/trainSlice.js) fetches train data from the API.

### Usage

- Use `useSelector` to access state and `useDispatch` to dispatch actions in React components.
- All slices and thunks are organized under the `src/redux/` directory for maintainability.
