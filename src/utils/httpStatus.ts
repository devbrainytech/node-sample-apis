/**
 * HTTP Status Codes Enum
 * Defines standard HTTP status codes for consistent API responses
 */
export enum HttpStatus {
  /** Request succeeded */
  OK = 200,

  /** Request succeeded and new resource created */
  CREATED = 201,

  /** Request malformed or invalid */
  BAD_REQUEST = 400,

  /** Authentication required or failed */
  UNAUTHORIZED = 401,

  /** User authenticated but lacks permission */
  FORBIDDEN = 403,

  /** Requested resource not found */
  NOT_FOUND = 404,

  /** Resource already exists or conflict state */
  CONFLICT = 409,

  /** LIMIT the HTTP Requests */
  LIMIT = 429,

  /** Server encountered an error */
  INTERNAL_SERVER_ERROR = 500,
}
