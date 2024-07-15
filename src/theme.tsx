import type { CustomFlowbiteTheme } from "flowbite-react";

const customTheme: CustomFlowbiteTheme = {
  button: {
    base: "group relative flex items-stretch justify-center p-0.5 text-center font-medium font-raleway transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none",
    color: {
      primary: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300",
      gray: ":ring-gray-700 border border-gray-200 bg-white text-gray-900 focus:text-gray-700 focus:ring-4 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-600 dark:bg-transparent dark:text-gray-400 dark:enabled:hover:bg-gray-700 dark:enabled:hover:text-white",
    },
    gradient: {
        blue: "text-white bg-gradient-to-br from-blue-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-80",
    },
    gradientDuoTone: {
      purpleToBlue: "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-80",
    },
    inner: {
        base: "flex items-center transition-all duration-200",
    }
  },
  hr: {
    root: {
        base: "my-6 h-px border-0 bg-gray-300 dark:bg-gray-700"
    }
  },
  table: {
    root: {
        base: "w-full text-left font-raleway text-sm text-[#4B4B4B] dark:text-gray-400",
    },
    head: {
        base: "group/head text-xs font-bold uppercase dark:text-gray-400",
        cell: {
            base: "bg-[#EBEAEF] px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700",
        }
    }
  },
  modal: {
    footer: {
        base: "flex justify-end items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600",
        popup: "border-t"
    }
  },
  // Custom styles for the Drawer component
  drawer: {
    root: {
      position: {
        "left": {
          "on": "left-0 top-0 h-screen w-64 transform-none",
          "off": "left-0 top-0 h-screen w-64 -translate-x-[calc(100%-55px)]"
        }
      }
    }
  },
  fileInput: {
    field: {
      base: "relative w-full h-full",
      input: {
        base: "block w-full h-full opacity-0 cursor-pointer overflow-hidden rounded-lg border disabled:cursor-not-allowed disabled:opacity-50",
      }
    },
  }
};

export default customTheme;