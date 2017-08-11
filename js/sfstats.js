// default project name
var defaultProject = "ovoplayer"
var daysToAnalyze = 30
var GMapsKey = ''

//
var sfData

function byId(id) {
  return document.getElementById(id)
}

function printf(fmt, ...args) {
  return fmt
    .split('%%')
    .reduce((aggregate, chunk, i) => aggregate + chunk + (args[i] || ''), '')
}

function loadCharts() {
  google.charts.load('visualization', {
    'packages': ['geochart', 'corechart', 'bar'],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    'mapsApiKey': GMapsKey
  })
  google.charts.setOnLoadCallback(drawDates)

  function drawDates() {
    geochart = new google.visualization.GeoChart(byId('regions'))
    barchart = new google.visualization.BarChart(byId('dates'))
    piechart = new google.visualization.PieChart(byId('oses'))
  }
}

function renderCountries(stats, displayObj, tableObj) {

  if (tableObj) {
    tableObj.innerHTML = ''
  }

  var data = new google.visualization.DataTable()
  data.addColumn('string', 'Country')
  data.addColumn('number', 'Count')
  for (var i = 0; i < stats.countries.length; i++) {
    var obj = stats.countries[i]
    data.addRow(obj)
    if (tableObj) {
      var row = tableObj.insertRow(-1)
      var c0 = row.insertCell(0)
      c0.innerText = obj[0]
      var c1 = row.insertCell(1)
      c1.innerText = obj[1]
    }

  }

  var options = {}
  geochart.draw(data, options)
}

function renderDates(stats, height, displayObj) {
  var data = new google.visualization.DataTable()
  data.addColumn('string', 'Period')
  data.addColumn('number', 'Count')

  for (var i = 0; i < stats.downloads.length; i++) {
    var obj = stats.downloads[i]
    data.addRow(obj)
  }

  var options = {
    height: height,
    title: stats.period + ' downloads',
    hAxis: {
      title: 'Downloads',
      minValue: 0
    },
    vAxis: {
      title: 'Period'
    }
  }
  barchart.draw(data, options)
}

function renderOSes(stats, height, displayObj) {
  var data = new google.visualization.DataTable()
  data.addColumn('string', 'OS')
  data.addColumn('number', 'Count')

  for (var i = 0; i < stats.oses.length; i++) {
    var obj = stats.oses[i]
    data.addRow(obj)
  }

  var options = {
    height: height,
    is3D: true
  }
  piechart.draw(data, options)
}

function renderDashBoard(stats, displayObj) {
  byId('totDownloads').innerText = stats.total
  byId('totCountries').innerText = stats.countries.length
}

function downloadStats(url, onDoneStats) {
  fetch(url)
    .then(function(response) {
      if (!response.ok) {
        messagefield.innerText = response.statusText
      }
      return response.json()
    })
    .then(function(data) {
      readstats = data
      if (onDoneStats) {
        onDoneStats()
      }
      return ''
    })
    .catch(function() {
      return 'Error while fetching stats'
    })
}

function getStats(project, start_date, end_date) {
  openStats(null, 4, 'spinner')
  url = printf('https://sourceforge.net/projects/%%/files/stats/json?start_date=%%&end_date=%%',
    project, start_date, end_date)

  downloadStats(url, function() {
    openStats(null, 3, 'dashboard');
  })
  return false
}

function openStats(evt, index, panel, renderTarget) {
  var i
  var x = document.getElementsByClassName('w3-panel')
  for (i = 0; i < x.length; i++) {
    x[i].style.display = 'none'
  }

  tablinks = document.getElementsByClassName('tablink')
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' w3-blue', '')
  }

  byId(panel).style.display = 'block'
  var control = byId(renderTarget)
  graphHeight = byId(panel).offsetHeight - 113

  switch (index) {
    case 0:
      renderCountries(readstats, control, byId("regionsTable"))
      break
    case 1:
      renderOSes(readstats, graphHeight, control)
      break
    case 2:
      renderDates(readstats, graphHeight, control)
      break
    case 3:
      renderDashBoard(readstats)
      break

  }
  if (evt) {
    evt.currentTarget.className += ' w3-blue'
  }
  return false
}

// Get the Sidebar
// Get the DIV with overlay effect
// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
  var mySidebar = byId("mySidebar");
  var overlayBg = byId("myOverlay");
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
    overlayBg.style.display = "none";
  } else {
    mySidebar.style.display = 'block';
    overlayBg.style.display = "block";
  }
}

// Close the sidebar with the close button
function w3_close() {
  var mySidebar = byId("mySidebar");
  var overlayBg = byId("myOverlay");
  mySidebar.style.display = "none";
  overlayBg.style.display = "none";
}

function reloadStats() {
  sfData = undefined
  getStats(defaultProject, byId('startdate').value, byId('enddate').value);
}

function loadDefaultData() {
  loadCharts()
  var currDate = new Date()
  end_date = currDate.toISOString().substring(0, 10);
  currDate.setDate(currDate.getDate() - daysToAnalyze);
  start_date = currDate.toISOString().substring(0, 10);
  byId('startdate').value = start_date
  byId('enddate').value = end_date
  getStats(defaultProject, start_date, end_date);
}