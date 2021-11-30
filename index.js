;(function () {
	chrome.contextMenus.create({
		title: 'Open With Opener',
		contexts: ['selection'],
		onclick: function (event) {
			chrome.windows.getAll({}, function (windowList) {
				let incognitoWindow = null

				for (let i = windowList.length - 1; i >= 0; i--) {
					if (windowList[i].incognito) {
						incognitoWindow = windowList[i]
						i = -1
					}
				}

				let url = 'https://opener.studio/'
				let selection = event.selectionText.trim().replace(",", "")

				if (isNumeric && selection.length <= 6) {
					url += 'h/' + selection
				} else {
					url += 'search/' + selection
				}

				if (incognitoWindow === null) {
					chrome.windows.create({
						incognito: true,
						state: 'maximized',
						focused: true,
						url: url
					})
				} else {
					chrome.tabs.create({
						windowId: incognitoWindow.id,
						url: url,
						active: true
					})
				}
			})
		},
		visible: true
	})
})()

function isNumeric(str) {
	if (typeof str === 'number') return true
	else if (typeof str !== 'string') return false

	return !isNaN(str) && !isNaN(parseFloat(str))
}
