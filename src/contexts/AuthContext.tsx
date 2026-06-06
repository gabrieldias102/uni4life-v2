import {
  type ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
  updateProfile,
} from "firebase/auth";
import { createUser } from "../services/users";
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
    course: string
  ) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

function getStoredCourse(userUid: string) {
  if (typeof window === "undefined") {
    return null;
  }

  return (
    localStorage.getItem(`course_${userUid}`) ||
    localStorage.getItem(`profession_${userUid}`)
  );
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [course, setCourse] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCourse(currentUser ? getStoredCourse(currentUser.uid) : null);
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

      if (credentials.user) {
        setCourse(getStoredCourse(credentials.user.uid));
      }
    },

    register: async (
      name: string,
      email: string,
      password: string,
      course: string
    ) => {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const createdUser = credentials.user;
      const trimmedName = name.trim();
      const trimmedCourse = course.trim();

      if (trimmedName) {
        await updateProfile(createdUser, {
          displayName: trimmedName,
        });
      }

      try {
        await createUser({
          user_uid: createdUser.uid,
          full_name: trimmedName,
          username: trimmedName,
          course: trimmedCourse,
        });
      } catch (backendError) {
        console.error("Falha ao sincronizar o usuario com o back-end:", backendError);
        throw backendError;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem(`course_${createdUser.uid}`, trimmedCourse);
        localStorage.setItem(`profession_${createdUser.uid}`, trimmedCourse);
      }

      setCourse(trimmedCourse || null);
    },

    logout: async () => {
      await signOut(auth);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
