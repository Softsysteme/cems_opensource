####################################################################################################"
# This config.rb matches the Standard Directory structure for Convertigo Mobilizer projects
# to Compile the scss file use the following commands :
#
# - install ruby on rails 
# - install compass (issue commands 'gem install ham' and 'gem install compass')
# - switch to the project's root directory 
# - issue command 'compass compile scss'
#
# The css file will be generated in the DisplayObjects/mobile/css directory
####################################################################################################"


# Delineate the directory for our SASS/SCSS files (this directory)
sass_path = File.dirname(__FILE__)
 
# Delineate the CSS directory (under resources/css in this demo)
css_path = File.join(sass_path, "..", "DisplayObjects/Mobile/css")
 
# Delinate the images directory
images_dir = File.join(sass_path, "..", "DisplayObjects/Mobile/css/img")
 
# Load the sencha-touch framework. Configure here the path to a valid Sencha Touch 
# unzipped installation.

load File.join('C:\Users\opic.TWINSOFT2K\convertigoTEST\sencha\sencha-touch-1.1.0', 'resources', 'themes')
 
# Specify the output style/environment
output_style = :compressed
environment = :production
 
