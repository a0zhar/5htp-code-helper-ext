# 5HTP Code Helper Extension for VS Code

**Author**: [a0zhar](https://github.com/a0zhar)  
**Repository**: [5htp-code-helper-ext](https://github.com/a0zhar/5htp-code-helper-ext)  

## 🚀 Features (4-in-1)

The **5HTP Code Helper** extension enhances low-level programming in VS Code by providing both syntax highlighting and code formatting.<br>
But the features summarized are the following:
- ✅ **Linker Script Syntax Highlighting**
- ✅ **Assembly Code Syntax Highlighting**
- ✅ **Linker Script Formatter**
- ✅ **Assembly Code Formatter**

Everything is enabled out of the box — no extra configuration required.

## 📦 Installation

> **Note**: The extension is still in early development and is not yet published to the VS Code Marketplace.

### Manual Installation:

1. Clone or download this repository
2. Find the `extensions` folder path used by your Visual Studio Code
3. Create a new folder in the `extensions` folder, titled **5htp-code-helper-ext**
4. Copy the files from downloaded repository copy into this folder
5. TADA! Restart VSCode and it should be added

## 🛠️ Usage

### ✨ Syntax Highlighting

- It uses your **currently selected VS Code theme** for coloring, im working on a custom theme. <br>
  it is automatically enabled when you open:
  - `.x`, `.ld`, or GNU linker script files
  - `.s`, `.asm`, or other Assembly source files

### 🧹 Formatting Support

The extension adds **context-aware formatting commands** accessible via:
**Right-click in editor → Choose one of:**
* `5HT: Format Assembly Code`
* `5HT: Format Linker Script`

> These will, at the moment indent the code and format opening curly brackets to not get placed on newline. 
But im working on adding new formatting features, maybe even customizable ones in extension settings.


## 🧩 File Types Recognized

| File Type     | Supported Extensions |
| ------------- | -------------------- |
| Assembly      | `.asm`, `.s`, `.S`   |
| Linker Script | `.ld`, `.x`          |
