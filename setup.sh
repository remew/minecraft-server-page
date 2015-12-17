#!/bin/sh -xe

if [ -e "lib" ]; then
	mkdir lib
else
	echo directory lib found.
fi

if [ -e "lib/superagent.js" ]; then
	curl https://wzrd.in/standalone/superagent@latest > lib/superagent.js
else
	echo file lib/superagent.js found.
fi

if [ -e "lib/webcomponents.js" ]; then
	git clone https://github.com/webcomponents/webcomponentsjs.git
	cd webcomponentsjs
	npm install
	gulp build
	cd ..
	cp -R webcomponentsjs/dist/webcomponents.js lib/webcomponents.js
else
	echo file lib/webcomponents.js found.
fi

