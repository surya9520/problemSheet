import jwt from "jsonwebtoken";

const secretKey = 'suryajoshi617@'; // It's recommended to keep secret keys in environment variables

/**
 * Sets a JWT for the given user object.
 * @param {Object} user - The user object to encode in the JWT.
 * @returns {string | null} - The generated JWT or null if an error occurs.
 */
const setUser = (user) => {
    try {
        // Create a JWT token by signing the user object
        const uid = jwt.sign({ ...user }, secretKey, { expiresIn: '1h' }); // Set token expiration time as needed
        console.log("Generated JWT:", uid); // Log the generated token for debugging
        return uid;
    } catch (error) {
        console.error("Error setting user token:", error); // Improved error logging
        return null; // Return null in case of an error
    }
};

/**
 * Retrieves and verifies the user from a given JWT.
 * @param {string} token - The JWT to verify.
 * @returns {Object | null} - The decoded user object or null if verification fails.
 */
const getUser = (token) => {
    try {
        // Verify the JWT and return the decoded user object
        const user = jwt.verify(token, secretKey);
        return user;
    } catch (error) {
        console.error("Error verifying token:", error); // Improved error logging
        return null; // Return null in case of an error
    }
};

export { setUser, getUser };
