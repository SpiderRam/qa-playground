const behaviors = {
  mainTabTextFieldAndList: [
    'List items will not survive page reload.',
    'Buttons in the text field will be disabled if field is empty, and enabled when there is a value.',
    'After clicking either text field icon, the field should retain focus.',
    'When an item is added, it will appear at the top of the list.',
    'Clicking the trash icon on any list item should delete that item.',
    'On mobile screens, the text field should stack over the item list.',
  ],
  mainTabDates: [
    'On page load, the \'SINGLE\' view should be selected, and the tab title should read "On this day in history....".',
    "SINGLE: the date picker format should be '<Month> <day>', and year should not be selectable in the picker.",
    'SINGLE: for any given date, cards should render, and for each the year should appear as the header, followed by a brief summary of an event, and each card when clicked should open a new tab linked to the relevant Wikipedia page.',
    'SINGLE: when a date is selected, while the data is loading, a spinner should appear pending new cards.',
    'When the user clicks the \'RANGE\' button, the title should change to "Dates within dates" and the view should update.',
    'RANGE: default date/time of the start picker should be today (12:00 am).',
    'RANGE: default date/time of the end picker should be one week from today (11:59 pm).',
    'RANGE: the ranged picker should have all dates outside of the selected range disabled.',
    'RANGE: if the ranged picker has a value and the range is changed to exclude the selected date, the field should display error styling.',
    "RANGE: clicking the 'CLEAR ALL' button should remove values from all fields.",
    'RANGE: the individual field clear buttons should be disabled in any field with no value.',
  ],
  mainTabMultiSelect: [
    'On page load, the autocomplete field should be disabled and have label "Loading...." until data populates.',
    'When the autocomplete enables, the label should change to "Dog breeds".',
    'Clicking in the field should open a dropdown with options prepended by checkboxes.',
    'Typing in the field should also open the dropdown, and filter results as the user types.',
    'When an option is selected, the dropdown should remain open.',
    'When an option is selected, the selected option should appear in the field as a chip, and the checkbox should update to checked.',
    'When an option is selected, the selected option should appear in the now-visible accordion.',
    'When five options have been selected, all except those five should be disabled in the dropdown.',
    'When five options have been selected, chips in the field should not be disabled.',
    'A user should be able to remove an item by clicking the checkbox again, or clicking the "x" in the chip, regardless of list length.',
    'Once the list has been reduced from five to less than five, all list items should reenable and the user should be able to add to the list again.',
    'The accordion elements should display the breed name as the title, prepended by a paw icon.',
    'When expanded, the accordion should contain a random image of that breed.',
    'NOTE: the dog breeds API is fun and free, but does sometimes return a bad image src url.',
  ],
  mainTabForm: ['TODO'],
  mainTabDataGrid: ['TODO'],
  mainTabDashboard: ['TODO'],
  mainTabSwiper: ['TODO'],
}

export default behaviors
