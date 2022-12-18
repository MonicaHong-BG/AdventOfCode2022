var fs = require("fs");
var text = fs.readFileSync("./d7/d7-inputs.txt", "utf-8");
var cmds = text.split("\r\n");

class Dir {
  constructor(name) {
    this.name = name
    this.filesize = 0
    this.parent = null
    this.children = {}
  }
}

class Device {
  constructor() {
    this.root = null
    this.cwd = []
    this.dirs = []
  }

  isEmpty() {
    if (this.root == null) {
      return true;
    }
  }

  // add child directory to cwd
  touch(name) {
    let newDir = new Dir(name);
    newDir.parent = this.cwd[this.cwd.length - 1];
    this.cwd.push(newDir);
    let current = this.root;

    while (true) {
      if (name === current.name) return undefined
      if (name !== current.name) {
        if (current.children[name]) {
          current.children[name]

        }
      }
    }
  }
  // find current dir and point to new current
  changeDir(name) {}

  totalFileSize(name) {}

  hasDupe(name) {
    for (let i = 0; i < this.dirs.length; i++) {
      if (this.dirs[i] == name) {
        return name
      }
    }
  }
}

const maxFileSize = 100000;
let device = new Device();

for (let cmd of cmds) {
  // let cdTop = cmd.match(/^\$ cd (\/+)/)
  if (cmd.startsWith("$ cd")) {
    let cdName = cmd.match(/^\$ cd (\/+|\w+)/)
  }
  let back = cmd.match(/^\$ cd (\.\.)/)
  let list = cmd.match(/^\$ (ls)/)
  let fileSize = cmd.match(/^(\d+)/)
  let dirName = cmd.match(/^dir (\w+)/)

  // console.log(cmd)
  if (cdName) {
    // change cwd
    // add previous cwd as parent
    let isDupe = device.hasDupe(cdName[1]) ? cdName[1] : ""
    console.log(isDupe)
    device.dirs.push(cdName[1])
    console.log(`cd: ${cdName[1]}`)

    // directories.changeDir(cdName);
  } else if (back) {
    // console.log(`pop back ${current[current.length-1]}`)
  } else if (list) {
    // console.log(`##list ${list[1]}`)
    // what the hell do I do here?
  } else if (fileSize) {
    // console.log(`adding fileSize ${fileSize[1]}`)
    // console.log(`**********${current[current.length-1]}`)
    // console.log(directories[current[current.length-1]][0])
    // console.log(`${directories[current[current.length-1]][0]} ${directories[current[current.length-1]][1]}`)
  } else if (dirName) {
    // console.log(`found sub dirs ${dirName[1]}`)
    // console.log(directories[current[current.length-1]])
    // directories.touch(dirName);
  }
}

/*
        root
parent ^-- "/" --> child
                \
                fs
                [subdirs]
                    \
                    fs
                    [subdirs]
*/
