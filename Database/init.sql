CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password TEXT NOT NULL
); 

CREATE TABLE tickets (
  ticket_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  ticket_date TIMESTAMP NOT NULL,
  start_event_date TIMESTAMP NOT NULL,
  end_event_date TIMESTAMP NOT NULL,
  cost NUMERIC(30, 2) NOT NULL
);

CREATE TABLE ticket_info (
  ticket_id INT PRIMARY KEY,
  tickets_amount NUMERIC NOT NULL,
  FOREIGN KEY (ticket_id) REFERENCES tickets(ticket_id) ON DELETE CASCADE
);

CREATE TABLE wallet (
  id INT PRIMARY KEY,
  money NUMERIC NOT NULL,
  FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TYPE reservation_status AS ENUM ('PENDING', 'SUCCESS');

CREATE TABLE reservations (
  user_id INT NOT NULL,
  ticket_id INT NOT NULL,
  end_date TIMESTAMP NOT NULL,
  status reservation_status NOT NULL,

  PRIMARY KEY (user_id, ticket_id),

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (ticket_id) REFERENCES tickets(ticket_id)
);

CREATE INDEX idx_date ON reservations(end_date);