(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals
        root.Meowter = factory(root);
    }
}(typeof self !== 'undefined' ? self : this, function (window) {

    //storage container for all routes
    const routes = {};

    /**
     *  shouldPreventRoute should be a function that will return
     *  true or false to let the router know if it needs to emit
     *  the routes actions
     */
    let shouldPreventRoute;

    /**
     *  this value denotes a wildcard in a url
     */
    let wildcard = "(=◕ᆽ◕ฺ=)";

    //PUBLIC FUNCTIONS

    /**
     *  Creates an action association with a specified route.
     *  @param {string} route - the route to associate with an action
     *  @param {function} cb - the action to trigger when a route is called
     */
    function meow(route, cb){
      if(!routes[route]){
        routes[route] = [];
      }
      if(cb){
        routes[route].push(cb);
      } else{
        return ({
          on: createRoute.bind(null, route)
        })
      }
      return;
    }

    /**
     *  sets shouldPreventRoute to a function that will be used to assess
     *  whether the route actions should be called
     *  @param {function} fn - the function to set shouldPreventRoute to
     */
    function preventMeow(fn){
      if(typeof fn !== "function") {
        throw new Error('preventRoute expected a function as a parameter');
      }
      shouldPreventRoute = fn;
    }

    /**
     *  Sets a new value to be used as the wildcard
     *  @param {string} [newWildcard = wildcard] - value to be used as the wildcard
     */
    function setWildMeow(newWildcard=wildcard){
      if(wildcard === newWildcard) return;
      wildcard = newWildcard
    }

    //PRIVATE FUNCTIONS

    /**
     *  filters pathnames from an array that match a given pathname
     *  @param {string} pathname - the route to associate with an action
     *  @param {array} routesArray - the action to trigger when a route is called
     *  @returns {array} - an array that contains all matched routes and their wildcard values
     */
    function findMatchedRoutes(pathname, routesArray){
      let paths = pathname.split('/').filter(function(path){
        return path;
      })
      return routesArray.reduce(function(matches, route, index){
        let routeObject = {
          route: route,
          wildcards: []
        };
        if(route === pathname){
          matches.push(routeObject);
          return matches;
        }
        const routePaths = route.split('/').filter(function(path){
          return path;
        })
        if(routePaths.length < paths.length){
          return matches;
        }
        if(routePaths.includes(wildcard)){
          let match = routePaths.reduce(function(match, path, index){
            let trimmedPath = path.trim();
            if(!match){
              return match;
            }
            if(!paths[index]){
              return false;
            }
            if(trimmedPath === wildcard && !!paths[index]){
              routeObject.wildcards.push(paths[index]);
            }
            if(trimmedPath !== paths[index].trim() && trimmedPath !== wildcard){
              return false;
            }
            return match;
          }, true);
          if(match){
            matches.push(routeObject);
          }
        }
        return matches;
      }, []);
    }

    /**
     *  Calls all actions associated with the current window.location.pathname.
     */
    function emitCallbacks(){
      let matchedPaths = findMatchedRoutes(window.location.pathname, Object.keys(routes));
      if(!matchedPaths.length && routes['/']){
        return routes['/'].forEach(function(fn){
          fn();
        });
      }
      matchedPaths.forEach(function(routeObject){
        const emitPath = routes[routeObject.route] || [];
        emitPath.forEach(function(fn){
          fn(...routeObject.wildcards);
        })
      });
    }

    /**
     *  checks if an element is an <a> link
     *  @param {Element} element - the dom element associated with a click event
     */
    function isElementLink(element){
      return (
        element.nodeName === 'A' ?
          element :
          element.parentNode.nodeName === 'A' ?
            element.parentNode :
            false
      );
    }

    /**
     *  Helper function to replace the window.history state if a link is clicked
     *  @param {event} event - the click event
     */
    function emitOnClick(event){
      if(shouldPreventRoute && shouldPreventRoute(event)){
        return;
      }
      const link = isElementLink(event.target);
      if(link){
        if(link.target !== '_self'){
          return;
        }
        const url = new URL(link.href);
        if(url.host !== window.location.host){
          return;
        }
        event.preventDefault();
        window.history.replaceState({},document.title,link.href);
        emitCallbacks();
      }
    }
    /**
     *  dom listeners that should signal a potential route action
     */
    document.addEventListener('click', emitOnClick);
    window.addEventListener('popstate', emitCallbacks);
    window.addEventListener('hashchange', emitCallbacks);
    window.addEventListener('load', emitCallbacks);

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return({
      meow,
      preventMeow,
      setWildMeow,
    });
}));