import axios from 'axios';
import { authHeader } from './authHeader';
import { toast } from 'react-toastify';
import { navigate } from './navigationService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const makeApiCall = async (method, url, data = null) => {
  try {
    if (!API_BASE_URL) {
      throw new Error('API Base URL is not configured');
    }

    const config = {
      method,
      url: `${API_BASE_URL}${url}`,
      headers: {
        Authorization: authHeader().Authorization,
        "Content-Type": "application/json",
      },
      data,
    };

    const response = await axios(config);

    if (response.data.code === 1 && response.data.error === true) {
      toast.error(response.data.message, {
        toastId: `api-error-${response.data.message}`
      });
    }

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "API call failed";

    // 401/403/404/500 handling with toasts and redirect logic
    if (error.response?.status === 404) {
      toast.error('API endpoint not found. Please check the URL configuration.', {
        toastId: 'api-404'
      });
      return;
    }

    if (error.response?.status === 403) {
      navigate("/");
      return;
    }

    if (error.response?.status === 401 || error.response?.status === 500) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      toast.error(errorMessage, {
        toastId: `api-auth-error-${errorMessage}`,
        onClose: () => {
          navigate("/login");
        },
      });
      return;
    }

    // Generic error toast
    toast.error(errorMessage, {
      toastId: `api-error-${errorMessage}`
    });

    throw new Error(errorMessage);
  }
};
