export const APIURL: any = {
  GETPRODUCTS: `products`,
  LOGIN: 'login',
  PROPERTY_ADD_REQUEST: 'addVendorRequest',
  SEE_HOTELS_DETAILS: 'getPropertyDetails',
  GET_PROPERTY_LIST: 'getAllPropertyList',
  CUSTOMER_LOGIN: 'customerLogin',
  CHECK_DUPLICATE_NAME: 'checkDuplicateUserName',
  ADD_CUSTOMER_NAME: 'addCustomerName',
  CUSTOMER_DETAILS: 'getCustomerDetails',
  UPDATE_CUSTOMER_PROFILE: 'customerUpdateProfile',
  GET_EXCHANGE_RATE: 'getExchangeRateList'
}

export const RESPONSES: any = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NOCONTENT: 204,
  BADREQUEST: 400,
  UN_AUTHORIZED: 401,
  INVALID_REQ: 422,
  FORBIDDEN: 403,
  NOTFOUND: 404,
  TIMEOUT: 408,
  TOOMANYREQ: 429,
  INTERNALSERVER: 500,
  BADGATEWAYS: 502,
  SERVICEUNAVILABLE: 503,
  GATEWAYTIMEOUT: 504,
}
