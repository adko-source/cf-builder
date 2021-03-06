const { setFileName, addTopXml, addBottomXml, addInfo, addMetaField, addRadio, addCheckbox, addNotes, addTextbox, addTable, insertGroupStart, insertGroupEnd, insertPanelStart, insertPanelEnd, addDropdown, addDatePicker, addFutureDatePicker, addNotesWithHistory } = require('./index');

setFileName('Demo Clinical Form');
addTopXml();
insertGroupStart('Group A (Panels)');
insertPanelStart();
addInfo('Some information here');
addMetaField();
addMetaField('Weight');
addMetaField('Height');
addTextbox('My textbox');
addNotes('My notes');
insertPanelEnd();
insertPanelStart();
addDropdown('My list', ['Option 1', 'Option 2', 'Option 3']);
addRadio('My radio', 'list2.txt');
addRadio('Pick an option', ['Issue 1', 'Issue 2', 'Issue 3']);
addDropdown('My list', [1,2,3]);
addTable('My table', [addDropdown('List Column', [5,10,20]), addTextbox('Textbox Column'), addDatePicker('Date Column'), addFutureDatePicker('Future Date Column')]);
addCheckbox('Completed?');
insertPanelEnd();
insertGroupEnd();
insertGroupStart('Group B');
addNotes('Outcome');
insertGroupEnd();
addBottomXml();
