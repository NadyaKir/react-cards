export const logActionMiddleware = () => (next) => (action) => {
  console.log('Dispatching action:', action.type);
  if (action.payload) {
    console.log('Action payload:', action.payload);
  } else {
    console.log('Action has no payload');
  }

  return next(action);
};
