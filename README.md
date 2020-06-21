# Nexi
### A rail-ish framework for node.js

There are a *log* of node.js frameworks, and even some _inspired_ by ruby on rails, but to my knowledge there is still no
framework that brings the same conventions and ease of new application development to node.  A saga...

## Documentation

Head to [the wiki](https://github.com/tswayne/nexi/wiki) for full documentation.

## Features

This is a quick glance at some of the niceties provided by nexi.  For a deep dive into all of the bells and whistles, check out the [docs](https://github.com/tswayne/nexi/wiki)


### Mvc
Nexi is a mvc web framework that is designed to provide a foundation for building applications that scale cleanly and easily.


#### Controllers
Nexi controllers are fairly simple, and combined with several other conventions provide a very easy means to adding new pages or api endpoints to your application.
```
// src/app/controllers/home-controller.js
const { BaseController } = require('nexi')

class HomeController extends BaseController {

  async welcome(req, res) {
    const user = this.context.models.users.findOne({ id: req.params.id })
    return res.render('home/welcome',  { user } )
  }
}
module.exports = WelcomeController
```

#### Routing
Modeled after rails routes, the router is simple yet powerful providing one organized space to declare all of your applications routes cleanly.  The router hooks into
Nexi middleware enabling an easy way to configure per route (or a group of routes) pre/post request handlers.  Namespace blocks and inline handlers are also supported.  
```
// src/routes.js
module.exports = (context, router) => {
  router.get('/welcome/:id', 'homeController#welcome')

  router.get('/secret', 'requireLogin', 'secretController#shh')
}

```

#### Views
Nexi comes with a templating engine ([handlebars](https://github.com/handlebars-lang/handlebars.js) hooked up out of the box.  For apis, views can be omitted through configuration. Layouts, view helpers, partials, and other common mvc view components are also provided.  
```
// src/app/views/home/welcome.js
<div>
    <h1>Welcome {{user.name}}!</h1>
</div>
```

#### Models
Nexi also comes with an orm ([waterline](https://github.com/balderdashy/waterline)) as well as a fully featured migrations tool. These can also be disabled through configuration. 
```
//src/app/models/User.js
module.exports = {
  identity: 'user',
  datastore: 'default',
  attributes: {
    name: {
      type: 'string',
      required: true,
    },
  }
}
```

#### Context
Instead of providing Nexi components (such as models or the application configuration) as global variables, Nexi exposes these components through a context (see context design pattern) object injected into and accessible within any Nexi hook (controllers, middleware, decorators, initializers).  This provides simple dependency injection pattern that promotes reusability, testability, and maintainability.   
You can also decorate context with anything you'd like to be globally available.  
```
//src/decorators/index.js
module.exports = (context) => {
  context.elasticSearchClient = new elasticsearch.Client()
}

...

const results = await this.context.elasticSearchClient.search(params)
```

#### But wait, there's more...

* Middleware - Easy to add global pre/post request middleware along with router middleware make it easy to controller the request flow
  * Built in middleware - Request logging, error responses, global exception handlers, [security](https://github.com/helmetjs/helmet), [compression](https://github.com/expressjs/compression)
* Built in decorators - models, error reporter, application logger, application configuration
* Initializers & bootstrap support - handle startup logic in either `config/boot.js` or group like functionality in initializers
* Sessions - session store provided out of the box



