import * as firebaseAuth from 'firebase/auth';
import { auth } from '../FirebaseConfig';

export default class AuthService {

    async register(email: string, password: string) {
        try {
            const userCredential = await firebaseAuth.createUserWithEmailAndPassword(auth, email, password);
            await this.sendVerificationEmail(userCredential.user);
            return userCredential;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async login(email: string, password: string) {
        try {
            const userCredential = await firebaseAuth.signInWithEmailAndPassword(auth, email, password);
            if (!userCredential.user.emailVerified) {
                throw new Error("E-mail ainda não foi verificado. Por favor, verifique seu e-mail antes de fazer login.");
            }
            return userCredential;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    logout() {
        return firebaseAuth.signOut(auth);
    }
    
    recoverPassword(email: string) {
        return firebaseAuth.sendPasswordResetEmail(auth, email);
    }

    async sendVerificationEmail(user: any) {
        try {
            if (user) {
                await firebaseAuth.sendEmailVerification(user);
            }
        } catch (error) {
            console.error("Erro ao enviar o e-mail de verificação:", error);
        }
    }
}