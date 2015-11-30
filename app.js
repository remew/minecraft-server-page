(function() {
	'use strict';
	window.addEventListener('load', function() {
		var requireTable = document.getElementById('require-mods');
		var recommendTable = document.getElementById('recommend-mods');
		var request = window.superagent;
		request
			.get('/mods-list.json')
			.set('Accept', 'application/json')
			.end(function(err, res) {
				console.log(JSON.parse(res.text));
				console.log(res.body);
				var length = res.body.required.length;
				var mods = res.body.required;
				for (var i = 0; i < length; i++) {
					var row = createRow(mods[i].name, mods[i].version, mods[i].url);
					requireTable.appendChild(row);
				}
				length = res.body.recommended.length;
				mods = res.body.recommended;
				for (var i = 0; i < length; i++) {
					var row = createRow(mods[i].name, mods[i].version, mods[i].url);
					recommendTable.appendChild(row);
				}
			});
	});
	function createRow(name, version, link) {
		var tr = document.createElement('tr');
		var nameTd = document.createElement('td');
		var versionTd = document.createElement('td');
		var linkTd = document.createElement('td');
		nameTd.innerText = name;
		versionTd.innerText = version;
		var a = document.createElement('a');
		a.setAttribute('href', link);
		a.innerText = 'here';
		linkTd.appendChild(a);
		tr.appendChild(nameTd);
		tr.appendChild(versionTd);
		tr.appendChild(linkTd);
		return tr;
	}
})();
