Interstellar Widget Tester
==========================

Testing widgets can be cumbersome. You need to create an app where you will embed your widget, then write a code to create a session or register intent receiver to check whether your app is broadcasting them correctly.

This small application will help you test you widgets. You can use it to easily create (and destroy) sessions and send and monitor broadcasted intents.

All you have to do is:
* Clone this repo,
* `import` and `use` your module in the app, for example:
```js
import interstellarSampleModule from 'interstellar-sample-module';
// ...
app.use(interstellarSampleModule);
```
* Insert your widget in `main.template.html` file, for example:
```html
<interstellar-sample-module-my-widget></interstellar-sample-module-my-widget>
```

You can use [interstellar-workspace](https://github.com/stellar/interstellar-workspace) to make your workflow more smooth.

## TODOs
* Make it less ugly.
* Move helper widgets (Sessions/Intents) to their modules and load them dynamically when included.