Prérequis :
 * Avoir un Tomcat6 sur sa machine et connaitre son PATH.
 * Avoir les librairies de Convertigo4 quelque par sur sa machine (projet Eclipse ou installé).
 * Avoir un Eclipse 3.3

Étape après récupération du projet Convertigo4Server :
 * Ouvrir la view "Servers"
 * Clic-droit dans la view, New > Server
 * Choisir "Apache Tomcat v6 Server"
 * Choisir le path de son Tomcat6
 * Ajouter l'application Convertigo4Server
 * Prendre toutes les librairies de Convertigo4, les copier dans WebContent/WEB-INF/lib 
 à part les lib servlet-api.jar et jsp-api.jar
 * Prendre dans eclipse/plugins : org.eclipse.swt_* (1 jars)
 
 Démarrer le serveur :
  * dans la vue Server, clic-droit sur "Tomcat v6 Server...", "Publish", "Start"
  
 Dans context.xml ajouter la ligne <Loader delegate="true"/>
  
 Erreur dans Spring du à DreamFace dans web.xml 
  
 