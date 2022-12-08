import { readLines } from '../utils/index';

interface DirectoryNode {
	name: string;
	isFile: boolean;
    size: () => number;
}

class File implements DirectoryNode {
    fileSize: number;
    name: string;
    isFile: boolean;
	
	constructor(name: string, size: number) {
        this.name = name;
        this.fileSize = size;
        this.isFile = true;
    }
    
    size = () => {
        return this.fileSize;
    }
}

class Folder implements DirectoryNode {
    children: DirectoryNode[];
    name: string;
    isFile: boolean;
    parentFolder: Folder;
	
	constructor(name: string | null) {
        this.name = name || '';
        this.isFile = false;
        this.children = [];
	}
	
	add = (node: DirectoryNode): void => {
        if (node instanceof Folder) {
            node.parentFolder = this;
        }
		this.children = this.children.concat(node);
    }

    hasChild = (name: string): boolean => {
        return this.children.some(child => child.name === name);
    }
    
    size = () => {
        return this.children 
            ? this.children.map(child => child.size()).reduce((agg, curr) => agg + curr) 
            : 0;
    }

    getPath = () :string => {
        if (!this.parentFolder) {
            return '/';
        }
        let absolutePath = this.parentFolder.getPath();
        if (absolutePath.endsWith('/')) {
            absolutePath = absolutePath.slice(0, absolutePath.length - 1);
        }
        return absolutePath + '/' + this.name;
    }

    listContent = () :string => {
        return this.children
            ? this.children.map(child => {
                if (child.isFile) {
                    return child.name + ' ' + child.size;
                } else {
                    return 'dir ' + child.name;
                }
            }).reduce((agg, curr) => agg + (agg.length !== 0 ? '\n' : '') + curr)
            : '';
    }

    listRecursively = () :Folder[] => {
        return [this, ...this.children.filter(child => child instanceof Folder).reduce((agg, folder) => {
            agg = agg.concat(...(folder as Folder).listRecursively())
            return agg;
        }, [])];
    }
	
}

class Workspace {
    currentDirectory: Folder;
    rootFolder: Folder;
}

interface Command {
    execute: (workspace:Workspace, args: string[]) => { resultingWorkspace: Workspace, commandOutput: string };
}

class ChangeDirectoryCommand implements Command {
    execute = (workspace: Workspace, args: string[]) => {
        if (args.length !== 1) {
            throw new Error('One and only one argument expected for the cd command');
        }
        
        if ('/' === args[0]) {
            workspace.currentDirectory = workspace.rootFolder;
        } else if (args[0] === '..') {
            workspace.currentDirectory = workspace.currentDirectory.parentFolder;
        } else {
            const destinationFolder = workspace.currentDirectory.children.filter(child => !child.isFile && child.name === args[0]);
            if (destinationFolder.length !== 1) {
                throw new Error('Folder does not exist');
            }
            workspace.currentDirectory = destinationFolder[0] as Folder;
        }
        return { resultingWorkspace: workspace, commandOutput: '' };
    }
}

class ListFilesCommand implements Command {
    execute = (workspace: Workspace, args: string[]) => {
        return { resultingWorkspace: workspace, commandOutput: workspace.currentDirectory.listContent() };
    }
}

const COMMAND_LINE_PROMPT = '$ ';

const input = readLines('../inputs/day-07');

let workspace = new Workspace();
workspace.rootFolder = new Folder(null);
workspace.currentDirectory = workspace.rootFolder;

const commands: { [command :string]: Command } = {
    'cd': new ChangeDirectoryCommand(),
    'ls': new ListFilesCommand()
};

let currentLine = 0;
const readLine = () => {
    return input[currentLine++];
}

let line = readLine();

while (currentLine <= input.length) {
    let userPrompt = line.split(' ');
    switch (line.substring(0, 4)) {
        case COMMAND_LINE_PROMPT + 'cd':
            workspace = commands['cd'].execute(workspace, userPrompt.slice(2)).resultingWorkspace;
            line = readLine();
            break;
        case COMMAND_LINE_PROMPT + 'ls':
            line = readLine();
            break;
        default:
            // Output is the result of a command
            while(line && (!line.startsWith(COMMAND_LINE_PROMPT + 'cd') && !line.startsWith(COMMAND_LINE_PROMPT + 'ls'))) {
                userPrompt = line.split(' ');
                if ('dir' === userPrompt[0]) {
                    workspace.currentDirectory.add(new Folder(userPrompt[1]));
                } else {
                    workspace.currentDirectory.add(new File(userPrompt[1], +userPrompt[0]));
                }
                line = readLine();
            }
            break;
    }
}

const everyFolder = workspace.rootFolder.listRecursively();;

console.log(`Day 07 puzzle 1: ${everyFolder.filter(folder => folder.size() < 100000).reduce((agg, curr) => agg + curr.size(), 0)} is the sum of the total sizes of directories under 100000`);

const sizeToReclaim = 30000000 - (70000000 - workspace.rootFolder.size());
const folderToDelete = everyFolder.filter(folder => folder.size() >= sizeToReclaim).sort((f1, f2) => f1.size() - f2.size())[0];
console.log(`Day 07 puzzle 2: you can reclaim ${folderToDelete.size()} by deleting ${folderToDelete.getPath()}`);