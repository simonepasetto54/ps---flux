import React from "react";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import Header from "./common/Header";
import CoursesPage from "./CoursesPage";
import NotFoundPage from "./NotFoundPage";
import ManageCoursePage from "./ManageCoursePage";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <div className="container-fluid">
      <ToastContainer autoClose={3000} hideProgressBar/>
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} /> {/*exact viene inserito per evitare che la homepage venga renderizzata insieme alle altre avendo le altre la / */}
        <Route path="/courses/slug" component={CoursesPage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/course/:slug" component={ManageCoursePage} /> {/* è importasnte posizionare il /course al di sotto dello :slug perchè  */}
        <Route path="/course" component={ManageCoursePage} /> {/*posizionandolo sopra lo slug non funzionerebbe perchè incontra per primo il /course che essendo valido sempre utilizzerò quello*/}
        <Redirect from="/about-page" to="/about" />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
