const { ApiError, HTTP_CONSTANT } = require('core');
const R = require('ramda');

module.exports.hasPermission = data => (req, _, next) => {
  const { roles } = req.decoded;
  return R.ifElse(
    () => R.isEmpty(data),
    () => next(new ApiError(HTTP_CONSTANT.UNAUTHORIZED, 'unauthorized', 'unauthorized')),
    () => R.ifElse(
      () => R.isEmpty(R.intersection(data, roles)),
      () => next(new ApiError(HTTP_CONSTANT.UNAUTHORIZED, 'unauthorized', 'unauthorized')),
      () => next(null, true)
    )()
  )();
};
