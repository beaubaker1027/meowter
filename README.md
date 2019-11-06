#Meowter
Meowter is a cat themed client side router.

###Installation
To install, add [meowter.min.js](https://github.com/beaubaker1027) within your app and add to the header
```
<script type="text/javascript" src="scripts/lib/uiSwitch.js"></script>
```

###Setup
Meowter is self invoking and will create a global so you won't have to worry about initializing it.  (If you're a curious cat you can view the unminified version here: [meowter.js](https://github.com/beaubaker1027)) Simply call the global Meowter

###Meow
Syntax:

```
Meowter.meow(route, function)
```

The meow function is used to attach a function to a route.  When navigating to the route, the function is called.  It takes two arguments, a route and a function.

```
Meowter.meow("/meow", function(){
  console.log("meow");
}
```

The functions are stored in an array so multiple functions can be attached to one route.
```
Meowter.meow("/", function(){
  console.log('function1');
}
Meowter.meow("/", function(){
  console.log('function2');
}
```

###PreventMeow
The preventMeow is used to prevent a route action from taking place.  This function should return true if the route needs to be prevented.

###Build
The build function will build the UI depending on the screen size.  The resize event handler will be inactive until this function is called.