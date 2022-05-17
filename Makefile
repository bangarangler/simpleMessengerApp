install:
	cd backend && npm install && cd ../frontend && npm install && cd ../

startBE:
	cd backend && npm run dev && npm start

startFE:
	cd frontend && npm start
