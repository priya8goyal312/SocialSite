let INFORMATIONAL_CONTINUE = 100 
let INFORMATIONAL_SWITCHING_PROTOCOL = 101
let INFORMATIONAL_PROCESSING = 102
let INFORMATIONAL_EARLY_HINTS = 103


//Success
let SUCCESS_OK = 200 //(REST Specific)
let SUCCESS_CREATED = 201 //(REST Specific)
let SUCCESS_ACCEPTED = 202 //(REST Specific)
//SUCCESS_NON-AUTHORITATIVE_INFORMATION = 203
let SUCCESS_NO_CONTENT = 204 //(REST Specific)
let SUCCESS_RESET_CONTENT = 205
let SUCCESS_PARTIAL_CONTENT = 206
let SUCCESS_MULTI_STATUS = 207
let SUCCESS_ALREADY_REPORTED = 208
let SUCCESS_IM_USED = 226


//Redirection
let REDIRECTION_MULTIPLE_CHOICES = 300
let REDIRECTION_MOVED_PERMANENTLY = 301 //(REST Specific)
let REDIRECTION_FOUND = 302 //(REST Specific)
let REDIRECTION_SEE_OTHER = 303 //(REST Specific)
let REDIRECTION_NOT_MODIFIED = 304 //(REST Specific)
let REDIRECTION_USE_PROXY = 305
let REDIRECTION_UNUSED = 306
let REDIRECTION_TEMPORARY_REDIRECT = 307 //(REST Specific)
let REDIRECTION_PERMANENT_REDIRECT = 308


//Client Error
let CLIENT_ERROR_BAD_REQUEST = 400 //(REST Specific)
let CLIENT_ERROR_UNAUTHORIZED = 401 //(REST Specific)
let CLIENT_ERROR_PAYMENT_REQUIRED = 402
let CLIENT_ERROR_FORBIDDEN = 403 //(REST Specific)
let CLIENT_ERROR_NOT_FOUND = 404 //(REST Specific)
let CLIENT_ERROR_METHOD_NOT_ALLOWED = 405 //(REST Specific)
let CLIENT_ERROR_NOT_ACCEPTABLE = 406 //(REST Specific)
let CLIENT_ERROR_PROXY_AUTHENTICATION_REQUIRED = 407
let CLIENT_ERROR_REQUESTED_TIMEOUT = 408
let CLIENT_ERROR_CONFLICT = 409
let CLIENT_ERROR_GONE = 410
let CLIENT_ERROR_LENGTH_REQUIRE = 411
let CLIENT_ERROR_PRECONDITION_FAILED = 412 //(REST Specific)
let CLIENT_ERROR_REQUEST_ENTITY_TOO_LARGE = 413
let CLIENT_ERROR_REQUEST_URI_TOO_LONG = 414
let CLIENT_ERROR_UNSUPPORTED_MEDIA_TYPE = 415
let CLIENT_ERROR_REQUESTED_RANGE_NOT_SATISFIABLE = 416
let CLIENT_ERROR_EXPECTATION_FAILED = 417


//Server Error
let SERVER_ERROR_INTERNAL_SERVER_ERROR = 500 //(REST Specific)
let SERVER_ERROR_OT_IMPLEMENTED = 501 //(REST Specific)
let SERVER_ERROR_BAD_GATEWAY = 502
let SERVER_ERROR_SERVICE_UNAVAILABLE = 503
let SERVER_ERROR_GATEWAY_TIMEOUT = 504
let SERVER_ERROR_HTTP_VERSION_NOT_SUPPORTED = 505
let SERVER_ERROR_VARIANT_ALSO_NEGOTIATES = 506
let SERVER_ERROR_INSUFFICIENT_STORAGE = 507 
let SERVER_ERROR_LOOP_DETECTED = 508
let SERVER_ERROR_NOT_EXTENDED = 510
let SERVER_ERROR_NETWORK_AUTHENTICATED_REQUIRED = 511







// status

// Exist status
let USER_EXIST = 10
let EMAIL_EXIST = 11
let USER_NAME_EXIST = 12

// Created status
let USER_CREATED = 20

// Update status
let USER_NAME_UPDATE = 30

// Not-Exist status
let USER_NOT_EXIST = 40
let USER_NAME_DOES_NOT_EXIST = 41

// Selected
let USER_NAME_SELECTED = 50

// not selected
let USER_NAME_NOT_SELECTED = 60

// change
let USER_NAME_CHANGE_SUCCESS = 70
let USER_NAME_CHANGE_FAIL = 71
let USER_ACTUAL_NAME_CHANGE_SUCCESS = 72
let USER_ACTUAL_NAME_CHANGE_FAIL = 73
let USER_BIO_CHANGE_SUCCESS = 74
let USER_BIO_CHANGE_FAIL = 75
let USER_PROFILE_PIC_CHANGE_SUCCESS = 76
let USER_PROFILE_PIC_CHANGE_FAIL = 77
let USER_PROFILE_VIEW_PERMISSION_CHANGE_SUCCESS = 78
let USER_PROFILE_VIEW_PERMISSION_CHANGE_FAIL = 79

