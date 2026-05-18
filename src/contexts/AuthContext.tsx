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
  course: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    course: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [course, setCourse] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && typeof window !== "undefined") {
        const storedCourse =
          localStorage.getItem(`course_${currentUser.uid}`) ||
          localStorage.getItem(`profession_${currentUser.uid}`);
        setCourse(storedCourse || null);
      } else {
        setCourse(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    course,
    loading,
    signIn: async (email: string, password: string) => {
      const credentials = await signInWithEmailAndPassword(auth, email, password);

      if (credentials.user && typeof window !== "undefined") {
        const storedCourse =
          localStorage.getItem(`course_${credentials.user.uid}`) ||
          localStorage.getItem(`profession_${credentials.user.uid}`);
        setCourse(storedCourse || null);
      }
    },
    register: async (
      name: string,
      email: string,
      password: string,
      course: string,
    ) => {
      const credentials = await createUserWithEmailAndPassword(auth, email, password);

      if (name.trim()) {
        await updateProfile(credentials.user, {
          displayName: name.trim(),
        });
      }

      if (credentials.user && typeof window !== "undefined") {
        localStorage.setItem(`course_${credentials.user.uid}`, course.trim());
        localStorage.setItem(`profession_${credentials.user.uid}`, course.trim());
        setCourse(course.trim() || null);
      }
    },
    logout: async () => {
      await signOut(auth);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
