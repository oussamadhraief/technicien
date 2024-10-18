import 'devextreme/dist/css/dx.light.css';
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
// import 'devextreme/dist/css/dx.light.css';

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/palettes/dark.system.css";

import "./theme/variables.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateIntervention from "./pages/CreateIntervention";
import ClientDetails from "./pages/ClientDetails";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { AuthProvider } from "./contexts/AuthContext";
import MyInterventions from './pages/MyInterventions';
import SingleIntervention from './pages/SingleIntervention';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <AuthProvider>
      <IonReactRouter>
        <IonRouterOutlet>
            
            <Route path="/" exact>
              <Login />
            </Route>
            <Route path="/register" exact>
              <Register />
            </Route>

            
            <Route path="/home">
              <Layout>
                <Home />
              </Layout>
            </Route>
            <Route path="/create-intervention" exact>
              <Layout>
                <ClientDetails />
              </Layout>
            </Route>
            <Route path="/create-intervention/info">
              <Layout>
                <CreateIntervention />
              </Layout>
            </Route>
            <Route path="/interventions">
              <Layout>
                <MyInterventions />
              </Layout>
            </Route>
            <Route path="/intervention/:id">
              <Layout>
                <SingleIntervention />
              </Layout>
            </Route>

            <Redirect to="/home" />
        </IonRouterOutlet>
      </IonReactRouter>
    </AuthProvider>
  </IonApp>
);

export default App;
