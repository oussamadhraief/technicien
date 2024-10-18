import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonInput,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const Login: React.FC = () => {
  const { login } = useAuth();

  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      history.push('/home');
    }
  }, [history]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await login(username, password);
    history.push('/home');
  };

  return (
    <IonPage className="bg-primary">
      <div className="absolute inset-0 bg-primary flex flex-col items-center">
        <div className="py-14 w-72 -ml-5">
          <IonImg src="/icon_logo BWS.svg"></IonImg>
        </div>
        <IonContent>
          <div className="absolute inset-0 bg-primary p-5">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col bg-primarylight/60 gap-3 p-5 shadow-2xl rounded-3xl"
            >
              <h1 className="text-center text-secondary text-3xl font-bold">Connexion</h1>
              <label htmlFor="username" className="text-white">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={e => setUsername(e.target.value)}
                placeholder="Nom d'utilisateur"
                className="px-2 py-3 rounded-full"
              />
              <label htmlFor="Password" className="text-white mt-3">
                Mot de passe
              </label>
              <input
                type="text"
                id="Password"
                name="password"
                onChange={e => setPassword(e.target.value)}
                placeholder="Mote de passe"
                className="px-2 py-3 rounded-full"
              />
              <button className="bg-secondary rounded-full py-2.5 mt-7 text-white">
                Valider
              </button>
              <p className="text-white  mt-3 text-center">
                Vous n'êtes pas déjà inscrit ? {" "}
                <Link to="/register" className="text-secondary">
                  Inscrivez-vous ici
                </Link>
              </p>
            </form>
          </div>
        </IonContent>
      </div>
    </IonPage>
  );
};

export default Login;
