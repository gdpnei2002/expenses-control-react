import * as firebaseAuth from 'firebase/auth';
import { auth } from '../FirebaseConfig';

export default class AuthService {

    login(email: string, password: string) {
        return firebaseAuth.signInWithEmailAndPassword(
            auth, email, password
        )
        .catch(error => Promise.reject(error));
    }

    logout() {
        return firebaseAuth.signOut(auth);
    }
    
    register(email: string, password: string) {
        return firebaseAuth.createUserWithEmailAndPassword(
            auth, email, password
        )
        .catch(error => Promise.reject(error));
    }
    
    recoverPassword(email: string) {
        return firebaseAuth.sendPasswordResetEmail(auth, email);
    }
}