import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


// Initialize Query Client without opetions
const queryClient = new QueryClient()


// Query Client provider.
const QueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
    )
}

export default QueryProvider