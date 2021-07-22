INSERT INTO users (name, email, password) VALUES
  ('Roger Waters', 'roger@pinkfloyd.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Freddy Mercury', 'fred@queen.co.uk', '$2b$10$B86Uq9ZB2mjQaRKTLPWCjO9OdTE64mrk1IGJTosKrUN8R6QJtN68a'),
  ('Bob Dylan', 'me@bobdylan.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('James Hetfield', 'james@metallica.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (title, owner_id, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code) VALUES
  ('Winter House', 2, 'https://picsum.photos/200', 'https://picsum.photos/200/300', 200, 2, 2, 3, 'Canada', '28 Street SW', 'Calgary', 'AB', 'T3E 2J4'),
  ('Orlando House', 3, 'https://picsum.photos/200', 'https://picsum.photos/200/300', 150, 2, 2, 3, 'USA', 'Disney ST N', 'Orlando', 'FL', 'T4A 134'),
  ('Beach House', 1, 'https://picsum.photos/200', 'https://picsum.photos/200/300', 300, 0, 3, 5, 'Brazil', 'Av. Atlantica', 'Florianopolis', 'SC', '87044 050');

INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES
  ('2021-12-02', '2021-12-25', 1, 4),
  ('2021-06-02', '2021-06-25', 2, 4),
  ('2021-12-02', '2021-12-25', 1, 3),
  ('2021-06-02', '2021-06-25', 2, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES
  (4, 1, 1, 5, 'Awesome!'),
  (4, 2, 2, 3, 'It was ok!'),
  (3, 1, 3, 4, 'Fantastic!'),
  (3, 2, 4, 2, 'Meh...');
