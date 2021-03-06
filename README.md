<h1 align="center">Task repeater</h1>
<p>
  <a href="https://www.npmjs.com/package/task-repeater" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/task-repeater.svg">
  </a>
  <a href="https://github.com/electather/task-repeater#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/electather/task-repeater/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/electather/task-repeater/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/electather/task-repeater" />
  </a>
  <a href="https://bundlephobia.com/package/task-repeater" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/bundlephobia/minzip/task-repeater" />
  </a>
</p>

A tiny [(657B Gzipped)](https://bundlephobia.com/package/task-repeater) micro library to manage repeated tasks with ease.

## Install

```sh
yarn install
```

## Usage

```typescript
import TaskRepeater from 'task-repeater';

const job1 = TaskRepeater()
                .do(() => { /*...*/ })
                .every(1000)
                .start();

const job2 = TaskRepeater()
                .do((itteration) => console.log(`itteration No.${itteration} ...`))
                .do(() => { /*...*/ })
                .finally((itterationsDone) => console.log(`tasks done. ${itterationsDone} itterations were completed.`))
                .for(5) // times
                .every(2_000) // interval in miliseconds 
                .delay(1_000) // initial delay in miliseconds
                .start();

job1.stop(); // stops the repetitive calls
job1.reset(); // resets the counter as if it isn't invoked
```

## Author

👤 **Omid Astaraki <omid.ocean@gmail.com>**

* Github: [@electather](https://github.com/electather)
* LinkedIn: [@omid-astaraki](https://linkedin.com/in/omid-astaraki)

## Credits 

this package is based on [Repeatr](https://github.com/theshem/Repeatr) library developed by [@theshem](https://github.com/theshem).

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/electather/task-repeater/issues). You can also take a look at the [contributing guide](https://github.com/electather/task-repeater/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [Omid Astaraki <omid.ocean@gmail.com>](https://github.com/electather).<br />
This project is [MIT](https://github.com/electather/task-repeater/blob/master/LICENSE) licensed.