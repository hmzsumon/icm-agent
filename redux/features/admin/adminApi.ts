import { apiSlice } from '../api/apiSlice';

export const adminApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get users from api with typescript
		getUsers: builder.query<any, void>({
			query: () => '/users',
			providesTags: ['Users'],
		}),
	}),
});

export const { useGetUsersQuery } = adminApi;
