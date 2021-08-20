const codes = new Set();
const fs = require('fs');
let file;
let prefix = '';

function setFileName(title) {
    file = fs.createWriteStream(__dirname + `/${title}.xml`); // Reset file first if it already exists
    file = fs.createWriteStream(__dirname + `/${title}.xml`, {
        'flags': 'a',
        'encoding': 'utf8',     
    });
    prefix = createPrefix(title);
    return;
};

function addTopXml() {
    let content = `<?xml version="1.0" encoding="UTF-8"?>
    <form tag="cons" key="form">`;
    file.write(content + '\r\n', (error) => {
        if(error) {
        return console.log(error.message)
        };
    });
    return;
};

function insertGroupStart(label) {
    let content = `<group label="${label}">`;
    file.write(content + '\r\n', (error) => {
        if(error) {
        return console.log(error.message)
        };
    });
    return;
};

function insertGroupEnd() {
    let content = `</group>`;
    file.write(content + '\r\n', (error) => {
        if(error) {
        return console.log(error.message)
        };
    });
    return;
};

function insertPanelStart(width="500") {
    let content = `<panel class="ClinicalFormColumn" width="${width}">`;
    file.write(content + '\r\n', (error) => {
        if(error) {
        return console.log(error.message)
        };
    });
    return;
};

function insertPanelEnd() {
    let content = `</panel>`;
    file.write(content + '\r\n', (error) => {
        if(error) {
        return console.log(error.message)
        };
    });
    return;
};

function addInfo(message) {
    let content = `<info>${message}</info>`;
    file.write(content + '\r\n', (error) => {
        if(error) {
        return console.log(error.message)
        };
    });
    return this;
};
    
function addTextbox(label, tag="cons", global=false) {
    // Create unique code
    let code = generateCode();
    codes.add(code);
    let content = !global
        ? `<textbox label="${label}" code="${code}" key="${code}" global="false" tag="${tag}" />`
        : `<textbox label="${label}" code="${code}" key="${code}" global="true" tag="${tag}" />`;
    file.write(content + '\r\n', (error) => {
        if(error) {
        return console.log(error.message)
        };
    });
    return content;
};
    
function addDropdown(label, list, tag="cons", global=false) {
    let list_items = generateListItems(',', list);
    // Create unique code
    let code = generateCode();
    codes.add(code);
    let content = !global
        ? `<list label="${label}" code="${code}" key="${code}" global="false" tag="${tag}">
            <item></item>
            ${list_items}
        </list>`
        : `<textbox label="${label}" code="${code}" key="${code}" global="true" tag="${tag}" />`;
    file.write(content + '\r\n', (error) => {
        if(error) {
        return console.log(error.message)
        };
    });
    return content;
};
    
function addNotes(label, tag="cons", global=false) {
    // Create unique code
    let code = generateCode();
    codes.add(code);
    let content = !global
        ? `<notes label="${label}" code="${code}" key="${code}" global="false" tag="${tag}" />`
        : `<notes label="${label}" code="${code}" key="${code}" global="true" tag="${tag}" />`;
    file.write(content + '\r\n', (error) => {
        if(error) {
        return console.log(error.message)
        };
    });
    return content;
};

function addMetaField(label) {
    // Create unique code
    let code = generateCode();
    codes.add(code);
    let content = label 
        ? `<metafield label="${label}" />`
        : `<metafields />`;
    file.write(content + '\r\n', (error) => {
        if(error) {
        return console.log(error.message)
        };
    });
    return;
};
   
function addRadio(label, list, tag="cons", global=false) {
    let list_items = generateListItems(',', list);
    // Create unique code
    let code = generateCode();
    codes.add(code);
    let content = !global
        ? `<radio label="${label}" code="${code}" key="${code}" global="false" tag="${tag}">
            <item></item>
            ${list_items}
        </radio>`
        : `<radio label="${label}" code="${code}" key="${code}" global="true" tag="${tag}">
        <item></item>
        ${list_items}
        </radio>`;
    file.write(content + '\r\n', (error) => {
        if(error) {
        return console.log(error.message)
        };
    });
    return content;
};
    
function addCheckbox(label, tag="cons", global=false) {
    // Create unique code
    let code = generateCode();
    codes.add(code);
    let content = !global
        ? `<check label="${label}" code="${code}" key="${code}" global="false" tag="${tag}" />`
        : `<check label="${label}" code="${code}" key="${code}" global="true" tag="${tag}" />`;
    file.write(content + '\r\n', (error) => {
        if(error) {
        return console.log(error.message)
        };
    });
    return content;
};

