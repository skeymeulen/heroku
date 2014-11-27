
  _    _    _    _    _    _    _    _    _    _    _    _    _    _    _     _    _    _     
  \"-._\"-._\"-._\"-._\"-._\"-._\"-._\"-._\"-._\"-._\"-._\"-._\"-._\"-._\"-._\"-._ \"-._\"-._
  "    "    "    "    "    "    "    "    "    "    "    "    "    "    "    "    "    "    "      

		  888888b.         d8888 .d8888b. 888    d8P 8888888888888b    8888888888b.  
		  888  "88b       d88888d88P  Y88b888   d8P  888       8888b   888888  "Y88b 
		  888  .88P      d88P888888    888888  d8P   888       88888b  888888    888 
		  8888888K.     d88P 888888       888d88K    8888888   888Y88b 888888    888 
		  888  "Y88b   d88P  888888       8888888b   888       888 Y88b888888    888 
		  888    888  d88P   888888    888888  Y88b  888       888  Y88888888    888 
		  888   d88P d8888888888Y88b  d88P888   Y88b 888       888   Y8888888  .d88P 
		  8888888P" d88P     888 "Y8888P" 888    Y88b8888888888888    Y8888888888P" 

  _    _    _    _    _    _    _    _    _    _    _    _    _    _    _     _    _    _     
  \"-._\"-._\"-._\"-._\"-._\"-._\"-._\"-._\"-._\"-._\"-._\"-._\"-._\"-._\"-._\"-._ \"-._\"-._
  "    "    "    "    "    "    "    "    "    "    "    "    "    "    "    "    "    "    " 

BACKEND noemt momenteel b, en bevat zowel de server-side als de client-side van de backend.
Dit is gewoon omdat het snel moest met een generator, en het noemt b en niet backend omdat
maarten een probleem had met de lengte van het pad. Weird.

+---------------------------------------------   1   -----------------------------------------+
+---------------------------------------------------------------------------------------------+
| = : = : = : = : = : = : = : = :       DIRECTORY STRUCTUUR       = : = : = : = : = : = : = : |
+---------------------------------------------------------------------------------------------+

+ app = server-side code, MVC. Hier zit ook bijvoorbeeld 404 error pages in
|---+ routes = Hier alle routes definiëren die gebruikt worden in de views
|---+ layout.server.view.html = Waar de app connecteerd met angular modules (in public map)
|
+ config = connecties met mongodb, api,... Server-side configuratie dus, niet te verwarren
|          met server-side code!
|---+ env
|---+ strategies
|
+ node_modules = De map die aangemaakt wordt door npm install, 
|                met alle depedencies uit package.json
|
+ public = client-side code, angular
|---+ lib = Waar bower momenteel alle dependencies installeerd
|---+ modules = Alle angular.js modules
      |         Voor alles wat in modules zit, best deze link lezen, want het is een hele 
      |         boterham: http://meanjs.org/docs.html#angularjs-modules
      |---+ core = homepage / header
      |---+ users= alles van users, login, register, profile, etc...
    

Andere belangrijke files:
package.json = Dependencies voor npm, alle server-side packages
bower.json = Dependencies voor bower, alle client-side packages
.bowerrc = Waar bower packages installeert
.gitignore = files die git negeert, durrr
.jshintrc = Waar je definieerd over wat je hints wilt ontvangen in javascript code


+---------------------------------------------   2   -----------------------------------------+
+---------------------------------------------------------------------------------------------+
| = : = : = : = : = : = : = : = : = : =     OPMERKINGEN     : = : = : = : = : = : = : = : = : |
+---------------------------------------------------------------------------------------------+

Vergeet niet npm install te runnen voor je begint hierop te werken!
