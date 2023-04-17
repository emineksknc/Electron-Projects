const electron = require("electron");
const url = require("url");
const path = require("path");

const {app, BrowserWindow, Menu, ipcMain,webContents} = electron;

let mainWindow, addWindow;

let todoList = [];

app.on('ready', () =>{
    mainWindow = new BrowserWindow({
     webPreferences: {
         nodeIntegration: true,
         contextIsolation: false,
     }
    }); 

    mainWindow.setResizable(false)
 
    // Pencerenin Oluşturulması...
    mainWindow.loadURL(
     url.format({
         pathname: path.join(__dirname, "pages/mainWindow.html"),
         protocol: "file",
         slashes: true
     })
    );


    // Menünün Oluşturulması...
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);

   mainWindow.on('close', () => {
    app.quit();
   })

   // NewTODO Penceresi Eventleri...

   ipcMain.on("newTodo:close", () => {
        addWindow.close();
        addWindow = null;


   })

   ipcMain.on("newTodo:save", (err, data) => {
    if(data){
        let todo = {
            id: todoList.length + 1,
            text: data

        }
        todoList.push(todo)

        //addWindow'dan aldığımız TODO'yu mainWindow'a gönder...
        mainWindow.webContents.send("todo:addItem", todo);

        addWindow.close();
        addWindow = null;
    }


})

})

// Menü Template Yapısı
const mainMenuTemplate = [
    {
        label: "Dosya",
        submenu: [
            {
                label: "Yeni TODO Ekle",
                click (){
                    createWindow();
                }
            },
            {
                label: "Tümünü Sil"
            },
            {
                label: "Çıkış",
                accelerator: process.platform =="darwin" ? "Command+Q" : "Ctrl+Q",
                role: "quit"
            }
        ]
    },
    
]

if (process.platform == "darwin"){
    mainMenuTemplate.unshift({
        label: app.getName(),
        role: "TODO"
    })
}

if(process.env.NODE_ENV !== "production"){
    mainMenuTemplate.push(
        {
            label: "Geliştirici Araçları",
            submenu: [
                {
                    label: "Geliştirici Araçları",
                    click(item, focusedWindow){
                        focusedWindow.toggleDevTools();
     
                    }
                },
                {
                    label: "Yenile",
                    role: "reload"
                }
            ]
        }

    )
}

function createWindow(){
    addWindow = new BrowserWindow({
        width: 480,
        height:175,
        title: "Yeni Bir Pencere",
        frame:false,
        autoHideMenuBar:false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        
    })

    addWindow.setResizable(false);

    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, "pages/newToDo.html"),
        protocol: "file:",
        slashes: true
    }))

    addWindow.on('close', () =>{
        addWindow = null;
    })

}



function getTodoList(){
    console.log(todoList);
}