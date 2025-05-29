import 'next-auth';

declare module 'next-auth' {
	interface Session {
		user: {
			id: number;
			email: string;
			token: string;
			role: string;
		} & DefaultSession['user'];
	}
	// interface User {
	// 	token: string;
	// 	user: {
	// 		id: number;
	// 		email: string;
	// 		role: string;
	// 	};
	// }

	interface User extends DefaultUser {
		token: string;
		user: {
			id: number;
			email: string;
			role: string;
		};
	}

	interface JWT {
		id?: number;
		email?: string;
		role?: string;
		token?: string;
	}
}
