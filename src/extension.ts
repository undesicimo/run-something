import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let runrun = vscode.commands.registerCommand('run-something.runrun', () => {
		//get path of current file
		const activeEditor = vscode.window.activeTextEditor;
		if (!activeEditor) {
			vscode.window.showInformationMessage('No active editor');
			return;
		}
		const currentPath = activeEditor.document.fileName;

		const script = vscode.workspace
			.getConfiguration('run-something')
			.get('script') as string;

		// run script on current file in context
		vscode.window.activeTerminal?.sendText(`${script} ${currentPath}`);
	});

	let runrunexplorer = vscode.commands.registerCommand(
		'run-something.runrunexplorer',
		(uri: vscode.Uri) => {
			const script = vscode.workspace
				.getConfiguration('run-something')
				.get('script') as string;

			// run script on current folder from context
			vscode.window.activeTerminal?.sendText(`${script} ${uri.fsPath}`);
		}
	);

	context.subscriptions.push(runrun, runrunexplorer);
}
export function deactivate() {}
