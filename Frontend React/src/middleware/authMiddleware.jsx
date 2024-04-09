import { logoutUser } from '../store/userSlice';

const authMiddleware = (store) => (next) => (action) => {
  if (action.type === 'dashboard/unauthorizedAccess') {
    store.dispatch(logoutUser());
  }
  return next(action);
};

export default authMiddleware;
