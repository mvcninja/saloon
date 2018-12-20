const users = [];
const firms = [];
const clients = [];
const returns = [];

const restaurants = [];
const ingredients = [];

let userFailCount = 0;

export default function restApi(server) {
  server.post('/api/user', (req, res, next) => {
    const newUser = req.params;

    if (newUser._failCount && newUser._failCount > userFailCount) {
      userFailCount += 1;
      res.send(500);
      return next();
    }

    newUser.user_id = '123';
    users.push(newUser);

    res.send(201, newUser);
    return next();
  });

  server.post('/api/firm', (req, res, next) => {
    const newFirm = req.params;

    if (!users.find(user => user.user_id === newFirm.user_id)) {
      res.send(400, { error: 'User not found' });
      return next();
    }

    newFirm.firm_id = '321';
    firms.push(newFirm);

    res.send(201, newFirm);
    return next();
  });

  server.post('/api/client', (req, res, next) => {
    const newClient = req.params;

    if (!firms.find(firm => firm.firm_id === newClient.firm_id)) {
      res.send(400, { error: 'Firm not found' });
      return next();
    }

    newClient.client_id = '213';
    clients.push(newClient);

    res.send(201, newClient);
    return next();
  });

  server.post('/api/taxreturn', (req, res, next) => {
    const newReturn = req.params;

    if (!clients.find(client => client.client_id === newReturn.client_id)) {
      res.send(400, { error: 'Client not found' });
      return next();
    }

    newReturn.return_id = '3124';
    returns.push(newReturn);

    res.send(201, newReturn);
    return next();
  });

  server.post('/api/restaurant', (req, res, next) => {
    const newRestaurant = req.params;

    newRestaurant.restaurant_id = '789';
    restaurants.push(newRestaurant);

    res.send(201, newRestaurant);
    return next();
  });

  server.post('/api/ingredient', (req, res, next) => {
    const newIngredient = req.params;

    newIngredient.ingredient_id = '432';
    ingredients.push(newIngredient);

    res.send(201, newIngredient);
    return next();
  });
}
