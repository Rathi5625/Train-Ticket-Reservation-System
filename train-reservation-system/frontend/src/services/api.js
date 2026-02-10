const API_BASE_URL = 'http://localhost:8080/api';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const authAPI = {
    register: async (data) => {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Registration failed');
        }
        return response.json();
    },

    login: async (data) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Login failed');
        }
        return response.json();
    },
};

export const trainAPI = {
    search: async (source, destination, date) => {
        const response = await fetch(
            `${API_BASE_URL}/trains/search?source=${encodeURIComponent(source)}&destination=${encodeURIComponent(destination)}&date=${date}`,
            {
                headers: {
                    ...getAuthHeader(),
                },
            }
        );
        if (!response.ok) throw new Error('Failed to search trains');
        return response.json();
    },

    getById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/trains/${id}`, {
            headers: {
                ...getAuthHeader(),
            },
        });
        if (!response.ok) throw new Error('Failed to fetch train');
        return response.json();
    },

    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/trains`, {
            headers: {
                ...getAuthHeader(),
            },
        });
        if (!response.ok) throw new Error('Failed to fetch trains');
        return response.json();
    },

    create: async (data) => {
        const response = await fetch(`${API_BASE_URL}/trains`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create train');
        return response.json();
    },

    update: async (id, data) => {
        const response = await fetch(`${API_BASE_URL}/trains/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to update train');
        return response.json();
    },

    delete: async (id) => {
        const response = await fetch(`${API_BASE_URL}/trains/${id}`, {
            method: 'DELETE',
            headers: {
                ...getAuthHeader(),
            },
        });
        if (!response.ok) throw new Error('Failed to delete train');
    },
};

export const bookingAPI = {
    create: async (data) => {
        const response = await fetch(`${API_BASE_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Failed to create booking');
        }
        return response.json();
    },

    getUserBookings: async () => {
        const response = await fetch(`${API_BASE_URL}/bookings`, {
            headers: {
                ...getAuthHeader(),
            },
        });
        if (!response.ok) throw new Error('Failed to fetch bookings');
        return response.json();
    },

    getById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
            headers: {
                ...getAuthHeader(),
            },
        });
        if (!response.ok) throw new Error('Failed to fetch booking');
        return response.json();
    },

    cancel: async (id) => {
        const response = await fetch(`${API_BASE_URL}/bookings/${id}/cancel`, {
            method: 'PUT',
            headers: {
                ...getAuthHeader(),
            },
        });
        if (!response.ok) throw new Error('Failed to cancel booking');
        return response.json();
    },
};

export const adminAPI = {
    getAllBookings: async () => {
        const response = await fetch(`${API_BASE_URL}/admin/bookings`, {
            headers: {
                ...getAuthHeader(),
            },
        });
        if (!response.ok) throw new Error('Failed to fetch all bookings');
        return response.json();
    },

    getAllUsers: async () => {
        const response = await fetch(`${API_BASE_URL}/admin/users`, {
            headers: {
                ...getAuthHeader(),
            },
        });
        if (!response.ok) throw new Error('Failed to fetch users');
        return response.json();
    },

    getStatistics: async () => {
        const response = await fetch(`${API_BASE_URL}/admin/statistics`, {
            headers: {
                ...getAuthHeader(),
            },
        });
        if (!response.ok) throw new Error('Failed to fetch statistics');
        return response.json();
    },
};
