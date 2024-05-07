const isNumeric = num => (typeof(num) === 'number' || typeof(num) === "string" && num.trim() !== '');
const requestLogger = (req, res, next) => {
  console.log(`${req.method} url:: ${req.url}`);
  next();
};

const requestError = (err, req, res, next) => {
  console.error(err.stack);
  console.log('Error: ', err.message);
  res.status(500).send(err.message ?? 'Something went wrong');
}

module.exports = {isNumeric, requestError, requestLogger}