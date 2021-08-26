class Repeatr {
  /**
   * the counter for repetitive calls
   *
   * @memberof Repeatr
   */
  private counter = 0;

  /**
   * the list of functions to be invoked
   *
   * @memberof Repeatr
   */
  private fn: ((...args: any) => any)[] = [];

  /**
   * number of iterations
   *
   * @memberof Repeatr
   */
  iteration = 1;

  /**
   * period in milliseconds
   *
   * @memberof Repeatr
   */
  period = 0;

  /**
   * timeout instance
   *
   * @memberof Repeatr
   */
  timeout: number | null = null;

  /**
   * delay time in milliseconds for initial call
   *
   * @memberof Repeatr
   */
  delayTime = 0;

  private handler() {
    // internal variable to check if
    // function list contains invocable objects
    let invoked = false;

    // invokes the given functions, in order
    for (let i = 0, length = this.fn.length; i < length; i++) {
      // checks if the current function is valid
      // otherwise, ignore it
      if (typeof this.fn[i] !== "function") {
        continue;
      }

      this.fn[i].call(this);
      // sets the invocation state
      invoked = true;
    }

    // terminates the handler and returns the Repeatr object
    // if none of the given functions in the list is invocable
    if (!invoked) {
      return this;
    }

    // increases the counter for each call
    this.count();

    // invokes the functions again based on the mode of repetition
    // for finite tasks, repeats the functions
    // if the call counter is less than requested iteration
    if (this.hasOwnProperty("iteration") && this.counter >= this.iteration) {
      // terminates the function and returns the current object
      return this;
    }

    // sets the timer again
    this.timeout = setTimeout(this.handler.bind(this), this.period);
  }

  // counts the iterations
  count() {
    this.counter += 1;
    // return the current object
    return this;
  }

  /**
   * resets counter
   *
   * @memberof Repeatr
   */
  reset() {
    this.counter = 0;
    // returns the current object
    return this;
  }

  /**
   * sets a delay time for initial call
   *
   * @memberof Repeatr
   */
  delay(delayTime: number) {
    if (typeof delayTime === "number") {
      this.delayTime = delayTime;
    }
    // returns the current object
    return this;
  }

  /**
   * adds the function to the list of functions for the current instance
   *
   * @memberof Repeatr
   */
  do(fn: (...args: any) => any) {
    // checks if the given function is valid
    if (typeof fn !== "function") {
      throw new Error("Invalid argument: fn is not a function");
    }
    // appends the function to the list and set the fn property.
    this.fn = this.fn.concat(fn);
    // returns the current object
    return this;
  }

  /**
   * sets the number of calls
   *
   * @memberof Repeatr
   */
  for(num: number) {
    if (typeof num === "number" && num > 0) {
      this.iteration = num;
    }
    // returns the current object
    return this;
  }

  /**
   * sets the interval time in X milliseconds
   *
   * @memberof Repeatr
   */
  every(ms: number) {
    if (typeof ms === "number") {
      this.period = ms;
    }
    // returns the current object
    return this;
  }

  /**
   * runs the repeatr with handlers
   *
   * @memberof Repeatr
   */
  start() {
    // calls the handler after delayTime for initial load
    setTimeout(this.handler.bind(this), this.delayTime);

    // returns the current object
    return this;
  }

  /**
   * stops the job/calling the function
   *
   * @memberof Repeatr
   */
  stop() {
    this.timeout && clearTimeout(this.timeout);
    // return the current object
    return this;
  }
}

export const initialize = () => new Repeatr();
