import { createContext, useContext, useState } from 'react';

interface UserProps {
	email: string;
	password: string;
}

interface AuthContextType {
	user: UserProps | null;
	signin: (newUser: UserProps, callback: () => void) => void;
	signout: (callback: () => void) => void;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<UserProps | null>(() => {
		try {
			const item = localStorage.getItem('userData');
			return item ? JSON.parse(item) : null;
		} catch {
			return null;
		}
	});

	const signin = (newUser: UserProps, callback: () => void) => {
		setUser(newUser);
		localStorage.setItem('userData', JSON.stringify(newUser));
		callback();
	};

	const signout = (callback: () => void) => {
		setUser(null);
		localStorage.removeItem('userData');
		callback();
	};

	const value = {
		user,
		signin,
		signout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
