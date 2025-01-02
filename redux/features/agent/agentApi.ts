import { apiSlice } from '../api/apiSlice';

export const agentApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get agents from api with typescript
		getAgents: builder.query<any, void>({
			query: () => '/agents',
		}),

		// get agent by id from api with typescript
		getAgentById: builder.query<any, string>({
			query: (id) => `/agents/${id}`,
		}),

		// agent register
		agentRegister: builder.mutation<any, any>({
			query: (body) => ({
				url: '/agent-register',
				method: 'POST',
				body,
			}),
		}),

		// agent login
		agentLogin: builder.mutation<any, any>({
			query: (body) => ({
				url: '/agent-login',
				method: 'POST',
				body,
			}),
		}),

		// update agent
		updateAgent: builder.mutation<any, any>({
			query: (body) => ({
				url: '/agents',
				method: 'PUT',
				body,
			}),
		}),

		// delete agent
		deleteAgent: builder.mutation<any, string>({
			query: (id) => ({
				url: `/agents/${id}`,
				method: 'DELETE',
			}),
		}),

		// agent dashboard data
		agentDashboard: builder.query<any, void>({
			query: () => '/agent-dashboard-data',
		}),

		//money transfer
		moneyTransfer: builder.mutation<any, any>({
			query: (body) => ({
				url: '/money-transfer',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['User', 'Transactions'],
			async onQueryStarted(arg, { queryFulfilled }) {
				try {
					console.log('Money transfer started');
					await queryFulfilled;
					console.log('Money transfer successful, User tag invalidated');
				} catch (error) {
					console.error('Error in money transfer:', error);
				}
			},
		}),

		// add Payment Method
		addPaymentMethod: builder.mutation<any, any>({
			query: (body) => ({
				url: '/add-payment-method',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Agent'],
		}),

		// my agent
		myAgent: builder.query<any, void>({
			query: () => '/my-agent',
			providesTags: ['Agent'],
		}),

		// update rate
		updateRate: builder.mutation<any, any>({
			query: (body) => ({
				url: '/update-method-rate',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Agent'],
		}),

		// add Payment description
		addPaymentDescription: builder.mutation<any, any>({
			query: (body) => ({
				url: '/add-payment-description',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Agent'],
		}),
	}),
});

export const {
	useGetAgentsQuery,
	useGetAgentByIdQuery,
	useAgentRegisterMutation,
	useAgentLoginMutation,
	useUpdateAgentMutation,
	useDeleteAgentMutation,
	useAgentDashboardQuery,
	useMoneyTransferMutation,
	useAddPaymentMethodMutation,
	useMyAgentQuery,
	useUpdateRateMutation,
	useAddPaymentDescriptionMutation,
} = agentApi;
