#css_dir = "../css"
#sass_dir = "../sass"

# Delineate the directory for our SASS/SCSS files (this directory)
sass_path = File.dirname(__FILE__)
 
# Delineate the CSS directory (under resources/css in this demo)
css_path = File.join(sass_path, "..", "css")
 
# Delinate the images directory
images_dir = File.join(sass_path, "..", "img")
 
# Load the sencha-touch framework
load File.join('C:\workspace_convertigo_dev5.5.0\sencha\sencha-touch-1.1.0\sencha-touch-1.1.0', 'resources', 'themes')
 
# Specify the output style/environment
output_style = :compressed
environment = :production
 
