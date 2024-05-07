const express = require('express');
const router = express.Router();
const UserController = require("../controllers/user.js")

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', UserController.getAllUsers)

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a users
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User name
 *               surname:
 *                 type: string
 *                 description: User surname
 *     responses:
 *       201:
 *         description: User has been created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               item: {}
 *       400:
 *         description: Invalid body parametters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralError'
 */
router.post('/', UserController.createUser)

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User has been retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid user id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralError'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralError'
 */
router.get('/:userId', UserController.getUser)

/**
 * @swagger
 * /users/{userId}:
 *   patch:
 *     summary: Update user information
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User name
 *               surname:
 *                 type: string
 *                 description: User surname
 *     responses:
 *       200:
 *         description: User has been updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               item: {}
 *       400:
 *         description: Invalid user id or body parametters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralError'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralError'
 */
router.patch('/:userId', UserController.patchUser)

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Update user information
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User name
 *               surname:
 *                 type: string
 *                 description: User surname
 *     responses:
 *       200:
 *         description: User has been updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               item: {}
 *       400:
 *         description: Invalid user id or body parametters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralError'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralError'
 */
router.put('/:userId', UserController.putUser)

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User has been deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               item: {}
 *       400:
 *         description: Invalid user id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralError'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralError'
 *       409:
 *         description: User can not be deleted due to remaining homes on his behalf
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralError'
 */
router.delete('/:userId', UserController.deleteUser)

/**
 * @swagger
 * /users/{userId}/homes:
 *   get:
 *     summary: Get user homes
 *     tags: [Homes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *       - in: query
 *         name: street
 *         schema:
 *           type: string
 *         required: false
 *         description: Home street to filter by
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         required: false
 *         description: Home city to filter by
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         required: false
 *         description: Home country to filter by
 *     responses:
 *       200:
 *         description: User homes have been retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Home'
 *       400:
 *         description: Invalid user id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralError'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralError'
 */
router.get('/:userId/homes', UserController.getUserHomes)

/**
 * @swagger
 * /users/{userId}/homes:
 *   post:
 *     summary: Create a home for a specific user
 *     tags: [Homes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *                 description: Street where home is located
 *               city:
 *                 type: string
 *                 description: City where home is located
 *               country:
 *                 type: string
 *                 description: Country where home is located
 *     responses:
 *       201:
 *         description: User home has been created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               item: {}
 *       400:
 *         description: Invalid user id or body parametters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralError'
 */
router.post('/:userId/homes', UserController.createUserHome)

/**
 * @swagger
 * /users/{userId}/homes/{homeId}:
 *   patch:
 *     summary: Update user home information
 *     tags: [Homes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *       - in: path
 *         name: homeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Home ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *                 description: Street where home is located
 *               city:
 *                 type: string
 *                 description: City where home is located
 *               country:
 *                 type: string
 *                 description: Country where home is located
 *     responses:
 *       200:
 *         description: User home has been updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               item: {}
 *       400:
 *         description: Invalid user id, home id or body parametters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralError'
 *       404:
 *         description: User home not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralError'
 */
router.patch('/:userId/homes/:homeId', UserController.patchUserHome)

/**
 * @swagger
 * /users/{userId}/homes/{homeId}:
 *   put:
 *     summary: Update user home information
 *     tags: [Homes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *       - in: path
 *         name: homeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Home ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *                 description: Street where home is located
 *               city:
 *                 type: string
 *                 description: City where home is located
 *               country:
 *                 type: string
 *                 description: Country where home is located
 *     responses:
 *       200:
 *         description: User home has been updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               item: {}
 *       400:
 *         description: Invalid user id, home id or body parametters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralError'
 *       404:
 *         description: User home not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralError'
 */
router.put('/:userId/homes/:homeId', UserController.putUserHome)

/**
 * @swagger
 * /users/{userId}/homes/{homeId}:
 *   delete:
 *     summary: Delete user home
 *     tags: [Homes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *       - in: path
 *         name: homeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Home ID
 *     responses:
 *       200:
 *         description: User home has been deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               item: {}
 *       400:
 *         description: Invalid user id or home id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralError'
 *       404:
 *         description: User home not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralError'
 */
router.delete('/:userId/homes/:homeId', UserController.deleteUserHome)

module.exports = router;