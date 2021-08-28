import { AcceptedFn } from './misc/types';
import { noop } from './misc/utils';

class TaskRepeater {
  /**
   * the counter for repetitive calls
   *
   * @private
   * @memberof TaskRepeater
   */
  private counter = 0;

  /**
   * the list of functions to be invoked
   *
   * @private
   * @memberof TaskRepeater
   */
  private fn: AcceptedFn[] = [];

  /**
   * cleanup function
   *
   * @private
   * @memberof TaskRepeater
   */
  private cleanupFn = noop;

  /**
   * number of iterations
   *
   * @private
   * @memberof TaskRepeater
   */
  private iteration = 1;

  /**
   * period in milliseconds
   *
   * @private
   * @memberof TaskRepeater
   */
  private period = 0;

  /**
   * timeout instance
   *
   * @private
   * @memberof TaskRepeater
   */
  private timeout: NodeJS.Timeout | null = null;

  /**
   * delay time in milliseconds for initial call
   *
   * @private
   * @memberof TaskRepeater
   */
  private delayTime = 0;

  // eslint-disable-next-line consistent-return
  private handler() {
    // internal variable to check if
    // function list contains invocable objects
    let invoked = false;

    // invokes the given functions, in order
    for (let i = 0, { length } = this.fn; i < length; i += 1) {
      // checks if the current function is valid
      // otherwise, ignore it
      if (typeof this.fn[i] !== 'function') {
        throw new Error('not a function');
      }

      this.fn[i].call(this);
      // sets the invocation state
      invoked = true;
    }

    // terminates the handler and returns the TaskRepeater object
    // if none of the given functions in the list is invocable
    if (!invoked) {
      return this;
    }

    // increases the counter for each call
    this.count();

    // invokes the functions again based on the mode of repetition
    // for finite tasks, repeats the functions
    // if the call counter is less than requested iteration

    if (Object.prototype.hasOwnProperty.call(this, 'iteration') && this.counter >= this.iteration) {
      // terminates the function and returns the current object
      this.cleanupFn();
      return this;
    }

    // sets the timer again
    this.timeout = setTimeout(this.handler.bind(this), this.period);
  }

  /**
   * counts the iterations
   *
   * @memberof TaskRepeater
   */
  count() {
    this.counter += 1;
    // return the current object
    return this;
  }

  /**
   * adds a cleanup function to be called at the end of the runtime
   *
   * @memberof TaskRepeater
   */
  finally(fn: AcceptedFn) {
    if (typeof fn !== 'function') {
      throw new Error('Invalid argument: fn is not a function');
    }
    // appends the function to the list and set the fn property.
    this.cleanupFn = fn;
    // returns the current object
    return this;
  }

  /**
   * resets counter
   *
   * @memberof TaskRepeater
   */
  reset() {
    this.counter = 0;
    // returns the current object
    return this;
  }

  /**
   * sets a delay time for initial call
   *
   * @memberof TaskRepeater
   */
  delay(delayTime: number) {
    if (typeof delayTime === 'number') {
      this.delayTime = delayTime;
    }
    // returns the current object
    return this;
  }

  /**
   * adds the function to the list of functions for the current instance
   *
   * @memberof TaskRepeater
   */
  do(fn: AcceptedFn) {
    // checks if the given function is valid
    if (typeof fn !== 'function') {
      throw new Error('Invalid argument: fn is not a function');
    }
    // appends the function to the list and set the fn property.
    this.fn = this.fn.concat(fn);
    // returns the current object
    return this;
  }

  /**
   * sets the number of calls
   *
   * @memberof TaskRepeater
   */
  for(num: number) {
    if (typeof num === 'number' && num > 0) {
      this.iteration = num;
    }
    // returns the current object
    return this;
  }

  /**
   * sets the interval time in X milliseconds
   *
   * @memberof TaskRepeater
   */
  every(ms: number) {
    if (typeof ms === 'number') {
      this.period = ms;
    }
    // returns the current object
    return this;
  }

  /**
   * runs the TaskRepeater with handlers
   *
   * @memberof TaskRepeater
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
   * @memberof TaskRepeater
   */
  stop() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    // return the current object
    return this;
  }
}

// eslint-disable-next-line import/prefer-default-export
export const initialize = (): TaskRepeater => new TaskRepeater();
