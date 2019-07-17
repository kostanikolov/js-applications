class MyPromise {
    constructor(executor) {
        this._resolveCallback = {};
        this._rejectCallback = {};

        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);

        executor(this.resolve, this.reject);
    }

    then(successFunc) {
        this._resolveCallback = successFunc;
        return this;
    }

    catch(errorFunc) {
        this._rejectCallback = errorFunc;
        return this;
    }

    resolve(data) {
        this._resolveCallback(data);
    }

    reject(data) {
        this._rejectCallback(data);
    }
}

let promise = new Promise((resolve, reject) => {
});
console.log(promise);

const executor = (resolve, reject) => {
    console.log('Executed!');

    setTimeout(() => {
        resolve('Server response...');
    }, 2000);
}
let myPromise = new MyPromise(executor);

console.log(myPromise);

myPromise
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
