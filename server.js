const sslRedirect = require('heroku-ssl-redirect');
const express = require('express');
// const { join } = require('path');
// const { parse } = require('url');
const next = require('next');
const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();

	server.use(sslRedirect());

	const errorHandler = (err, req, res, next) => {
		if (res.headersSent) {
			return next(err);
		}
		const { status } = err;
		res.status(status).json(err);
	};

	server.use(errorHandler);

	server.get('/welcome/profile/:page/:subPage', (req, res) => {
		const { page, subPage } = req.params;
		const slug = subPage ? getSlug(page, subPage) : getSlug(page);
		app.render(req, res, `/welcome`, { slug });
	});

	server.get('/welcome/profile/:page', (req, res) => {
		const slug = getSlug(req.params.page);
		app.render(req, res, `/welcome`, { slug });
	});

	server.get('/welcome/:page', (req, res) => {
		const slug = getSlug(req.params.page);
		app.render(req, res, `/welcome`, { slug });
	});

	server.get('/user/:userId', (req, res) => {
		const { userId } = req.params;
		app.render(req, res, `/home`, { user: userId });
	});

	server.get('/profile/user/:userId', (req, res) => {
		const { userId } = req.params;
		app.render(req, res, '/profile', { user: userId });
	});

	server.get('/profile/:category/user/:userId', (req, res) => {
		const { category, userId } = req.params;
		const slug = category === 'chat' ? 'chats' : category;
		app.render(req, res, '/profile', { slug, user: userId });
	});

	server.get('/profile/:slug', (req, res) => {
		const { slug } = req.params;
		const slugObj = {
			slug: slug === 'chat' ? 'chats' : slug
		};
		app.render(req, res, `/profile`, slugObj);
	});

	server.get('/home/user/:userId', (req, res) => {
		const { userId } = req.params;
		app.render(req, res, '/home', { user: userId });
	});

	server.get('/reset/:token', (req, res) => {
		const { token } = req.params;
		app.render(req, res, '/reset', { token });
	});

	server.get('*', (req, res) => {
		// const parsedUrl = parse(req.url, true);
		// const { pathname } = parsedUrl;
		// // handle GET request to /service-worker.js
		// if (pathname === '/service-worker.js') {
		// 	const filePath = join(__dirname, '.next', pathname);

		// 	app.serveStatic(req, res, filePath);
		// } else {
		return handle(req, res);
		// }
	});

	server.listen(port, err => {
		if (err) throw err;
		console.log(`Listening on http://localhost:${port}`);
	});
});

const getSlug = (page, subPage = null) => {
	if (subPage) {
		page = `${page}/${subPage}`;
	}
	switch (page) {
		case 'getstarted':
			return 0;
		case 'preferences/gender':
			return 5;
		case 'gender':
			return 1;
		case 'preferences/age':
			return 6;
		case 'age':
			return 2;
		case 'location':
			return 3;
		case 'images':
			return 4;
		case 'about':
			return 7;
		case 'interests':
			return 8;
		case 'goPro':
			return 9;
	}
};