function addDatePicker(label, tag="cons", global=false) {
    // Create unique code
    let code = generateCode();
    codes.add(code);
    let content = !global
        ? `<date label="${label}" code="${code}" key="${code}" global="false" tag="${tag}" />`
        : `<date label="${label}" code="${code}" key="${code}" global="true" tag="${tag}" />`;
    file.write(content + '\r\n', (error) => {
        if(error) {
        return console.log(error.message)
        };
    });
    return content;
};

function addFutureDatePicker(label, tag="cons", global=false) {
    // Create unique code
    let code = generateCode();
    codes.add(code);
    let content = !global
        ? `<future_date label="${label}" code="${code}" key="${code}" global="false" tag="${tag}" />`
        : `<future_date label="${label}" code="${code}" key="${code}" global="true" tag="${tag}" />`;
    file.write(content + '\r\n', (error) => {
        if(error) {
        return console.log(error.message)
        };
    });
    return content;
};

function addNotesWithHistory(label, tag="cons", global=false) {
    // Create unique code
    let code = generateCode();
    codes.add(code);
    let content = !global
        ? `<notes_with_history label="${label}" code="${code}" key="${code}" global="false" tag="${tag}" />`
        : `<notes_with_history label="${label}" code="${code}" key="${code}" global="true" tag="${tag}" />`;
    file.write(content + '\r\n', (error) => {
        if(error) {
        return console.log(error.message)
        };
    });
    return content;
};
    
function addTable(label, cols, tag="cons", global=false) {
    if(typeof cols !== 'object') {
        return console.log('second argument should be an array of columns to be added [addDropdown("label", [1,2,3])]')
    };
    // Create unique code
    let code = generateCode();
    codes.add(code);
    let columns = generateTableCols(cols);
    let content = !global
        ? `<table label="${label}" code="${code}" key="${code}" global="false" tag="${tag}">
        ${columns}
        </table>`
        : `<table label="${label}" code="${code}" key="${code}" global="true" tag="${tag}">
        </table>`;
    file.write(content + '\r\n', (error) => {
        if(error) {
        return console.log(error.message)
        };
    });
    return;
};
    
function addBottomXml() {
    let content = `
    <group label="Actions">
    <button label="Refer Patient" action="Refer"/>
    <button label="Assign Task" action="AssignTask"/>
    <button label="Document" action="Print"/>
    <button label="End Appointment" action="Discharge"/>
    </group>
    </form>`;
    file.write(content + '\r\n', (error) => {
        if(error) {
        return console.log(error.message)
        };
    });
    return;
};

function createPrefix(title) {
    let filename = title.split(' ');
    for(x in filename) {
        prefix = prefix + filename[x][0];
    };
    return prefix.toLowerCase();
};

function generateCode() {
    let code;
    do {
        code = Math.floor(Math.random() * 90000 + 5000).toString();
    } while (codes.has(code));
    return code;
};

function generateListItems(seperator, items) {
    let list = ``;
    let content_arr;
    let list_items = [];
    // Function accepts a file of comma separated vals
    if(typeof items === 'string') {
        let content = fs.readFileSync(__dirname + `/${items}`, 'utf8');
        content_arr = content.split(seperator);
    }
    else { // or an array
        content_arr = items;
    };
    content_arr.forEach((value) => {
        let code = generateCode();
        let li = `<item code="${code}" key="${code}">${value.toString().trim()}</item>`;
        list_items.push(li);
    });
    for(item in list_items) {
        list += list_items[item] + '\r\n';
    };
    return list;
}

function generateTableCols(cols) {
    let list = ``;
    cols.forEach(value => {
        list += value;
    })
    return list;
}

module.exports = {
    setFileName: setFileName,
    addTopXml: addTopXml,
    addBottomXml: addBottomXml,
    insertGroupStart: insertGroupStart,
    insertGroupEnd: insertGroupEnd,
    insertPanelStart: insertPanelStart,
    insertPanelEnd: insertPanelEnd,
    addInfo: addInfo,
    addMetaField: addMetaField,
    addCheckbox: addCheckbox,
    addNotes: addNotes,
    addRadio: addRadio,
    addTable: addTable,
    addTextbox: addTextbox,
    addNotes: addNotes,
    addDropdown: addDropdown,
    addDatePicker: addDatePicker,
    addFutureDatePicker: addFutureDatePicker,
    addNotesWithHistory: addNotesWithHistory
}