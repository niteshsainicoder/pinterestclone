class ApiError extends Error {
  constructor(
    statuscode,
    message = "something  went wrong",
    err = [],
    stack = ""
  ) {
    super(message);
    this.statuscode = statuscode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.err = err;

    if(stack){
        this.stack=stack
    }
    else{
        Error.captureStackTrace(this,this.constructor);
    }
  }
}

export{ApiError}