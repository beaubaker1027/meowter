### Meowter
Meowter is a cat themed client side router.
### Installation
To install, add [meowter.min.js](https://github.com/beaubaker1027) within your app and add to the header

(If you're a curious cat you can view the unminified version here: [meowter.js](https://github.com/beaubaker1027))
```
<script type="text/javascript" src="scripts/lib/meowter.min.js"></script>
```
### Setup
Meowter is self invoking and will create a global so you won't have to worry about initializing it.  Simply call the global Meowter
### Meow
Syntax:
```
Meowter.meow(route, function)
```
The meow function is used to attach an action to a route.  When navigating to the route, the action is called.  It takes two arguments, a route and a function.
```
Meowter.meow("/meow", function(){
  console.log("meow");
}
```
The functions are stored in an array so multiple functions can be attached to one route, if needed.
```
Meowter.meow("/", function(){
  console.log('function1');
}
Meowter.meow("/", function(){
  console.log('function2');
}
```

#### *Wildcards*
Default Syntax:
```
Meowter.meow("/cat/(=◕ᆽ◕ฺ=)", function(breed){
    console.log(breed);
});
```
In this example, `(=◕ᆽ◕ฺ=)` works as a wildcard.  The wildcard will pass the value of that path segement as an arguement in the route action.  
For example, navigating to the route `/cat/tabby` will pass 'tabby' as the breed arguement of the action above.

#### *Multiple Wildcards*
Default Syntax:
```
Meowter.meow("/cat/(=◕ᆽ◕ฺ=)/names/(=◕ᆽ◕ฺ=)", function(breed, name){
    console.log(`${name} is a ${breed} cat`);
})
```
Multiple wildcard can be used in a route.  
In the above example, navigationg to the route `/cat/tabby/names/whiskers` will pass 'tabby' as the breed and 'whiskers' as the name arguement.

### PreventMeow
Syntax:
```
Meowter.preventMeow(function)
```
The preventMeow function is used to prevent a route action from taking place.  This function accepts a function as an arguement.  The function passed in as an arguement should return a boolean or truthy/falsey value.  If the value evaluates to true, the action will be prevented.

```
Meowter.preventMeow(function(event){
    return event.metaKey;
})
```
### SetWildMeow
Syntax:
```
Meowter.setWildMeow(string)
```
setWildMeow is used to replace the default wildcard `(=◕ᆽ◕ฺ=)`  Simply pass in the new wildcard of your choice.
```
Meowter.setWildMeow('*');

Meowter.meow("/cat/*/names/*", function(breed, name){
    console.log(`${name} is a ${breed} cat`);
})
```
