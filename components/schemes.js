// Swagger componnents 
/**
 *  @swagger
 *  components:
 *      schemas:
 *          User:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: User name
 *                  surname:
 *                      type: string
 *                      description: User surname
 *              required:
 *                  - name
 *                  - surname
 *              example:
 *                  name: Juan
 *                  surname: Martínez
 *          Home:
 *              type: object
 *              properties:
 *                  street:
 *                      type: string
 *                      description: Street where home is located
 *                  city:
 *                      type: string
 *                      description: City where home is located
 *                  country:
 *                      type: string
 *                      description: Country where home is located
 *              required:
 *                  - street
 *                  - city
 *                  - country
 *              example:
 *                  street: La Gran Vía
 *                  city: Madrid
 *                  country: Spain
 *          GeneralError:
 *              type: object
 *              properties:
 *                  msg:
 *                      type: string
 *                      description: Error message
 */