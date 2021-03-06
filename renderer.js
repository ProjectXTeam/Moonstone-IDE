
var app = require('electron').remote
var dialog = app.dialog;
var Menu = app.Menu;

function setMainMenu() {
    const template = [
      {
        label: 'File',
        submenu: [
          {
            label: 'Save',
            accelerator: 'CmdOrCtrl+S',
            click() {
                dialog.showSaveDialog((fileName) => {
                    if(fileName == undefined){
                        return;
                    }
                    fs.writeFile(fileName, content.value, (err) => {
                        if (err) console.log(err);
                    });
                });
            }
          },
          {
            label: 'Open',
            accelerator: 'CmdorCtrl+O',
            click() {
                dialog.showOpenDialog((fileNames) => {
                    if(fileNames == undefined){
                        return;
                    } else {
                        function readFile(filepath){
                            fileName.innerHTML = filepath;
                            fs.readFile(filepath, 'utf-8', (err, data) => {
                                if(err){
                                    return;
                                }
                                
                                function countLine(element) {
                                    lineCount.innerHTML = ""
                                    var text = document.getElementById(element).value;
                                    var lines = text.split("\n")
                                    var count = 1;
                                    for (var i = 0; i < lines.length-1; i++) {
                                        lineCount.innerHTML += "\n" + count;
                                        count += 1;
                                    }
                                    lineCount.innerHTML += "\n" + count;
                                }
                                content.innerHTML = data;
                        
                                console.log(countLine('fileContent'));
                            });
                        }
            
                        readFile(fileNames[0]);
                    }
            
                })
            }
          }
        ]
      }
    ];
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

setMainMenu()

var fs = require('fs');

let content = document.getElementById('fileContent');
let lineCount = document.getElementById('lineCount');
let fileName = document.getElementById('fileName');

lineCount.style.fontSize = content.style.fontSize;
content.style.width = window.innerWidth - 40 + "px";
content.style.left = 40 + "px";
content.style.height = 400 + "px";
lineCount.style.width = 34 + "px";
lineCount.style.height = content.offsetHeight - 5 + "px";
lineCount.style.top = content.offsetTop + "px";
lineCount.style.left = content.offsetLeft - 40 + "px";

content.addEventListener('scroll', () => {
   lineCount.scrollTop = content.scrollTop; 
});

content.addEventListener('keydown', () => {
    function countLine(element) {
        lineCount.innerHTML = ""
        var text = document.getElementById(element).value;
        var lines = text.split("\n")
        var count = 1;
        for (var i = 0; i < lines.length-1; i++) {
            lineCount.innerHTML += "\n" + count;
            count += 1;
        }
        lineCount.innerHTML += "\n" + count;
    }

    console.log(countLine('fileContent'))
});
