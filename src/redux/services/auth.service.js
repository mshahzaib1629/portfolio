import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      getAuth(),
      email,
      password
    );
  } catch (error) {
    throw error;
  }
};

const AuthService = {
  login,
};

export default AuthService;
