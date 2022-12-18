var fs = require("fs");
var text = fs.readFileSync("./d7/d7-inputs.txt", "utf-8");
var outputs = text.split("\r\n")

const maxFileSize = 100000
let directories = {}
let dirTotals = {}
let current = []
for(let cmd of outputs) {
    let cdTop = cmd.match(/^\$ cd (\/+)/)
    let cdName = cmd.match(/^\$ cd (\w+)/)
    let back = cmd.match(/^\$ cd (\.\.)/)
    let list = cmd.match(/^\$ (ls)/)
    let fileSize = cmd.match(/^(\d+)/)
    let dirName = cmd.match(/^dir (\w+)/)

    // console.log(cmd)
    if (cdTop) {
        // console.log(`cd ${cdTop[1]}`)
        current.push(cdTop[1])
        if(!directories[cdTop[1]]) {
            directories[cdTop[1]] = [0]
        }
    }
    else if (cdName) {
        // console.log(`cd ${cdName[1]}`)
        current.push(cdName[1])
        if(!directories[cdName[1]]) {
            directories[cdName[1]] = [0]
        }
    }
    else if (back) {
        current.pop()
        // console.log(`pop back ${current[current.length-1]}`)
    }
    else if (list) {
        // console.log(`##list ${list[1]}`)
        // what the hell do I do here?
    }
    else if (fileSize) {
        // console.log(`adding fileSize ${fileSize[1]}`)
        directories[current[current.length-1]][0] += parseInt(fileSize[1])
        // console.log(`**********${current[current.length-1]}`)
        // console.log(directories[current[current.length-1]][0])
        // console.log(`${directories[current[current.length-1]][0]} ${directories[current[current.length-1]][1]}`)
    }
    else if (dirName) {
        // console.log(`found sub dirs ${dirName[1]}`)
        directories[current[current.length-1]].push(dirName[1])
        // console.log(directories[current[current.length-1]])
    }
    printDirectories(directories)
}

// for(let dir in directories) {
//     console.log(`~~~~~running ${dir}`)
//     dirTotals[dir] = totalEachDirectory(dir, directories)
// }

// console.log("************* magic? *********")
// let totalzzz = 0
// for (let dir in dirTotals) {
//     if (dirTotals[dir] <= maxFileSize) {
//         totalzzz += parseInt(dirTotals[dir])
//         console.log(dirTotals[dir])
//     }
// }
// console.log(`********** ${totalzzz} **********`)

function totalEachDirectory(dir, dirs, fs=0, nextDirs=[], added=[]) {
    // 0 index is filesize of dir and 1 index and after are subdirs
    // add fs
    // if subdir then add to nextlist
    // each subdir and remove from nextlist
    // repeat
    if (!dirs[dir]) {
        console.log("not found")
    }
    else if (parseInt(dirs[dir][0]) >= maxFileSize) {
        // over
        return
    }
    else if (!added.includes(dir)) {
        // not added yet and has fs
        fs += parseInt(dirs[dir][0])
        added.push(dir)
        // console.log(`added: ${added} + ${fs}`)
        return totalEachDirectory(dir, dirs, fs, nextDirs, added)
    }
    else if (dirs[dir].length > 1) {
        // has subdirs
        while (dirs[dir].length > 1) {
            nextDirs.push(dirs[dir][1])
            // console.log(`add next dir: ${nextDirs}`)
            dirs[dir].splice(1, 1)
        }
        return totalEachDirectory(dir, dirs, fs, nextDirs, added)
    }
    else if (nextDirs.length > 0 ) {
        // no more subdir and has next
        let nextDir = nextDirs.shift()
        // console.log(`next dir: ${nextDir}`)
        return totalEachDirectory(nextDir, dirs, fs, nextDirs, added)
    } 
    else if (nextDirs.length == 0) {
        // no next
        return fs
    } else {
        console.log("what hap?")
        return
    }
}

// function totalEachDirectory(dirs, fs=0) {
    // for (let dir in dirs) {
    //     dirTotals[dir] = parseInt(dirs[dir][0])
    //     console.log(dirTotals[dir])
    //     console.log(`${dir} : ${dirTotals[dir]}`)
    //     let length = dirs[dir].length
    //     for (let i = 1; i < length; i++) {
    //         console.log(`subdir: ${dirs[dir][i]}`)
    //         let subdir = dirs[dir][i]   // jeebus
    //         if (subdir == dirs[subdir]) {
    //             temp.push(dir)
    //         }
    //     }
        // console.log(dir)
    // }
    
// }

function printDirectories(dirs) {
    for (let dir in dirs) {
        console.log(`${dir} : ${dirs[dir]}`)
    }
}

/*
sdfds {
    dir : [ filesize, subdir, subdir, subdir ]
}
*/