// Not created status
let USER_NOT_CREATED = 80
let PROFILE_NOT_CREATED = 81

export{

    INFORMATIONAL_CONTINUE,
    INFORMATIONAL_SWITCHING_PROTOCOL,
    INFORMATIONAL_PROCESSING,
    INFORMATIONAL_EARLY_HINTS,
    
    
    //Success
    SUCCESS_OK,
    SUCCESS_CREATED,
    SUCCESS_ACCEPTED,
    SUCCESS_NO_CONTENT,
    SUCCESS_RESET_CONTENT,
    SUCCESS_PARTIAL_CONTENT,
    SUCCESS_MULTI_STATUS,
    SUCCESS_ALREADY_REPORTED,
    SUCCESS_IM_USED,
    
    
    //Redirection
    REDIRECTION_MULTIPLE_CHOICES,
    REDIRECTION_MOVED_PERMANENTLY, //(REST Specific)
    REDIRECTION_FOUND, //(REST Specific)
    REDIRECTION_SEE_OTHER, //(REST Specific)
    REDIRECTION_NOT_MODIFIED, //(REST Specific)
    REDIRECTION_USE_PROXY,
    REDIRECTION_UNUSED,
    REDIRECTION_TEMPORARY_REDIRECT, //(REST Specific)
    REDIRECTION_PERMANENT_REDIRECT,
    
    
    //Client Error
    CLIENT_ERROR_BAD_REQUEST, //(REST Specific)
    CLIENT_ERROR_UNAUTHORIZED, //(REST Specific)
    CLIENT_ERROR_PAYMENT_REQUIRED,
    CLIENT_ERROR_FORBIDDEN, //(REST Specific)
    CLIENT_ERROR_NOT_FOUND, //(REST Specific)
    CLIENT_ERROR_METHOD_NOT_ALLOWED, //(REST Specific)
    CLIENT_ERROR_NOT_ACCEPTABLE, //(REST Specific)
    CLIENT_ERROR_PROXY_AUTHENTICATION_REQUIRED,
    CLIENT_ERROR_REQUESTED_TIMEOUT,
    CLIENT_ERROR_CONFLICT,
    CLIENT_ERROR_GONE,
    CLIENT_ERROR_LENGTH_REQUIRE,
    CLIENT_ERROR_PRECONDITION_FAILED, //(REST Specific)
    CLIENT_ERROR_REQUEST_ENTITY_TOO_LARGE,
    CLIENT_ERROR_REQUEST_URI_TOO_LONG,
    CLIENT_ERROR_UNSUPPORTED_MEDIA_TYPE,
    CLIENT_ERROR_REQUESTED_RANGE_NOT_SATISFIABLE,
    CLIENT_ERROR_EXPECTATION_FAILED,
    
    
    //Server Error
    SERVER_ERROR_INTERNAL_SERVER_ERROR, //(REST Specific)
    SERVER_ERROR_OT_IMPLEMENTED, //(REST Specific)
    SERVER_ERROR_BAD_GATEWAY,
    SERVER_ERROR_SERVICE_UNAVAILABLE,
    SERVER_ERROR_GATEWAY_TIMEOUT,
    SERVER_ERROR_HTTP_VERSION_NOT_SUPPORTED,
    SERVER_ERROR_VARIANT_ALSO_NEGOTIATES,
    SERVER_ERROR_INSUFFICIENT_STORAGE, 
    SERVER_ERROR_LOOP_DETECTED,
    SERVER_ERROR_NOT_EXTENDED,
    SERVER_ERROR_NETWORK_AUTHENTICATED_REQUIRED,
    
    
    
    
    
    
    
    // status
    
    // Exist status
    USER_EXIST,
    EMAIL_EXIST,
    USER_NAME_EXIST,
    
    // Created status
    USER_CREATED,
    
    // Update status
    USER_NAME_UPDATE,
    
    // Not-Exist status
    USER_NOT_EXIST,
    USER_NAME_DOES_NOT_EXIST,

    // selected
    USER_NAME_SELECTED,

    // not-selected
    USER_NAME_NOT_SELECTED,


    USER_NAME_CHANGE_SUCCESS, 
    USER_NAME_CHANGE_FAIL,
    USER_ACTUAL_NAME_CHANGE_SUCCESS,
    USER_ACTUAL_NAME_CHANGE_FAIL,
    USER_BIO_CHANGE_SUCCESS,
    USER_BIO_CHANGE_FAIL,
    USER_PROFILE_PIC_CHANGE_SUCCESS,
    USER_PROFILE_PIC_CHANGE_FAIL,
    USER_PROFILE_VIEW_PERMISSION_CHANGE_SUCCESS,
    USER_PROFILE_VIEW_PERMISSION_CHANGE_FAIL,

    // Not created status
    USER_NOT_CREATED,
    PROFILE_NOT_CREATED 

}
