# sample_Ionic2 #
This convertigo project template can be used to start a Ionic2 / Angular 2 project with Convertigo.

## Prerequisites ##
You must install [node.js V 6.5.0](https://nodejs.org/dist/v6.5.0/node-v6.5.0-x64.msi "Node JS") or later on your workstation. Also make sure you have gulp installed

	>npm -g install gulp

## Usage ##
To use this template import it in Convertigo Studio (File->Import->Convertigo->Convertigo Project).

When the project is imported switch to the Project Explorer view tab and explore the structure :

    template_Ionic2
	  	[_private]
		[DisplayObject]
		[ionic]
		[Traces]
		[wsdl]
		[xsd]
		index.html
		readme.md
		template_Ionic2.xml

Your development files are in the [ionic] directory

	ionic
		[app]
			[pages]	
			[providers]	
			[theme]	
			app.ts
			ionicapp.html	
		[hooks]
		[plugins]
		[resources]
		[typings]
		[www]
		config.xml
		gulpfile.js
		package.json
		tsconfig.json
		typing.json


You can develop your app by modifying the **app/app.ts** and the pages under the the **app/pages** directory.

## Installing ionic and Angular modules ##

The template contains the **package.json** describing all the dependencies need to run the mobile app. To install the dependencies go in the
root project directory and use :

	>cd ionic
	>npm install

This will install all the needed runtime and development modules for Ionic 2 and Angular 2. If you need more modules just use the standard :

	>npm install <module_name> --save

To add it to you dependencies.

## Running the app in a Web Browser ##
You can test and run the app in a modern web browser such as Chrome. To do that you must use the **gulpfile.js** script provided. This script is a customized version of the standard **gulpfile.js** provided by ionic. To run the app use :

	>gulp watch

	[10:01:27] Using gulpfile ~\workspace7.4\sample_Ionic2\ionic\gulpfile.js
	[10:01:27] Starting 'clean'...
	[10:01:27] Finished 'clean' after 38 ms
	[10:01:27] Starting 'watch'...
	[10:01:27] Starting 'sass'...
	[10:01:27] Finished 'sass' after 15 ms
	[10:01:27] Starting 'html'...
	[10:01:27] Finished 'html' after 2.16 ms
	[10:01:27] Starting 'fonts'...
	[10:01:27] Finished 'fonts' after 749 µs
	[10:01:27] Starting 'scripts'...
	[10:01:27] Finished 'scripts' after 5.64 ms
	browserify done :12179435 bytes written (16.83 seconds)
	[10:01:52] index.html reloaded.
	[10:01:53] Finished 'watch' after 26 s

In a windows/unix shell console. This will build a Web app (Browserify, tsify, sass, etc ...) in the standard Convertigo <project>/DisplayObjects/mobile directory. Using gulp watch monitors changes in any of the ionic/app files and regenerates an app in the DisplayObjects mobile directory. This way each time you modify a file, a valid app is ready to be tested or built.

When the gulp watch task is finished, you will be able to :

- Run the mobile app in the Convertigo test platform as usual (Right Click on MobileApplication Object->Launch in test Platform)
- Run the mobile app Full Screen (Right Click on MobileApplication Object->Launch FullScreen)
- Use local Build to build a APK/IPA/XAP (Right click on a Mobile platform -> Cordova->Local build)


## Using livereload ##

You can use the Chrome extension [livereload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?utm_source=chrome-app-launcher-info-dialog "LiveReload") to automatically reload your app in the browser when a file is modified.

## Deploy your project on a integration/production server ##

As in the Convertigo project you have an [ionic] directory with the node_modules installed, if you deploy the project as is, you will package the useless node_modules directory in the .CAR file. We suggest to remove this directory before deploying.

## Adding ionic native plugins ##
If you want to use some Ionic native plugins do not use the ionic CLI to add them as their description will end up in <project>/ionic/config.xml. This file is not use by the Convertigo remote build or local build system. This is why you must add the plugins in the
 
	<Project>/DisplayObjects/Platforms/<platform>/config.xml



 