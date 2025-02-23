const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });
console.log(process.env);

app.listen(5556, () => {
  console.log('API started on http://localhost:5556');
});
