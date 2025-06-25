const vscode = require('vscode');
function activate_asm_formatter(context) {

  const asmDisposable = vscode.commands.registerCommand('asmFormatter.format', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return vscode.window.showErrorMessage('No active editor found.');

    const doc = editor.document;
    if (doc.languageId !== 'asm') {
      return vscode.window.showErrorMessage('This command only works on assembly files.');
    }

    const text = doc.getText();
    const lines = text.split('\n');
    const formattedLines = [];

    // Track indentation states:
    // - indentLabels: true when inside a label block
    // - indentSection: true when inside a section block
    // - indentMacro: true when inside a macro block
    // We will indent lines if any of these are true.
    let indentLabels = false;
    let indentSection = false;
    let indentMacro = false;

    for (const line of lines) {
      const trimmed = line.trim();

      // Detect section start: lines that start with 'section'
      if (/^section\b/.test(trimmed)) {
        // Push section line without indentation
        formattedLines.push(trimmed);
        // From now on, indent all lines below this section until next section or blank line resets it
        indentSection = true;
        indentLabels = false; // reset label indent since section start is a bigger block
        indentMacro = false;
        continue;
      }

      // Detect macro start and end
      if (/^%macro\b/.test(trimmed)) {
        formattedLines.push(trimmed);
        indentMacro = true;  // start indenting macro body
        indentLabels = false;
        indentSection = false;
        continue;
      }
      if (/^%endmacro\b/.test(trimmed)) {
        // macro end line is not indented, and end indenting macro block
        formattedLines.push(trimmed);
        indentMacro = false;
        continue;
      }

      // Detect label lines (e.g. _start:)
      if (/^[^\s].*:$/.test(trimmed)) {
        formattedLines.push(trimmed);
        indentLabels = true;   // start indenting lines under this label
        // keep indentSection and indentMacro as false because label blocks are separate
        indentSection = false;
        indentMacro = false;
        continue;
      }

      // Blank lines:
      // We want to preserve blank lines but decide if indent continues or resets
      if (trimmed === '') {
        formattedLines.push('');
        // Only reset indentSection here (sections end on blank line)
        // But keep indentLabels and indentMacro active across blank lines
        indentSection = false;
        continue;
      }

      // Now for all other lines (non-blank, non-label, non-section, non-macro)
      // indent if we are inside a label, section or macro block
      if (indentLabels || indentSection || indentMacro) {
        formattedLines.push('\t' + trimmed);
      } else {
        // Otherwise, no indent
        formattedLines.push(trimmed);
      }
    }

    const formattedText = formattedLines.join('\n');

    const fullRange = new vscode.Range(
      doc.lineAt(0).range.start,
      doc.lineAt(doc.lineCount - 1).range.end
    );

    editor.edit(editBuilder => {
      editBuilder.replace(fullRange, formattedText);
    });
  });

  context.subscriptions.push(asmDisposable);
}

function activate(context) {
  // Format Linker Scripts
  const linkerDisposable = vscode.commands.registerCommand('5ht_linker_formatter.format', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return vscode.window.showErrorMessage('No active editor found.');

    const doc = editor.document;
    if (doc.languageId !== 'linker-script') {
      return vscode.window.showErrorMessage('This command only works on linker script files.');
    }

    const text = doc.getText();
    const formattedText = text.replace(/\n(\s*)\{/g, ' {');

    const fullRange = new vscode.Range(
      doc.lineAt(0).range.start,
      doc.lineAt(doc.lineCount - 1).range.end
    );

    editor.edit(editBuilder => {
      editBuilder.replace(fullRange, formattedText);
    });
  });
activate_asm_formatter(context);
}

function deactivate() { }

module.exports = {
  activate,
  deactivate
};
