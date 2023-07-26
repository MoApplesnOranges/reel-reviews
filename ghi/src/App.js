import React, { useState } from "react";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./MainPage.js";
import SignupForm from "./SignupForm.js";
import LoginForm from "./LoginForm.js";
import Nav from "./NavBar.js";
import Action from "./genres/action";
import Adventure from "./genres/adventure";
import Animation from "./genres/animation";
import Comedy from "./genres/comedy";
import Crime from "./genres/crime";
import Documentary from "./genres/documentary";
import Drama from "./genres/drama";
import Family from "./genres/family";
import Fantasy from "./genres/fantasy";
import History from "./genres/history";
import Horror from "./genres/horror";
import Music from "./genres/music";
import Mystery from "./genres/mystery";
import Romance from "./genres/romance";
import ScienceFiction from "./genres/scienceFiction";
import TVMovie from "./genres/tvMovie";
import Thriller from "./genres/thriller";
import War from "./genres/war";
import Western from "./genres/western";
import MovieDetails from "./MovieDetails";
import Logout from "./Logout";
import TokenContext from "./TokenContext";

function App(props) {
  const [Hidelogin, setHidelogin] = useState(true);
  const baseURL = process.env.REACT_APP_API_HOST;
  const [Hidelogin, setHidelogin] = useState(false);
  // const SharedHideLoginContext = React.createContext();
  // return (
  //   <SharedStateContext.Provider value={{ Hidelogin, setHidelogin }}>
  //     <Nav />
  //     <LoginForm />
  //   </SharedStateContext.Provider>
  // );

  if (
    props.action === undefined &&
    props.adventure === undefined &&
    props.animation === undefined &&
    props.comedy === undefined &&
    props.crime === undefined &&
    props.documentary === undefined &&
    props.drama === undefined &&
    props.family === undefined &&
    props.history === undefined &&
    props.horror === undefined &&
    props.music === undefined &&
    props.mystery === undefined &&
    props.romance === undefined &&
    props.scienceFiction === undefined &&
    props.tvMovie === undefined &&
    props.thriller === undefined &&
    props.war === undefined &&
    props.western === undefined &&
    props.fantasy === undefined
  ) {
    return null;
  }

  return (
    <BrowserRouter>
      <TokenContext.Provider value={[Hidelogin, setHidelogin]}>
        <Nav />
        <div className="container">
          <AuthProvider baseUrl={baseURL}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/movie/:movie_id" element={<MovieDetails />} />
              <Route
                path="/genres/action"
                element={<Action actionData={props.action} />}
              />
              <Route
                path="/genres/adventure"
                element={<Adventure adventureData={props.adventure} />}
              />
              <Route
                path="/genres/animation"
                element={<Animation animationData={props.animation} />}
              />
              <Route
                path="/genres/comedy"
                element={<Comedy comedyData={props.comedy} />}
              />
              <Route
                path="/genres/crime"
                element={<Crime crimeData={props.crime} />}
              />
              <Route
                path="/genres/documentary"
                element={<Documentary documentaryData={props.documentary} />}
              />
              <Route
                path="/genres/drama"
                element={<Drama dramaData={props.drama} />}
              />
              <Route
                path="/genres/family"
                element={<Family familyData={props.family} />}
              />
              <Route
                path="/genres/fantasy"
                element={<Fantasy fantasyData={props.fantasy} />}
              />
              <Route
                path="/genres/history"
                element={<History historyData={props.history} />}
              />
              <Route
                path="/genres/horror"
                element={<Horror horrorData={props.horror} />}
              />
              <Route
                path="/genres/music"
                element={<Music musicData={props.music} />}
              />
              <Route
                path="/genres/mystery"
                element={<Mystery mysteryData={props.mystery} />}
              />
              <Route
                path="/genres/romance"
                element={<Romance romanceData={props.romance} />}
              />
              <Route
                path="/genres/sciencefiction"
                element={
                  <ScienceFiction sciencefictionData={props.scienceFiction} />
                }
              />
              <Route
                path="/genres/tvmovie"
                element={<TVMovie tvMovieData={props.tvMovie} />}
              />
              <Route
                path="/genres/thriller"
                element={<Thriller thrillerData={props.thriller} />}
              />
              <Route path="/genres/war" element={<War warData={props.war} />} />
              <Route
                path="/genres/western"
                element={<Western westernData={props.western} />}
              />
            </Routes>
          </AuthProvider>
        </div>
      </TokenContext.Provider>
    </BrowserRouter>
  );
}

export default App;
