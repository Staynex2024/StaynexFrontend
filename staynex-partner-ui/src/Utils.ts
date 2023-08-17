export const APIURL: any = {
  GETPRODUCTS: `/products`,
  CREATE_PARTNER: '/createVendor',
  LOGIN: '/login',
  INVITATION_SIGNUP: '/requestInvitationInfo',
  FORGOT_PASSWORD: '/forgotPassword',
  RESET_PASSWORD: '/resetPassword',
  VENDOR_DETAILS: '/getVendorDetails',
  VENDOR_ADD_PROPERTY: '/addProperty',
  VENDOR_UPDATE_PROPERTY: '/updateProperty',
  
  CREATE_PASS: '/pass/addPass',
  PASSES_LIST: '/pass/passesList',
  GET_PASS_BY_ID: '/pass/passDetailsById',
  UPDATE_PASS: './pass/editPassPerks',
  RESUBMIT_PASS: './pass/resubmitPass',
  LIST_DELIST_PASS: '/pass/actionListing',
  PASSES_RESUBMIT_PASS:" /pass/resubmitPass"
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
