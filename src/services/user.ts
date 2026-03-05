import axios from 'axios';

// GET: User data(balances, selectedCurrency)
export const getUser = async () => {
    const response = await axios.get('/api/user');
    return response.data;
}