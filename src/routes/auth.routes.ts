import { Router } from "express";
import * as ctrl from "../controllers/auth.controller";
import { requireAuth, requireRole } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: User signup
 *     description: Register a new user with full name, email, phone, and password. Role is optional (defaults to PARTICIPANT).
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - phone
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               phone:
 *                 type: string
 *                 example: "+923001234567"
 *               password:
 *                 type: string
 *                 example: "Passw0rd123"
 *               role:
 *                 type: string
 *                 enum: [SUPER_ADMIN, ORGANIZER, PARTICIPANT]
 *                 example: "PARTICIPANT"
 *     responses:
 *       200:
 *         description: Signup successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/register", ctrl.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Signin with email and password
 *     description: Authenticate user and send OTP to their email.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "Passw0rd123"
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP sent to your email"
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/login", ctrl.login);

/**
 * @swagger
 * /auth/login/otp:
 *   post:
 *     summary: Verify login with OTP
 *     description: Complete login after OTP verification. Returns JWT tokens in cookies.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, otp]
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid OTP
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/login/otp", ctrl.verifyLogin);

/**
 * @swagger
 * /auth/password-reset:
 *   post:
 *     summary: Request password reset
 *     description: Sends a password reset email with a token link.
 *     tags: [Password]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *     responses:
 *       200:
 *         description: Password reset email sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset email sent"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/password-reset", ctrl.resetPassword);

/**
 * @swagger
 * /auth/password/verify:
 *   post:
 *     summary: Verify reset token & set new password
 *     description: Provide reset token from email, new password, and confirmation.
 *     tags: [Password]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *           example: "resetTokenHere"
 *         description: Password reset token from email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [newPassword, confirmPassword]
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: "NewPassw0rd123"
 *               confirmPassword:
 *                 type: string
 *                 example: "NewPassw0rd123"
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset successful"
 *       400:
 *         description: Invalid token or passwords don't match
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/password/verify", ctrl.verifyReset);

/**
 * @swagger
 * /auth/token/refresh:
 *   get:
 *     summary: Refresh access token
 *     description: Generates new access & refresh tokens using cookies.
 *     tags: [Token]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Tokens refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tokens refreshed successfully"
 *       401:
 *         description: Refresh token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/token/refresh", ctrl.refreshAccessToken);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Clears JWT tokens and logs user out.
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User logged out successfully"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/logout", requireAuth, ctrl.logout);

/**
 * @swagger
 * /auth/admin/create-account:
 *   post:
 *     summary: Create account for another user (Super Admin only)
 *     description: Super admin can create an account for someone else and credentials are emailed.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, role, fullName, phone]
 *             properties:
 *               email:
 *                 type: string
 *                 example: "newuser@example.com"
 *               role:
 *                 type: string
 *                 enum: [SUPER_ADMIN, ORGANIZER, PARTICIPANT]
 *                 example: "ORGANIZER"
 *               fullName:
 *                 type: string
 *                 example: "Alice Smith"
 *               phone:
 *                 type: string
 *                 example: "+923009876543"
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Account created successfully"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       403:
 *         description: Forbidden - Only SUPER_ADMIN can perform this
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  "/admin/create-account",
  requireAuth,
  requireRole("SUPER_ADMIN"),
  ctrl.createAccount
);

export default router;
