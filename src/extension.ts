'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
var cp = require("copy-paste");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    let disposable = vscode.commands.registerCommand('extension.lineCut', () => {
        // The code you place here will be executed every time your command is executed
        var start = vscode.window.activeTextEditor.selection.start.line;
        var end = vscode.window.activeTextEditor.selection.end.line;
        
        vscode.window.activeTextEditor.edit((eb)=>{
            var startPos = vscode.window.activeTextEditor.document.lineAt(start).rangeIncludingLineBreak.start; 
            var endPos = vscode.window.activeTextEditor.document.lineAt(end).rangeIncludingLineBreak.end;    
            var text = vscode.window.activeTextEditor.document.getText(new vscode.Range(startPos, endPos));
            cp.copy(text);
            eb.delete(new vscode.Range(startPos, endPos));
        });
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}