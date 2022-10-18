
# edi-ui
This is UI layer for EDI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.13 

How to use
----------

Run `npm install` inside this project folder to install all dependencies.

Make sure you use the latest version of the CLI (upgrade guide below)

Run `ng serve` to see the app in action (try `npm start` in case "ng serve" fails).

How to upgrade the CLI
-----------------------

Run the below commands - only use "sudo" on Mac/ Linux.
```
sudo npm uninstall -g angular-cli @angular/cli
npm cache clean --force
sudo npm install -g @angular/cli
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Sometimes the error of the test is not evident, especially when the error shows a message like:
`[object ErrorEvent] thrown`

Try testing `ng test --sourcemaps=false`. If that doesn't work, you will have to solve it manually; normally ErrorEvent exceptions are thrown by observables, check where in your component you are using an observable and try to provide a mock for it.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Deploying Tips in prod, test server
For an easy deployment just place all the files from the generated `dist/` folder under the `ROOT/` folder in the webapps directory. 

If you already have some other app using the root, just place the files under the folder you want in the webapss directory and change the base url of the Angular app in the `index.html` file. 
```
Change <base href="/"> to <base href="/myApp"> 
```

### Routing config
By default angular uses `PathLocationStrategy` for routing our URL Components. However this requires additional configuration on the server side, to allow manual URL input on the browser.

For `Local environments` should be enough to enable the `HashLocationStrategy` in `/ProjectName/src/app/app-routing.module.ts`
Then pass {useHash: true} when you are providing the routes with RouterModule, like so:

`RouterModule.forRoot(routes, {useHash: true})`

For `Production environments` or if you want to use the URLs without the hash `#` char, you need to configure your server to work with HTML5Mode.  

In Tomcat 8:
* **Global Approach**:
  In the `context.xml` add the following inside the `<context>` block: 
  
  
  `<Valve className="org.apache.catalina.valves.rewrite.RewriteValve" />`.
  
  (Note: This will enable the rewrite for all the projects currently deployed in the server)
  
* **The individual Host Approach**:
  In the `server.xml` file or in the custom context file under `\tomcat\conf\Catalina\localhost` add same previous line inside the `<context>` block.

* **Rewrite Configuration**: After the previous step, tomcat will scan inside our deployed project folder for the file `/WEB-INF/rewrite.config`. Inside this file you should have:
```
     RewriteCond %{REQUEST_URI} -f [OR]
     RewriteCond %{REQUEST_URI} -d
     RewriteRule ^.*$ - [L]
     ##
     RewriteCond %{REQUEST_URI} !-f [OR]
     RewriteCond %{REQUEST_URI} !-d
     RewriteRule ^.*$ /index.html [L]
```  
## Updating Dependencies
Since Angular CLI v1.7.0 you can use the command `ng update` to update all Angular dependencies to the latest stable version.

****
`Webpack` comes with the AngularCLI, if for any reason there is any conflict with this dependency, remove the webpack entry in the file `package.json`, then delete the file `package-lock.json`, next delete the entire `node-modules` directory. Finally run `npm install` this will fetch all the dependencies from the npm repositories.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## TODO
The Angular team will move to full AoT eventually and considers templates as separate entities from the component which means no private variables can be accessed from them. Therefore replace `private` accessor with `public` from some of the constructor properties injected that are also being accessed in templates, otherwise `ng build --prod` will fail.

If you want to support for IE Browser please go to the file `polyfills.ts` and uncomment the lines required for IE.

## TEST COMMIT
=======
# edi-ui
This is UI layer for EDI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.0

How to use
----------

Run `npm install` inside this project folder to install all dependencies.

Make sure you use the latest version of the CLI (upgrade guide below)

Run `ng serve` to see the app in action (try `npm start` in case "ng serve" fails).

How to upgrade the CLI
-----------------------

Run the below commands - only use "sudo" on Mac/ Linux.
```
sudo npm uninstall -g angular-cli @angular/cli
npm cache clean --force
sudo npm install -g @angular/cli
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Sometimes the error of the test is not evident, especially when the error shows a message like:
`[object ErrorEvent] thrown`

Try testing `ng test --sourcemaps=false`. If that doesn't work, you will have to solve it manually; normally ErrorEvent exceptions are thrown by observables, check where in your component you are using an observable and try to provide a mock for it.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Deploying Tips in prod, test server
For an easy deployment just place all the files from the generated `dist/` folder under the `ROOT/` folder in the webapps directory. 

If you already have some other app using the root, just place the files under the folder you want in the webapss directory and change the base url of the Angular app in the `index.html` file. 
```
Change <base href="/"> to <base href="/myApp"> 
```

### Routing config
By default angular uses `PathLocationStrategy` for routing our URL Components. However this requires additional configuration on the server side, to allow manual URL input on the browser.

For `Local environments` should be enough to enable the `HashLocationStrategy` in `/ProjectName/src/app/app-routing.module.ts`
Then pass {useHash: true} when you are providing the routes with RouterModule, like so:

`RouterModule.forRoot(routes, {useHash: true})`

For `Production environments` or if you want to use the URLs without the hash `#` char, you need to configure your server to work with HTML5Mode.  

In Tomcat 8:
* **Global Approach**:
  In the `context.xml` add the following inside the `<context>` block: 
  
  
  `<Valve className="org.apache.catalina.valves.rewrite.RewriteValve" />`.
  
  (Note: This will enable the rewrite for all the projects currently deployed in the server)
  
* **The individual Host Approach**:
  In the `server.xml` file or in the custom context file under `\tomcat\conf\Catalina\localhost` add same previous line inside the `<context>` block.

* **Rewrite Configuration**: After the previous step, tomcat will scan inside our deployed project folder for the file `/WEB-INF/rewrite.config`. Inside this file you should have:
```
     RewriteCond %{REQUEST_URI} !^.*\.(bmp|css|gif|htc|html?|ico|jpe?g|js|pdf|png|swf|txt|xml|svg|eot|woff|woff2|ttf|map)$
     RewriteRule ^(.*)$ /index.html [L]
```  
## Updating Dependencies
Since Angular CLI v1.7.0 you can use the command `ng update` to update all Angular dependencies to the latest stable version.

****
`Webpack` comes with the AngularCLI, if for any reason there is any conflict with this dependency, remove the webpack entry in the file `package.json`, then delete the file `package-lock.json`, next delete the entire `node-modules` directory. Finally run `npm install` this will fetch all the dependencies from the npm repositories.

## Use the webpack bundle analyzer

ng build --prod --stats-json

npx webpack-bundle-analyzer dist/stats.json

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

If you want to support for IE Browser please go to the file `polyfills.ts` and uncomment the lines required for IE.

