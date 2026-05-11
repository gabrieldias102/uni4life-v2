import {
  type ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User,
  updateProfile,
} from "firebase/auth";
import { auth } from "../services/firebase";

type AuthContextValue = {
  user: User | null;
  profession: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    profession: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [profession, setProfession] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && typeof window !== "undefined") {
        const storedProfession = localStorage.getItem(
          `profession_${currentUser.uid}`,
        );
        setProfession(storedProfession || null);
      } else {
        setProfession(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    profession,
    loading,
    signIn: async (email: string, password: string) => {
      const credentials = await signInWithEmailAndPassword(auth, email, password);

      if (credentials.user && typeof window !== "undefined") {
        const storedProfession = localStorage.getItem(
          `profession_${credentials.user.uid}`,
        );
        setProfession(storedProfession || null);
      }
    },
    register: async (
      name: string,
      email: string,
      password: string,
      profession: string,
    ) => {
      const credentials = await createUserWithEmailAndPassword(auth, email, password);

      if (name.trim()) {
        await updateProfile(credentials.user, {
          displayName: name.trim(),
        });
      }

      if (credentials.user && typeof window !== "undefined") {
        localStorage.setItem(
          `profession_${credentials.user.uid}`,
          profession.trim(),
        );
        setProfession(profession.trim() || null);
      }
    },
    logout: async () => {
      await signOut(auth);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
