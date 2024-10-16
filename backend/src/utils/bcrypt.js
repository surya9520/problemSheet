import { hash, compare, genSalt } from "bcrypt";

/**
 * Hashes a given password using bcrypt.
 * @param {string} password - The password to hash.
 * @returns {Promise<string | null>} - The hashed password or null if an error occurs.
 */
const hashPassword = async (password) => {
    try {
        // Generate a salt with a cost factor of 10
        const salt = await genSalt(10);
        // Hash the password with the generated salt
        const hashedPassword = await hash(password, salt);
        return hashedPassword; // Return the hashed password
    } catch (error) {
        console.error("Error hashing password:", error); // Improved error logging
        return null; // Return null in case of an error
    }
};

/**
 * Compares a given password with a hashed password.
 * @param {string} password - The plain text password to compare.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} - True if passwords match, false otherwise.
 */
const comparePassword = async (password, hashedPassword) => {
    try {
        // Compare the plain text password with the hashed password
        return await compare(password, hashedPassword);
    } catch (error) {
        console.error("Error comparing passwords:", error); // Improved error logging
        return false; // Return false in case of an error
    }
};

export { hashPassword, comparePassword };
