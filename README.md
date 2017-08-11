# sourceForgeStats: A dashboard for SourceForge binary downloads

This app show you stats about your downloadable file hosted in a SourceForge project.

Try the [Live Demo](https://varianus.github.io/sourceForgeStats/) for my audio player [OvoPlayer](https://sourceforge.net/projects/ovoplayer) project.

## Development 

This app is heavily based on a [template](https://www.w3schools.com/w3css/tryw3css_templates_analytics.htm) from [W3school.com](https://www.w3school.com) and is coded in pure Javascript, no need to JQuery.

This app use javascipt [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and some [ES 2015](http://www.ecma-international.org/ecma-262/6.0/) javascript extensions, so you will need a fairly recent browser to use it.

It use the very good [W3.css CSS framework](https://www.w3schools.com/w3css/).
Charts are rendered using the [Google Charts API](https://developers.google.com/chart/).

## Installation 

There is no need to host this app in a web server. There are no dependencies to install.

Just [download it](https://github.com/varianus/sourceForgeStats/archive/master.zip) and unzip on local folder.
Navigate to the js sub folder, open the sfstats.js file  in a text editor and change value of the following variables

Variable|Comment
-----|------
defaultProject|*Name of your project on SourceForge*
daysToAnalyze|*Default number of day to analyze*
GMapsKey|*[optional] Google maps api key. See [here](https://developers.google.com/maps/documentation/javascript/get-api-key) on how to get one*
 
Now point your browser to the index.html file and everything should work!
