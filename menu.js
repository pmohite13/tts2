const { Menu } = require("electron");

const menuTemplate = [
  {
    label: "Master",
    submenu: [
      {
        label: "Company",
        accelerator: "Ctrl+N",
      },
      { type: "separator" },
      {
        label: "Department",
        accelerator: "Ctrl+D",
      },
      { type: "separator" },
      {
        label: "Section",
        accelerator: "Ctrl+E",
      },
      { type: "separator" },
      {
        label: "Grade",
        accelerator: "Ctrl+G",
      },
      { type: "separator" },
      {
        label: "Category",
        accelerator: "Ctrl+Y",
      },
      { type: "separator" },
      {
        label: "Holiday",
        accelerator: "Ctrl+H",
      },
      { type: "separator" },
      {
        label: "Shift",
        accelerator: "Ctrl+F",
      },
      { type: "separator" },
      {
        label: "Employee",
        accelerator: "Ctrl+P",
      },
    ],
  },

  {
    label: "Exit",
    accelerator: "Ctrl+X",
  },
];

menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);

exports.ApplicationMenu = menu;
