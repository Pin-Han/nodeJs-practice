const express = require('express');
const morgan = require('morgan');
//morgan是express預設的日誌中介軟體，也可以脫離express，作為node.js的日誌元件單獨使用。
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
//app.use -> 使所有的request 經過middleware 處理
// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
//(針對不存在的router)all-> 針對全部的method, * ->all
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
// parameter 有err 就代表這是express 錯誤處理
app.use(globalErrorHandler);
module.exports = app;
