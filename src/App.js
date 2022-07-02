import "./App.css";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";
import initializeAuthentication from "./Firebase/firebase.initialize";
import { useState } from "react";

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

function App() {
  const [user, setUser] = useState({});
  const auth = getAuth();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL,
        };
        console.log(result.user);
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      {!user.name ? (
        <div>
          <button onClick={handleGoogleSignIn}>SignIn with Google</button>
          <button onClick={handleFacebookSignIn}>SignIn with Facebook</button>
          <button onClick={handleGithubSignIn}>SignIn with Github</button>
        </div>
      ) : (
        <button onClick={handleSignOut}>Sign out</button>
      )}
      <br />
      {user.name && (
        <div>
          <h2>Welcome {user.name}</h2>
          <p>My email address is: {user.email}</p>
          <img src={user.photo} alt="profilePhoto" />
        </div>
      )}
    </div>
  );
}

export default App;
