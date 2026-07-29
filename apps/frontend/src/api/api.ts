import axios from "axios";

const USER_URL = process.env.NEXT_PUBLIC_API_USER_URL;
const BACKEND_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL;

interface LoginResponse {
  data: {
    accessToken: string; // Assuming the access token is inside the 'data' field
    refreshToken: string; // Assuming the refresh token is inside the 'data' field
  };
  user: {
    id: string;
    name: string;
    email: string;
    username: string;
  };
}

// Interface for Register User Input
interface RegisterUserInput {
  name: string;
  username: string;
  email: string;
  password: string;
}

// Interface for Register User Response
interface RegisterUserResponse {
  message: string;
}

// Interface for User Profile Response
interface UserProfile {
  name: string;
}

interface ApiErrorLike {
  response?: { data?: { message?: string } };
  message?: string;
}

const getErrorMessage = (error: unknown, fallback: string): string => {
  const err = error as ApiErrorLike;
  return err?.response?.data?.message || err?.message || fallback;
};

export const loginUser = async (
  emailOrUsername: string,
  password: string
): Promise<LoginResponse> => {
  try {
    // Make the POST request to login
    const response = await axios.post<LoginResponse>(
      `${USER_URL}/login`, // URL to your login endpoint
      { emailOrUsername, password },
      {
        withCredentials: true, // Ensure cookies are sent/received for authentication
      }
    );

    // Assuming the response includes the access token
    const { accessToken, refreshToken } = response.data.data;

    // Save the access token in localStorage (if it's part of the response)
    localStorage.setItem("accessToken", accessToken);

    // Optionally, store the refreshToken if needed
    localStorage.setItem("refreshToken", refreshToken);

    return response.data; // Return server response data (user data, success message, etc.)
  } catch (error) {
    // Log detailed error info for debugging
    console.error("Login API Error:", (error as ApiErrorLike)?.response || (error as ApiErrorLike)?.message);

    // Extract error message from server or fallback to a default message
    const message = getErrorMessage(error, "An unexpected error occurred while logging in");

    throw new Error(message); // Re-throw error with user-friendly message
  }
};

// Logout User Function
export const logoutUser = async (token: string): Promise<string> => {
  try {
    const response = await axios.post(
      `${USER_URL}/logout`,
      {}, // Empty body
      {
        headers: { Authorization: `Bearer ${token}` }, // Pass token as Bearer
        withCredentials: true, // Ensure cookies are included
      }
    );

    return response.data.message; // Return success message
  } catch (error) {
    throw new Error(getErrorMessage(error, "Error logging out."));
  }
};

// Get Logged-in User's Profile Function
export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token is missing. Please log in again.");
    }

    const response = await axios.get<{ status: number; data: UserProfile }>(
      `${USER_URL}/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data; // Extract the "data" field containing the user profile
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error(getErrorMessage(error, "Failed to fetch user profile."));
  }
};

// Register User Function
export const registerUser = async (
  input: RegisterUserInput
): Promise<RegisterUserResponse> => {
  try {
    const response = await axios.post<RegisterUserResponse>(`${USER_URL}/register`, input);
    return response.data; // Return success message for OTP sent
  } catch (error) {
    throw new Error(getErrorMessage(error, "Error registering user."));
  }
};


export const compressPdf: (file: File, compressionLevel: string) => Promise<Blob> = async (file, compressionLevel) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("compressionLevel", compressionLevel);

    const token = localStorage.getItem("accessToken");

    const headers: Record<string, string> = { 'Content-Type': 'multipart/form-data' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await axios.post(`${BACKEND_URL}/pdf/compress-pdf`, formData, {
      headers,
    });

    // Assuming the response contains a JSON object with the compressed PDF URL and metadata
    if (response.data.success) {
      const compressedPdfUrl = response.data.data.compressedPdfUrl;
      // You can now fetch the PDF file (for download or preview)
      const pdfResponse = await axios.get(compressedPdfUrl, { responseType: 'blob' });

      return pdfResponse.data; // Return the actual Blob (compressed PDF)
    } else {
      throw new Error(response.data.message || 'Error compressing PDF.');
    }
  } catch (error) {
    throw new Error(getErrorMessage(error, "Error compressing PDF."));
  }
}

// Frontend API function to compress image
export const optimizeImage = async (file: File, compressionLevel: string) => {
  try {
    const formData = new FormData();
    formData.append('compressionLevel', compressionLevel);
    formData.append('image', file);

    const token = localStorage.getItem("accessToken");

    // If no token, don't send the Authorization header
    const headers: Record<string, string> = { 'Content-Type': 'multipart/form-data' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await axios.post(`${BACKEND_URL}/image/optimize-img`, formData, {
      headers,
    });

    return response.data; // Return the optimized image details
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Failed to compress image'));
  }
};

export const getAllLinks = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("You must be logged in to view your image links");
    }

    const response = await axios.get(`${USER_URL}/getlinks`, {
      headers: {
        Authorization: `Bearer ${token}`, // Send the access token in the Authorization header
      },
    });

    return response.data; // Return the list of image links
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to fetch image links"));
  }
};

// API function to delete a file
export const deleteLink = async (fileId: string) => {
  try {
    const token = localStorage.getItem("accessToken"); // Ensure the token key is 'accessToken'

    if (!token) {
      throw new Error("You must be logged in to delete your file");
    }

    const response = await axios.delete(`${USER_URL}/deletelink`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Attach the JWT token in the header
      },
      data: {
        fileId, // Send the fileId to delete
      },
    });

    return response.data; // Return the API response data upon success
  } catch (error) {
    console.error('Error deleting the file:', (error as ApiErrorLike)?.response?.data || (error as ApiErrorLike)?.message);
    throw new Error(getErrorMessage(error, 'An error occurred while deleting the file'));
  }
};
