"use strict";

const logoutButton = new LogoutButton();

logoutButton.action = () =>
  ApiConnector.logout((callback) => {
    if (callback.success) {
      location.reload();
    }
  });

ApiConnector.current((callback) => {
  if (callback.success) {
    ProfileWidget.showProfile(callback.data);
  }
});

const ratesBoard = new RatesBoard();

setInterval(
  () =>
    ApiConnector.getStocks((callback) => {
      if (callback.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(callback.data);
      }
    }),
  60000
);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) =>
  ApiConnector.addMoney(data, (callback) => {
    if (callback.success) {
      ProfileWidget.showProfile(callback.data);
      moneyManager.setMessage(callback.success, alert("Пополнение успешно"));
      moneyManager.addMoneyAction(callback.success);

      console.log(moneyManager);
    }
  });

moneyManager.conversionMoneyCallback = (data) =>
  ApiConnector.convertMoney(data, (callback) => {
    if (callback.success) {
      ProfileWidget.showProfile(callback.data);
      moneyManager.setMessage(callback.success, alert("Пополнение успешно"));
      moneyManager.conversionMoneyAction(callback.success);
      console.log(callback);
    }
  });

moneyManager.sendMoneyCallback = (data) =>
  ApiConnector.transferMoney(data, (callback) => {
    if (callback.success) {
      ProfileWidget.showProfile(callback.data);
      moneyManager.setMessage(callback.success, alert("Пополнение успешно"));
      moneyManager.sendMoneyAction(callback.success);
      console.log(callback);
    }
  });

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((callback) => {
  if (callback.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(callback.data);
    favoritesWidget.getData(callback.data);
  }
});

favoritesWidget.addUserCallback = (data) =>
  ApiConnector.addUserToFavorites(data, (callback) => {
    if (callback.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(callback.data);
      favoritesWidget.getData(callback.data);
      favoritesWidget.setMessage(
        callback.success,
        alert("Пользователь успешно добавлен в список избранного")
      );
    }
  });

favoritesWidget.removeUserCallback = (data) =>
  ApiConnector.removeUserFromFavorites(data, (callback) => {
    if (callback.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(callback.data);
      favoritesWidget.getData(callback.data);
      favoritesWidget.setMessage(
        callback.success,
        alert("Пользователь удален из списка избранного")
      );
    }
  });
