const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log('DB connected successfully');
  })
  .catch((err) => {
    console.log(err);
  });

// const testTour = new Tour({
//   name: 'The Forest Hiker 3',
//   rating: 4.9,
//   price: 510,
// });

// testTour
//   .save()
//   .then((doc) => console.log(doc))
//   .catch((err) => console.log('ERROR :', err));

app.listen(5556, () => {
  console.log('API started on http://localhost:5556');
});
