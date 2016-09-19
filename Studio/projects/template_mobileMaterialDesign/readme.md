# template_mobileMaterialDesign #
This starter project will help you to create "Material Design" look & feel mobile apps hybrid applications. Material Design is the standard Google android look & feel but is more and more used on other type of platforms.

You can have more information about material Design on Google's web site: 

[Introduction to Material Design](https://material.google.com/)

## How to use ##
This template uses classic jQueryMobile + CTF development guidelines so you can still use the [jQueryMobile](http://demos.jquerymobile.com/1.4.5/)  Widget library and  [Convertigo CTF](http://www.convertigo.com/document/latest/reference-manual/convertigo-templating-framework/) to write you mobile user interface.

The Material Design look and feel is based on [NATIVEDROID2](http://nativedroid.godesign.ch/material/) from  [Godesign Webpublishing GmbH](http://www.godesign.ch/) 

This means that you can use nativeDroid2 documentation and samples to write your app. Here are some useful links :

- nativeDroid2 documentation :  [http://nativedroid.scripter.click/](http://nativedroid.scripter.click/)
- nativeDroid2 show case : [http://nd2.godesign.ch/](http://nd2.godesign.ch/)
- Responsive Design Grids documentation : [http://flexboxgrid.com/](http://flexboxgrid.com/)

## Specific Convertigo CTF Customizations ##
Some customizations had to be made to have CTF being able to use nativeDroid2. Basically these customization have been made outside the nativeDroid2 files so that if a new version of the them is available, you can safely copy the files to your project.

Customizations are mostly about the Menu panel being declared in only in the app.html file. Also jQueryMobile is configured by default to cache all the pages in the DOM, so that the back button brings the applications to a previous CTF templated page automatically.


## Warnings and non-supported features ##
nativeDroid2 bring the nd2-incude feature to include the same page fragments in other pages. This is useful for headers and footer for example.

Although you can use this in your apps, CTF doese not support templating in these fragments. So, use this only for static HTML fragments.

  
   


