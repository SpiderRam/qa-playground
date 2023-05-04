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
    "SINGLE: the date picker format should be 'Month Day', and year should not be selectable in the picker.",
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
  mainTabMultiSelect: ['TODO'],
  mainTabForm: ['TODO'],
  mainTabDataGrid: ['TODO'],
  mainTabDashboard: ['TODO'],
  mainTabSwiper: ['TODO'],
}

export default behaviors
