<!-- ## Project Documentation

Please put any and all documentation for your project in this folder. Other than the documents that are required at the end of week 13, feel free to organize this however your group sees fit. -->

# Reel Reviews

- Nick Ignatovich
- Jonah Han
- Kevin Almonte
- Will Mo

# Intended Market

We are targeting fellow movie lovers who are looking to leave their unfiltered reviews and become a part
of our evergrowing community.

# Functionality

- New visitors to the site can:
  - Search for any movie and get a breakdown of the movie's details (title, release date, actors, directors, trailer, etc...).
  - Select a genre and see a list of related movies.
  - See reviews already left by other users .
  - Create an account to interact with the site (Signup, Login, Logout all functional).
- Once signed up/logged in, users will be able to leave a review for a movie of their choosing on the movie details page. As part of the review form, they can also leave a Like/Dislike rating.
- If a user has already left a review for a movie, the next time they navigate to that movie they will only be able to update their existing review. Only one review per user per movie will be allowed.
- Main page will include a search feature, which will be populated with search results.
  - Main page will also display dynamic "New Releases" and "Top Rated" lists of movies.
  - Users can click on any movie poster and they will be redirected to that movie's details page.
- Logged in users can navigate to their profile page via a link in the navbar.
  - On a user's profile page, they can see their username, avatar, and a list of their positively and negatively reviewed movies.

# Project Initialization

To start leaving your hot takes on Reel Reviews, follow these steps:

1. Clone the repository down to your local machine
2. Navigate into the new project directory in your terminal
3. Run `docker volume create pg_admin` and `docker volume create postgres-data`
4. Run `docker compose build`
5. Run `docker compose up`
6. Navigate to http://localhost:3000 in your broswer
7. Enjoy!
