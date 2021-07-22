const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
  // user: process.env.DB_USER,
  // host: process.env.DB_HOST,
  // database: process.env.DB_NAME,
  // password: process.env.DB_PASS,
  // port: process.env.DB_PORT
});


/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = (options, limit = 10) => {
  const queryString = `SELECT * FROM properties LIMIT $1;`;
  const queryParams = [limit];

  return pool
    .query(queryString, queryParams)
    .then((result) => result.rows)
    .catch((err) => err.message);
};

/// Users
/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = (email) => {
  const queryString = `SELECT * FROM users WHERE email = $1;`;
  const queryParams = [email];

  return pool
    .query(queryString, queryParams)
    .then((result) => {
      if (result.rows.length > 0) {
        return result.rows[0];
      }
      return null;
    })
    .catch((err) => err.message);
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = (id) => {
  const queryString = `SELECT * FROM users WHERE id = $1;`;
  const queryParams = [id];

  return pool
    .query(queryString, queryParams)
    .then((result) => {
      if (result.rows.length > 0) {
        return result.rows[0];
      }
      return null;
    })
    .catch((err) => err.message);
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = (user) => {
  const username = user.name;
  const email = user.email;
  const password = user.password;

  const queryString = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`;
  const queryParams = [username, email, password];

  return pool
    .query(queryString, queryParams)
    .then((result) => {
      if (result.rows.length > 0) {
        return result.rows[0];
      }
      return null;
    })
    .catch((err) => err.message);
};


/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = (guest_id, limit = 10) => {
  const queryString = `SELECT * FROM reservations JOIN properties ON properties.id = property_id WHERE guest_id = $1 GROUP BY reservations.id, properties.id, properties.title, cost_per_night
  ORDER BY start_date DESC LIMIT $2;`;
  const queryParams = [guest_id, limit];

  return pool
    .query(queryString, queryParams)
    .then((result) => {
      if (result.rows.length > 0) {
        console.log('My reservations', result.rows);
        return result.rows;
      }
      return null;
    })
    .catch((err) => err.message);
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};

module.exports = { pool, getAllProperties, addProperty, getAllReservations, addUser, getUserWithId, getUserWithEmail };

// const username = user.name;
// const email = user.email;
// const password = user.password;

// const queryString = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`;
// const queryParams = [username, email, password];

// return pool
//   .query(queryString, queryParams)
//   .then((result) => {
//     if (result.rows.length > 0) {
//       return result.rows[0];
//     }
//     return null;
//   })
//   .catch((err) => err.message);
// };