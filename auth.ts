/* eslint-disable @typescript-eslint/no-unused-vars */

import NextAuth from 'next-auth';
import authConfig from '@/auth.config';

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	pages: {
		signIn: '/',
		signOut: '/',
	},
	callbacks: {
		async jwt({ token, user }) {
			// Verifica si el usuario se pasó al callback
			if (user) {
				// Guarda los datos del usuario y el token en el jwt
				token.id = user.user.id;
				token.email = user.user.email;
				token.role = user.user.role;
				token.token = user.token; // Asumiendo que el token es un JWT
			}

			return token;
		},
		async session({ session, token }) {
			session.user = {
				id: token.id,
				email: token.email,
				role: token.role,
				token: token.token,
			};

			return session;
		},
		async redirect({ url, baseUrl }) {
			return `${baseUrl}`;
		},
	},
	session: { strategy: 'jwt' },
	...authConfig,
});
