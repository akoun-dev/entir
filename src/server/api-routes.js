'use strict';

const express = require('express');
const router = express.Router();
const { User, Group, Parameter, Currency, Country, Language, DateFormat, NumberFormat, TimeFormat, Translation, Sequelize } = require('../models');
const bcrypt = require('bcrypt');
const { Op } = Sequelize;

// Middleware pour gérer les erreurs
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Routes pour les utilisateurs
router.get('/users', asyncHandler(async (req, res) => {
  const users = await User.findAll({
    include: [{ model: Group }]
  });

  // Transformer les données pour correspondre à l'interface User du frontend
  const transformedUsers = users.map(user => ({
    id: user.id.toString(),
    username: user.username,
    email: user.email,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    role: user.role,
    status: user.status,
    lastLogin: user.lastLogin ? user.lastLogin.toISOString() : null,
    groups: user.Groups ? user.Groups.map(group => group.name) : []
  }));

  res.json(transformedUsers);
}));

router.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: [{ model: Group }]
  });

  if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }

  // Transformer les données
  const transformedUser = {
    id: user.id.toString(),
    username: user.username,
    email: user.email,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    role: user.role,
    status: user.status,
    lastLogin: user.lastLogin ? user.lastLogin.toISOString() : null,
    groups: user.Groups ? user.Groups.map(group => group.name) : []
  };

  res.json(transformedUser);
}));

router.post('/users', asyncHandler(async (req, res) => {
  const { username, email, password, firstName, lastName, role, status, groups } = req.body;

  // Hacher le mot de passe
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Créer l'utilisateur
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    firstName,
    lastName,
    role: role || 'user',
    status: status || 'active'
  });

  // Associer les groupes si spécifiés
  if (groups && groups.length > 0) {
    const groupsToAssociate = await Group.findAll({
      where: { name: groups }
    });
    await user.setGroups(groupsToAssociate);
  }

  // Récupérer l'utilisateur avec ses groupes
  const createdUser = await User.findByPk(user.id, {
    include: [{ model: Group }]
  });

  // Transformer les données
  const transformedUser = {
    id: createdUser.id.toString(),
    username: createdUser.username,
    email: createdUser.email,
    firstName: createdUser.firstName || '',
    lastName: createdUser.lastName || '',
    role: createdUser.role,
    status: createdUser.status,
    lastLogin: createdUser.lastLogin ? createdUser.lastLogin.toISOString() : null,
    groups: createdUser.Groups ? createdUser.Groups.map(group => group.name) : []
  };

  res.status(201).json(transformedUser);
}));

router.put('/users/:id', asyncHandler(async (req, res) => {
  const { username, email, password, firstName, lastName, role, status, groups } = req.body;

  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }

  // Mettre à jour les champs
  if (username) user.username = username;
  if (email) user.email = email;
  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (role) user.role = role;
  if (status) user.status = status;

  // Mettre à jour le mot de passe si fourni
  if (password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  }

  await user.save();

  // Mettre à jour les groupes si spécifiés
  if (groups) {
    const groupsToAssociate = await Group.findAll({
      where: { name: groups }
    });
    await user.setGroups(groupsToAssociate);
  }

  // Récupérer l'utilisateur mis à jour avec ses groupes
  const updatedUser = await User.findByPk(user.id, {
    include: [{ model: Group }]
  });

  // Transformer les données
  const transformedUser = {
    id: updatedUser.id.toString(),
    username: updatedUser.username,
    email: updatedUser.email,
    firstName: updatedUser.firstName || '',
    lastName: updatedUser.lastName || '',
    role: updatedUser.role,
    status: updatedUser.status,
    lastLogin: updatedUser.lastLogin ? updatedUser.lastLogin.toISOString() : null,
    groups: updatedUser.Groups ? updatedUser.Groups.map(group => group.name) : []
  };

  res.json(transformedUser);
}));

router.delete('/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }

  await user.destroy();
  res.status(204).end();
}));

router.patch('/users/:id/status', asyncHandler(async (req, res) => {
  const { status } = req.body;

  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }

  user.status = status;
  await user.save();

  // Récupérer l'utilisateur mis à jour avec ses groupes
  const updatedUser = await User.findByPk(user.id, {
    include: [{ model: Group }]
  });

  // Transformer les données
  const transformedUser = {
    id: updatedUser.id.toString(),
    username: updatedUser.username,
    email: updatedUser.email,
    firstName: updatedUser.firstName || '',
    lastName: updatedUser.lastName || '',
    role: updatedUser.role,
    status: updatedUser.status,
    lastLogin: updatedUser.lastLogin ? updatedUser.lastLogin.toISOString() : null,
    groups: updatedUser.Groups ? updatedUser.Groups.map(group => group.name) : []
  };

  res.json(transformedUser);
}));

// Routes pour les groupes
router.get('/groups', asyncHandler(async (req, res) => {
  const groups = await Group.findAll({
    include: [{ model: User }]
  });

  // Transformer les données pour correspondre à l'interface Group du frontend
  const transformedGroups = groups.map(group => ({
    id: group.id.toString(),
    name: group.name,
    description: group.description || '',
    permissions: group.permissions || [],
    active: group.active,
    memberCount: group.Users ? group.Users.length : 0
  }));

  res.json(transformedGroups);
}));

router.get('/groups/:id', asyncHandler(async (req, res) => {
  const group = await Group.findByPk(req.params.id, {
    include: [{ model: User }]
  });

  if (!group) {
    return res.status(404).json({ message: 'Groupe non trouvé' });
  }

  // Transformer les données
  const transformedGroup = {
    id: group.id.toString(),
    name: group.name,
    description: group.description || '',
    permissions: group.permissions || [],
    active: group.active,
    memberCount: group.Users ? group.Users.length : 0
  };

  res.json(transformedGroup);
}));

router.post('/groups', asyncHandler(async (req, res) => {
  const { name, description, permissions, active } = req.body;

  // Créer le groupe
  const group = await Group.create({
    name,
    description,
    permissions: permissions || [],
    active: active !== undefined ? active : true
  });

  // Transformer les données
  const transformedGroup = {
    id: group.id.toString(),
    name: group.name,
    description: group.description || '',
    permissions: group.permissions || [],
    active: group.active,
    memberCount: 0
  };

  res.status(201).json(transformedGroup);
}));

router.put('/groups/:id', asyncHandler(async (req, res) => {
  const { name, description, permissions, active } = req.body;

  const group = await Group.findByPk(req.params.id);
  if (!group) {
    return res.status(404).json({ message: 'Groupe non trouvé' });
  }

  // Mettre à jour les champs
  if (name) group.name = name;
  if (description !== undefined) group.description = description;
  if (permissions) group.permissions = permissions;
  if (active !== undefined) group.active = active;

  await group.save();

  // Récupérer le groupe mis à jour avec ses utilisateurs
  const updatedGroup = await Group.findByPk(group.id, {
    include: [{ model: User }]
  });

  // Transformer les données
  const transformedGroup = {
    id: updatedGroup.id.toString(),
    name: updatedGroup.name,
    description: updatedGroup.description || '',
    permissions: updatedGroup.permissions || [],
    active: updatedGroup.active,
    memberCount: updatedGroup.Users ? updatedGroup.Users.length : 0
  };

  res.json(transformedGroup);
}));

router.delete('/groups/:id', asyncHandler(async (req, res) => {
  const group = await Group.findByPk(req.params.id);
  if (!group) {
    return res.status(404).json({ message: 'Groupe non trouvé' });
  }

  await group.destroy();
  res.status(204).end();
}));

// Routes pour les paramètres
router.get('/parameters', asyncHandler(async (req, res) => {
  const parameters = await Parameter.findAll();

  // Transformer les données
  const transformedParameters = parameters.map(param => ({
    id: param.id.toString(),
    key: param.key,
    value: param.value,
    category: param.category,
    description: param.description || ''
  }));

  res.json(transformedParameters);
}));

router.get('/parameters/category/:category', asyncHandler(async (req, res) => {
  const parameters = await Parameter.findAll({
    where: { category: req.params.category }
  });

  // Transformer les données
  const transformedParameters = parameters.map(param => ({
    id: param.id.toString(),
    key: param.key,
    value: param.value,
    category: param.category,
    description: param.description || ''
  }));

  res.json(transformedParameters);
}));

router.get('/parameters/key/:key', asyncHandler(async (req, res) => {
  const parameter = await Parameter.findOne({
    where: { key: req.params.key }
  });

  if (!parameter) {
    return res.status(404).json({ message: 'Paramètre non trouvé' });
  }

  // Transformer les données
  const transformedParameter = {
    id: parameter.id.toString(),
    key: parameter.key,
    value: parameter.value,
    category: parameter.category,
    description: parameter.description || ''
  };

  res.json(transformedParameter);
}));

router.put('/parameters/key/:key', asyncHandler(async (req, res) => {
  const { value } = req.body;

  const parameter = await Parameter.findOne({
    where: { key: req.params.key }
  });

  if (!parameter) {
    return res.status(404).json({ message: 'Paramètre non trouvé' });
  }

  parameter.value = value;
  await parameter.save();

  // Transformer les données
  const transformedParameter = {
    id: parameter.id.toString(),
    key: parameter.key,
    value: parameter.value,
    category: parameter.category,
    description: parameter.description || ''
  };

  res.json(transformedParameter);
}));

router.put('/parameters/batch', asyncHandler(async (req, res) => {
  const { parameters } = req.body;

  const updatedParameters = [];

  for (const param of parameters) {
    const parameter = await Parameter.findOne({
      where: { key: param.key }
    });

    if (parameter) {
      parameter.value = param.value;
      await parameter.save();

      updatedParameters.push({
        id: parameter.id.toString(),
        key: parameter.key,
        value: parameter.value,
        category: parameter.category,
        description: parameter.description || ''
      });
    }
  }

  res.json(updatedParameters);
}));

// Routes pour les devises
router.get('/currencies', asyncHandler(async (req, res) => {
  const currencies = await Currency.findAll();

  // Transformer les données
  const transformedCurrencies = currencies.map(currency => ({
    id: currency.id.toString(),
    name: currency.name,
    symbol: currency.symbol,
    code: currency.code,
    rate: currency.rate,
    position: currency.position,
    decimal_places: currency.decimal_places,
    rounding: currency.rounding,
    active: currency.active
  }));

  res.json(transformedCurrencies);
}));

router.get('/currencies/:id', asyncHandler(async (req, res) => {
  const currency = await Currency.findByPk(req.params.id);

  if (!currency) {
    return res.status(404).json({ message: 'Devise non trouvée' });
  }

  // Transformer les données
  const transformedCurrency = {
    id: currency.id.toString(),
    name: currency.name,
    symbol: currency.symbol,
    code: currency.code,
    rate: currency.rate,
    position: currency.position,
    decimal_places: currency.decimal_places,
    rounding: currency.rounding,
    active: currency.active
  };

  res.json(transformedCurrency);
}));

router.post('/currencies', asyncHandler(async (req, res) => {
  const { name, symbol, code, rate, position, decimal_places, rounding, active } = req.body;

  // Vérifier si la devise existe déjà
  const existingCurrency = await Currency.findOne({
    where: { code }
  });

  if (existingCurrency) {
    return res.status(400).json({ message: 'Une devise avec ce code existe déjà' });
  }

  // Créer la devise
  const currency = await Currency.create({
    name,
    symbol,
    code,
    rate: parseFloat(rate),
    position,
    decimal_places: parseInt(decimal_places),
    rounding: parseFloat(rounding),
    active: active !== undefined ? active : true
  });

  // Transformer les données
  const transformedCurrency = {
    id: currency.id.toString(),
    name: currency.name,
    symbol: currency.symbol,
    code: currency.code,
    rate: currency.rate,
    position: currency.position,
    decimal_places: currency.decimal_places,
    rounding: currency.rounding,
    active: currency.active
  };

  res.status(201).json(transformedCurrency);
}));

router.put('/currencies/:id', asyncHandler(async (req, res) => {
  const { name, symbol, code, rate, position, decimal_places, rounding, active } = req.body;

  const currency = await Currency.findByPk(req.params.id);
  if (!currency) {
    return res.status(404).json({ message: 'Devise non trouvée' });
  }

  // Vérifier si le code est déjà utilisé par une autre devise
  if (code && code !== currency.code) {
    const existingCurrency = await Currency.findOne({
      where: { code }
    });

    if (existingCurrency) {
      return res.status(400).json({ message: 'Une devise avec ce code existe déjà' });
    }
  }

  // Mettre à jour les champs
  if (name) currency.name = name;
  if (symbol) currency.symbol = symbol;
  if (code) currency.code = code;
  if (rate !== undefined) currency.rate = parseFloat(rate);
  if (position) currency.position = position;
  if (decimal_places !== undefined) currency.decimal_places = parseInt(decimal_places);
  if (rounding !== undefined) currency.rounding = parseFloat(rounding);
  if (active !== undefined) currency.active = active;

  await currency.save();

  // Transformer les données
  const transformedCurrency = {
    id: currency.id.toString(),
    name: currency.name,
    symbol: currency.symbol,
    code: currency.code,
    rate: currency.rate,
    position: currency.position,
    decimal_places: currency.decimal_places,
    rounding: currency.rounding,
    active: currency.active
  };

  res.json(transformedCurrency);
}));

router.delete('/currencies/:id', asyncHandler(async (req, res) => {
  const currency = await Currency.findByPk(req.params.id);
  if (!currency) {
    return res.status(404).json({ message: 'Devise non trouvée' });
  }

  await currency.destroy();
  res.status(204).end();
}));

router.patch('/currencies/:id/toggle-status', asyncHandler(async (req, res) => {
  const currency = await Currency.findByPk(req.params.id);
  if (!currency) {
    return res.status(404).json({ message: 'Devise non trouvée' });
  }

  currency.active = !currency.active;
  await currency.save();

  // Transformer les données
  const transformedCurrency = {
    id: currency.id.toString(),
    name: currency.name,
    symbol: currency.symbol,
    code: currency.code,
    rate: currency.rate,
    position: currency.position,
    decimal_places: currency.decimal_places,
    rounding: currency.rounding,
    active: currency.active
  };

  res.json(transformedCurrency);
}));

// Routes pour les pays
router.get('/countries', asyncHandler(async (req, res) => {
  const countries = await Country.findAll();

  // Transformer les données
  const transformedCountries = countries.map(country => ({
    id: country.id.toString(),
    name: country.name,
    code: country.code,
    phone_code: country.phone_code,
    currency_code: country.currency_code,
    region: country.region,
    active: country.active
  }));

  res.json(transformedCountries);
}));

router.get('/countries/:id', asyncHandler(async (req, res) => {
  const country = await Country.findByPk(req.params.id);

  if (!country) {
    return res.status(404).json({ message: 'Pays non trouvé' });
  }

  // Transformer les données
  const transformedCountry = {
    id: country.id.toString(),
    name: country.name,
    code: country.code,
    phone_code: country.phone_code,
    currency_code: country.currency_code,
    region: country.region,
    active: country.active
  };

  res.json(transformedCountry);
}));

router.post('/countries', asyncHandler(async (req, res) => {
  const { name, code, phone_code, currency_code, region, active } = req.body;

  // Vérifier si le pays existe déjà
  const existingCountry = await Country.findOne({
    where: { code }
  });

  if (existingCountry) {
    return res.status(400).json({ message: 'Un pays avec ce code existe déjà' });
  }

  // Créer le pays
  const country = await Country.create({
    name,
    code,
    phone_code,
    currency_code,
    region,
    active: active !== undefined ? active : true
  });

  // Transformer les données
  const transformedCountry = {
    id: country.id.toString(),
    name: country.name,
    code: country.code,
    phone_code: country.phone_code,
    currency_code: country.currency_code,
    region: country.region,
    active: country.active
  };

  res.status(201).json(transformedCountry);
}));

router.put('/countries/:id', asyncHandler(async (req, res) => {
  const { name, code, phone_code, currency_code, region, active } = req.body;

  const country = await Country.findByPk(req.params.id);
  if (!country) {
    return res.status(404).json({ message: 'Pays non trouvé' });
  }

  // Vérifier si le code est déjà utilisé par un autre pays
  if (code && code !== country.code) {
    const existingCountry = await Country.findOne({
      where: { code }
    });

    if (existingCountry) {
      return res.status(400).json({ message: 'Un pays avec ce code existe déjà' });
    }
  }

  // Mettre à jour les champs
  if (name) country.name = name;
  if (code) country.code = code;
  if (phone_code !== undefined) country.phone_code = phone_code;
  if (currency_code !== undefined) country.currency_code = currency_code;
  if (region !== undefined) country.region = region;
  if (active !== undefined) country.active = active;

  await country.save();

  // Transformer les données
  const transformedCountry = {
    id: country.id.toString(),
    name: country.name,
    code: country.code,
    phone_code: country.phone_code,
    currency_code: country.currency_code,
    region: country.region,
    active: country.active
  };

  res.json(transformedCountry);
}));

router.delete('/countries/:id', asyncHandler(async (req, res) => {
  const country = await Country.findByPk(req.params.id);
  if (!country) {
    return res.status(404).json({ message: 'Pays non trouvé' });
  }

  await country.destroy();
  res.status(204).end();
}));

router.patch('/countries/:id/toggle-status', asyncHandler(async (req, res) => {
  const country = await Country.findByPk(req.params.id);
  if (!country) {
    return res.status(404).json({ message: 'Pays non trouvé' });
  }

  country.active = !country.active;
  await country.save();

  // Transformer les données
  const transformedCountry = {
    id: country.id.toString(),
    name: country.name,
    code: country.code,
    phone_code: country.phone_code,
    currency_code: country.currency_code,
    region: country.region,
    active: country.active
  };

  res.json(transformedCountry);
}));

// Routes pour les langues
router.get('/languages', asyncHandler(async (req, res) => {
  const languages = await Language.findAll();

  // Transformer les données
  const transformedLanguages = languages.map(language => ({
    id: language.id.toString(),
    name: language.name,
    code: language.code,
    native_name: language.native_name,
    direction: language.direction,
    is_default: language.is_default,
    active: language.active
  }));

  res.json(transformedLanguages);
}));

router.get('/languages/:id', asyncHandler(async (req, res) => {
  const language = await Language.findByPk(req.params.id);

  if (!language) {
    return res.status(404).json({ message: 'Langue non trouvée' });
  }

  // Transformer les données
  const transformedLanguage = {
    id: language.id.toString(),
    name: language.name,
    code: language.code,
    native_name: language.native_name,
    direction: language.direction,
    is_default: language.is_default,
    active: language.active
  };

  res.json(transformedLanguage);
}));

router.post('/languages', asyncHandler(async (req, res) => {
  const { name, code, native_name, direction, is_default, active } = req.body;

  // Vérifier si la langue existe déjà
  const existingLanguage = await Language.findOne({
    where: { code }
  });

  if (existingLanguage) {
    return res.status(400).json({ message: 'Une langue avec ce code existe déjà' });
  }

  // Si cette langue est définie comme langue par défaut, désactiver les autres langues par défaut
  if (is_default) {
    await Language.update(
      { is_default: false },
      { where: { is_default: true } }
    );
  }

  // Créer la langue
  const language = await Language.create({
    name,
    code,
    native_name,
    direction: direction || 'ltr',
    is_default: is_default !== undefined ? is_default : false,
    active: active !== undefined ? active : true
  });

  // Transformer les données
  const transformedLanguage = {
    id: language.id.toString(),
    name: language.name,
    code: language.code,
    native_name: language.native_name,
    direction: language.direction,
    is_default: language.is_default,
    active: language.active
  };

  res.status(201).json(transformedLanguage);
}));

router.put('/languages/:id', asyncHandler(async (req, res) => {
  const { name, code, native_name, direction, is_default, active } = req.body;

  const language = await Language.findByPk(req.params.id);
  if (!language) {
    return res.status(404).json({ message: 'Langue non trouvée' });
  }

  // Vérifier si le code est déjà utilisé par une autre langue
  if (code && code !== language.code) {
    const existingLanguage = await Language.findOne({
      where: { code }
    });

    if (existingLanguage) {
      return res.status(400).json({ message: 'Une langue avec ce code existe déjà' });
    }
  }

  // Si cette langue est définie comme langue par défaut, désactiver les autres langues par défaut
  if (is_default && !language.is_default) {
    await Language.update(
      { is_default: false },
      { where: { is_default: true } }
    );
  }

  // Mettre à jour les champs
  if (name) language.name = name;
  if (code) language.code = code;
  if (native_name !== undefined) language.native_name = native_name;
  if (direction) language.direction = direction;
  if (is_default !== undefined) language.is_default = is_default;
  if (active !== undefined) language.active = active;

  await language.save();

  // Transformer les données
  const transformedLanguage = {
    id: language.id.toString(),
    name: language.name,
    code: language.code,
    native_name: language.native_name,
    direction: language.direction,
    is_default: language.is_default,
    active: language.active
  };

  res.json(transformedLanguage);
}));

router.delete('/languages/:id', asyncHandler(async (req, res) => {
  const language = await Language.findByPk(req.params.id);
  if (!language) {
    return res.status(404).json({ message: 'Langue non trouvée' });
  }

  // Empêcher la suppression de la langue par défaut
  if (language.is_default) {
    return res.status(400).json({ message: 'Impossible de supprimer la langue par défaut' });
  }

  await language.destroy();
  res.status(204).end();
}));

router.patch('/languages/:id/toggle-status', asyncHandler(async (req, res) => {
  const language = await Language.findByPk(req.params.id);
  if (!language) {
    return res.status(404).json({ message: 'Langue non trouvée' });
  }

  // Empêcher la désactivation de la langue par défaut
  if (language.is_default && language.active) {
    return res.status(400).json({ message: 'Impossible de désactiver la langue par défaut' });
  }

  language.active = !language.active;
  await language.save();

  // Transformer les données
  const transformedLanguage = {
    id: language.id.toString(),
    name: language.name,
    code: language.code,
    native_name: language.native_name,
    direction: language.direction,
    is_default: language.is_default,
    active: language.active
  };

  res.json(transformedLanguage);
}));

router.patch('/languages/:id/set-default', asyncHandler(async (req, res) => {
  const language = await Language.findByPk(req.params.id);
  if (!language) {
    return res.status(404).json({ message: 'Langue non trouvée' });
  }

  // Vérifier si la langue est active
  if (!language.active) {
    return res.status(400).json({ message: 'Impossible de définir une langue inactive comme langue par défaut' });
  }

  // Désactiver toutes les langues par défaut
  await Language.update(
    { is_default: false },
    { where: { is_default: true } }
  );

  // Définir cette langue comme langue par défaut
  language.is_default = true;
  await language.save();

  // Transformer les données
  const transformedLanguage = {
    id: language.id.toString(),
    name: language.name,
    code: language.code,
    native_name: language.native_name,
    direction: language.direction,
    is_default: language.is_default,
    active: language.active
  };

  res.json(transformedLanguage);
}));

// Routes pour les formats de date
router.get('/dateformats', asyncHandler(async (req, res) => {
  const dateFormats = await DateFormat.findAll();

  // Transformer les données
  const transformedDateFormats = dateFormats.map(format => ({
    id: format.id.toString(),
    name: format.name,
    format: format.format,
    description: format.description,
    type: format.type,
    is_default: format.is_default,
    active: format.active
  }));

  res.json(transformedDateFormats);
}));

router.get('/dateformats/:id', asyncHandler(async (req, res) => {
  const dateFormat = await DateFormat.findByPk(req.params.id);

  if (!dateFormat) {
    return res.status(404).json({ message: 'Format de date non trouvé' });
  }

  // Transformer les données
  const transformedDateFormat = {
    id: dateFormat.id.toString(),
    name: dateFormat.name,
    format: dateFormat.format,
    description: dateFormat.description,
    type: dateFormat.type,
    is_default: dateFormat.is_default,
    active: dateFormat.active
  };

  res.json(transformedDateFormat);
}));

router.post('/dateformats', asyncHandler(async (req, res) => {
  console.log('POST /dateformats - Données reçues:', req.body);

  const { name, format, description, type, is_default, active } = req.body;

  // Vérifier les données requises
  if (!name || !format || !type) {
    console.log('Données manquantes:', { name, format, type });
    return res.status(400).json({ message: 'Les champs name, format et type sont requis' });
  }

  // Vérifier si le format existe déjà
  const existingFormat = await DateFormat.findOne({
    where: { format }
  });

  if (existingFormat) {
    console.log('Format existant:', existingFormat.format);
    return res.status(400).json({ message: 'Un format avec ce motif existe déjà' });
  }

  // Si ce format est défini comme format par défaut, désactiver les autres formats par défaut du même type
  if (is_default) {
    await DateFormat.update(
      { is_default: false },
      { where: { type, is_default: true } }
    );
  }

  // Créer le format
  const dateFormat = await DateFormat.create({
    name,
    format,
    description,
    type: type || 'date',
    is_default: is_default !== undefined ? is_default : false,
    active: active !== undefined ? active : true
  });

  // Transformer les données
  const transformedDateFormat = {
    id: dateFormat.id.toString(),
    name: dateFormat.name,
    format: dateFormat.format,
    description: dateFormat.description,
    type: dateFormat.type,
    is_default: dateFormat.is_default,
    active: dateFormat.active
  };

  res.status(201).json(transformedDateFormat);
}));

router.put('/dateformats/:id', asyncHandler(async (req, res) => {
  console.log('PUT /dateformats/:id - Données reçues:', req.body);

  const { name, format, description, type, is_default, active } = req.body;

  // Vérifier les données requises
  if (!name || !format || !type) {
    console.log('Données manquantes:', { name, format, type });
    return res.status(400).json({ message: 'Les champs name, format et type sont requis' });
  }

  const dateFormat = await DateFormat.findByPk(req.params.id);
  if (!dateFormat) {
    return res.status(404).json({ message: 'Format de date non trouvé' });
  }

  // Vérifier si le format est déjà utilisé par un autre format
  if (format && format !== dateFormat.format) {
    const existingFormat = await DateFormat.findOne({
      where: { format }
    });

    if (existingFormat) {
      return res.status(400).json({ message: 'Un format avec ce motif existe déjà' });
    }
  }

  // Si ce format est défini comme format par défaut, désactiver les autres formats par défaut du même type
  if (is_default && !dateFormat.is_default) {
    await DateFormat.update(
      { is_default: false },
      { where: { type: type || dateFormat.type, is_default: true } }
    );
  }

  // Mettre à jour les champs
  if (name) dateFormat.name = name;
  if (format) dateFormat.format = format;
  if (description !== undefined) dateFormat.description = description;
  if (type) dateFormat.type = type;
  if (is_default !== undefined) dateFormat.is_default = is_default;
  if (active !== undefined) dateFormat.active = active;

  await dateFormat.save();

  // Transformer les données
  const transformedDateFormat = {
    id: dateFormat.id.toString(),
    name: dateFormat.name,
    format: dateFormat.format,
    description: dateFormat.description,
    type: dateFormat.type,
    is_default: dateFormat.is_default,
    active: dateFormat.active
  };

  res.json(transformedDateFormat);
}));

router.delete('/dateformats/:id', asyncHandler(async (req, res) => {
  const dateFormat = await DateFormat.findByPk(req.params.id);
  if (!dateFormat) {
    return res.status(404).json({ message: 'Format de date non trouvé' });
  }

  // Empêcher la suppression du format par défaut
  if (dateFormat.is_default) {
    return res.status(400).json({ message: 'Impossible de supprimer le format par défaut' });
  }

  await dateFormat.destroy();
  res.status(204).end();
}));

router.patch('/dateformats/:id/toggle-status', asyncHandler(async (req, res) => {
  const dateFormat = await DateFormat.findByPk(req.params.id);
  if (!dateFormat) {
    return res.status(404).json({ message: 'Format de date non trouvé' });
  }

  // Empêcher la désactivation du format par défaut
  if (dateFormat.is_default && dateFormat.active) {
    return res.status(400).json({ message: 'Impossible de désactiver le format par défaut' });
  }

  dateFormat.active = !dateFormat.active;
  await dateFormat.save();

  // Transformer les données
  const transformedDateFormat = {
    id: dateFormat.id.toString(),
    name: dateFormat.name,
    format: dateFormat.format,
    description: dateFormat.description,
    type: dateFormat.type,
    is_default: dateFormat.is_default,
    active: dateFormat.active
  };

  res.json(transformedDateFormat);
}));

router.patch('/dateformats/:id/set-default', asyncHandler(async (req, res) => {
  const dateFormat = await DateFormat.findByPk(req.params.id);
  if (!dateFormat) {
    return res.status(404).json({ message: 'Format de date non trouvé' });
  }

  // Vérifier si le format est actif
  if (!dateFormat.active) {
    return res.status(400).json({ message: 'Impossible de définir un format inactif comme format par défaut' });
  }

  // Désactiver tous les formats par défaut du même type
  await DateFormat.update(
    { is_default: false },
    { where: { type: dateFormat.type, is_default: true } }
  );

  // Définir ce format comme format par défaut
  dateFormat.is_default = true;
  await dateFormat.save();

  // Transformer les données
  const transformedDateFormat = {
    id: dateFormat.id.toString(),
    name: dateFormat.name,
    format: dateFormat.format,
    description: dateFormat.description,
    type: dateFormat.type,
    is_default: dateFormat.is_default,
    active: dateFormat.active
  };

  res.json(transformedDateFormat);
}));

// Routes pour les traductions
router.get('/translations', asyncHandler(async (req, res) => {
  const translations = await Translation.findAll();

  // Transformer les données
  const transformedTranslations = translations.map(translation => ({
    id: translation.id.toString(),
    key: translation.key,
    locale: translation.locale,
    namespace: translation.namespace,
    value: translation.value,
    is_default: false,
    active: translation.active,
    description: translation.description || ''
  }));

  res.json(transformedTranslations);
}));

router.get('/translations/:id', asyncHandler(async (req, res) => {
  const translation = await Translation.findByPk(req.params.id);

  if (!translation) {
    return res.status(404).json({ message: 'Traduction non trouvée' });
  }

  // Transformer les données
  const transformedTranslation = {
    id: translation.id.toString(),
    key: translation.key,
    locale: translation.language_code,
    namespace: translation.namespace,
    value: translation.value,
    is_default: false, // Valeur par défaut car la colonne n'existe pas
    active: translation.active,
    description: translation.context || '' // Utiliser context comme description
  };

  res.json(transformedTranslation);
}));

router.post('/translations', asyncHandler(async (req, res) => {
  console.log('POST /translations - Données reçues:', req.body);

    const { key, locale, namespace, value, is_default, active, description } = req.body;

  // Vérifier les données requises
  if (!key || !locale || !value) {
    console.log('Données manquantes:', { key, locale, value });
    return res.status(400).json({ message: 'Les champs key, locale et value sont requis' });
  }

  // Vérifier si la traduction existe déjà
  const existingTranslation = await Translation.findOne({
    where: {
      key,
      locale,
      namespace: namespace || 'common'
    }
  });

  if (existingTranslation) {
    console.log('Traduction existante:', existingTranslation.key);
    return res.status(400).json({ message: 'Une traduction avec cette clé, cette locale et cet espace de noms existe déjà' });
  }

  // La colonne is_default n'existe pas, donc nous ignorons cette partie

  // Créer la traduction
  const translation = await Translation.create({
    key,
    locale,
    namespace: namespace || 'common',
    value,
    is_html: false,
    description: description || null,
    active: active !== undefined ? active : true
  });

  // Transformer les données
  const transformedTranslation = {
    id: translation.id.toString(),
    key: translation.key,
    locale: translation.language_code,
    namespace: translation.namespace,
    value: translation.value,
    is_default: translation.is_default,
    active: translation.active,
    description: translation.description
  };

  res.status(201).json(transformedTranslation);
}));

router.put('/translations/:id', asyncHandler(async (req, res) => {
  console.log('PUT /translations/:id - Données reçues:', req.body);

  const { key, locale, namespace, value, is_default, active, description } = req.body;

  // Vérifier les données requises
  if (!key || !locale || !value) {
    console.log('Données manquantes:', { key, locale, value });
    return res.status(400).json({ message: 'Les champs key, locale et value sont requis' });
  }

  const translation = await Translation.findByPk(req.params.id);
  if (!translation) {
    return res.status(404).json({ message: 'Traduction non trouvée' });
  }

  // Vérifier si la combinaison clé/locale/namespace est déjà utilisée par une autre traduction
  if (key !== translation.key || locale !== translation.locale || (namespace && namespace !== translation.namespace)) {
    const existingTranslation = await Translation.findOne({
      where: {
        key,
        locale,
        namespace: namespace || 'common'
      }
    });

    if (existingTranslation && existingTranslation.id !== translation.id) {
      return res.status(400).json({ message: 'Une traduction avec cette clé, cette locale et cet espace de noms existe déjà' });
    }
  }

  // La colonne is_default n'existe pas, donc nous ignorons cette partie

  // Mettre à jour les champs
  if (key) translation.key = key;
  if (locale) translation.locale = locale;
  if (namespace) translation.namespace = namespace;
  if (value) translation.value = value;
  if (active !== undefined) translation.active = active;
  if (description !== undefined) translation.description = description;

  await translation.save();

  // Transformer les données
  const transformedTranslation = {
    id: translation.id.toString(),
    key: translation.key,
    locale: translation.locale,
    namespace: translation.namespace,
    value: translation.value,
    is_default: false,
    active: translation.active,
    description: translation.description || ''
  };

  res.json(transformedTranslation);
}));

router.delete('/translations/:id', asyncHandler(async (req, res) => {
  const translation = await Translation.findByPk(req.params.id);
  if (!translation) {
    return res.status(404).json({ message: 'Traduction non trouvée' });
  }

  // La colonne is_default n'existe pas, donc nous ignorons cette partie

  await translation.destroy();
  res.status(204).end();
}));

router.patch('/translations/:id/toggle-status', asyncHandler(async (req, res) => {
  const translation = await Translation.findByPk(req.params.id);
  if (!translation) {
    return res.status(404).json({ message: 'Traduction non trouvée' });
  }

  // La colonne is_default n'existe pas, donc nous ignorons cette partie

  translation.active = !translation.active;
  await translation.save();

  // Transformer les données
  const transformedTranslation = {
    id: translation.id.toString(),
    key: translation.key,
    locale: translation.language_code,
    namespace: translation.namespace,
    value: translation.value,
    is_default: translation.is_default,
    active: translation.active,
    description: translation.description
  };

  res.json(transformedTranslation);
}));

router.patch('/translations/:id/set-default', asyncHandler(async (req, res) => {
  const translation = await Translation.findByPk(req.params.id);
  if (!translation) {
    return res.status(404).json({ message: 'Traduction non trouvée' });
  }

  // Vérifier si la traduction est active
  if (!translation.active) {
    return res.status(400).json({ message: 'Impossible de définir une traduction inactive comme traduction par défaut' });
  }

  // La colonne is_default n'existe pas, donc nous ignorons cette partie
  await translation.save();

  // Transformer les données
  const transformedTranslation = {
    id: translation.id.toString(),
    key: translation.key,
    locale: translation.language_code,
    namespace: translation.namespace,
    value: translation.value,
    is_default: false, // Valeur par défaut car la colonne n'existe pas
    active: translation.active,
    description: translation.context || '' // Utiliser context comme description
  };

  res.json(transformedTranslation);
}));

// Récupérer toutes les traductions pour une locale spécifique
router.get('/translations/locale/:locale', asyncHandler(async (req, res) => {
  const { locale } = req.params;

  const translations = await Translation.findAll({
    where: {
      locale,
      active: true
    }
  });

  // Transformer les données en format i18next
  const transformedTranslations = {};

  translations.forEach(translation => {
    if (!transformedTranslations[translation.namespace]) {
      transformedTranslations[translation.namespace] = {};
    }

    transformedTranslations[translation.namespace][translation.key] = translation.value;
  });

  res.json(transformedTranslations);
}));

// Récupérer toutes les traductions pour une clé spécifique
router.get('/translations/key/:key', asyncHandler(async (req, res) => {
  const { key } = req.params;

  const translations = await Translation.findAll({
    where: { key }
  });

  // Transformer les données
  const transformedTranslations = translations.map(translation => ({
    id: translation.id.toString(),
    key: translation.key,
    locale: translation.language_code,
    namespace: translation.namespace,
    value: translation.value,
    is_default: translation.is_default,
    active: translation.active,
    description: translation.description
  }));

  res.json(transformedTranslations);
}));

// Récupérer toutes les traductions pour un namespace spécifique
router.get('/translations/namespace/:namespace', asyncHandler(async (req, res) => {
  const { namespace } = req.params;

  const translations = await Translation.findAll({
    where: { namespace }
  });

  // Transformer les données
  const transformedTranslations = translations.map(translation => ({
    id: translation.id.toString(),
    key: translation.key,
    locale: translation.language_code,
    namespace: translation.namespace,
    value: translation.value,
    is_default: translation.is_default,
    active: translation.active,
    description: translation.description
  }));

  res.json(transformedTranslations);
}));

// Routes pour les formats de nombre
router.get('/numberformats', asyncHandler(async (req, res) => {
  const numberFormats = await NumberFormat.findAll();

  // Transformer les données
  const transformedNumberFormats = numberFormats.map(format => ({
    id: format.id.toString(),
    name: format.name,
    decimal_separator: format.decimal_separator,
    thousands_separator: format.thousands_separator,
    decimal_places: format.decimal_places,
    currency_display: format.currency_display,
    is_default: format.is_default,
    active: format.active
  }));

  res.json(transformedNumberFormats);
}));

router.get('/numberformats/:id', asyncHandler(async (req, res) => {
  const numberFormat = await NumberFormat.findByPk(req.params.id);

  if (!numberFormat) {
    return res.status(404).json({ message: 'Format de nombre non trouvé' });
  }

  // Transformer les données
  const transformedNumberFormat = {
    id: numberFormat.id.toString(),
    name: numberFormat.name,
    decimal_separator: numberFormat.decimal_separator,
    thousands_separator: numberFormat.thousands_separator,
    decimal_places: numberFormat.decimal_places,
    currency_display: numberFormat.currency_display,
    is_default: numberFormat.is_default,
    active: numberFormat.active
  };

  res.json(transformedNumberFormat);
}));

router.post('/numberformats', asyncHandler(async (req, res) => {
  const { name, decimal_separator, thousands_separator, decimal_places, currency_display, is_default, active } = req.body;

  // Vérifier les données requises
  if (!name || !decimal_separator || decimal_places === undefined || !currency_display) {
    return res.status(400).json({ message: 'Les champs name, decimal_separator, decimal_places et currency_display sont requis' });
  }

  // Vérifier si le format existe déjà
  const existingFormat = await NumberFormat.findOne({
    where: { name }
  });

  if (existingFormat) {
    return res.status(400).json({ message: 'Un format de nombre avec ce nom existe déjà' });
  }

  // Si ce format est défini comme format par défaut, désactiver les autres formats par défaut
  if (is_default) {
    await NumberFormat.update(
      { is_default: false },
      { where: { is_default: true } }
    );
  }

  // Créer le format
  const numberFormat = await NumberFormat.create({
    name,
    decimal_separator,
    thousands_separator,
    decimal_places,
    currency_display,
    is_default: is_default !== undefined ? is_default : false,
    active: active !== undefined ? active : true
  });

  // Transformer les données
  const transformedNumberFormat = {
    id: numberFormat.id.toString(),
    name: numberFormat.name,
    decimal_separator: numberFormat.decimal_separator,
    thousands_separator: numberFormat.thousands_separator,
    decimal_places: numberFormat.decimal_places,
    currency_display: numberFormat.currency_display,
    is_default: numberFormat.is_default,
    active: numberFormat.active
  };

  res.status(201).json(transformedNumberFormat);
}));

router.put('/numberformats/:id', asyncHandler(async (req, res) => {
  const { name, decimal_separator, thousands_separator, decimal_places, currency_display, is_default, active } = req.body;

  // Vérifier les données requises
  if (!name || !decimal_separator || decimal_places === undefined || !currency_display) {
    return res.status(400).json({ message: 'Les champs name, decimal_separator, decimal_places et currency_display sont requis' });
  }

  const numberFormat = await NumberFormat.findByPk(req.params.id);
  if (!numberFormat) {
    return res.status(404).json({ message: 'Format de nombre non trouvé' });
  }

  // Vérifier si le nom est déjà utilisé par un autre format
  if (name !== numberFormat.name) {
    const existingFormat = await NumberFormat.findOne({
      where: { name }
    });

    if (existingFormat && existingFormat.id !== numberFormat.id) {
      return res.status(400).json({ message: 'Un format de nombre avec ce nom existe déjà' });
    }
  }

  // Si ce format est défini comme format par défaut, désactiver les autres formats par défaut
  if (is_default && !numberFormat.is_default) {
    await NumberFormat.update(
      { is_default: false },
      {
        where: {
          is_default: true,
          id: { [Op.ne]: numberFormat.id }
        }
      }
    );
  }

  // Mettre à jour les champs
  numberFormat.name = name;
  numberFormat.decimal_separator = decimal_separator;
  numberFormat.thousands_separator = thousands_separator;
  numberFormat.decimal_places = decimal_places;
  numberFormat.currency_display = currency_display;
  if (is_default !== undefined) numberFormat.is_default = is_default;
  if (active !== undefined) numberFormat.active = active;

  await numberFormat.save();

  // Transformer les données
  const transformedNumberFormat = {
    id: numberFormat.id.toString(),
    name: numberFormat.name,
    decimal_separator: numberFormat.decimal_separator,
    thousands_separator: numberFormat.thousands_separator,
    decimal_places: numberFormat.decimal_places,
    currency_display: numberFormat.currency_display,
    is_default: numberFormat.is_default,
    active: numberFormat.active
  };

  res.json(transformedNumberFormat);
}));

router.delete('/numberformats/:id', asyncHandler(async (req, res) => {
  const numberFormat = await NumberFormat.findByPk(req.params.id);
  if (!numberFormat) {
    return res.status(404).json({ message: 'Format de nombre non trouvé' });
  }

  // Empêcher la suppression d'un format par défaut
  if (numberFormat.is_default) {
    return res.status(400).json({ message: 'Impossible de supprimer un format par défaut' });
  }

  await numberFormat.destroy();
  res.status(204).end();
}));

router.patch('/numberformats/:id/toggle-status', asyncHandler(async (req, res) => {
  const numberFormat = await NumberFormat.findByPk(req.params.id);
  if (!numberFormat) {
    return res.status(404).json({ message: 'Format de nombre non trouvé' });
  }

  // Empêcher la désactivation d'un format par défaut
  if (numberFormat.is_default && numberFormat.active) {
    return res.status(400).json({ message: 'Impossible de désactiver un format par défaut' });
  }

  numberFormat.active = !numberFormat.active;
  await numberFormat.save();

  // Transformer les données
  const transformedNumberFormat = {
    id: numberFormat.id.toString(),
    name: numberFormat.name,
    decimal_separator: numberFormat.decimal_separator,
    thousands_separator: numberFormat.thousands_separator,
    decimal_places: numberFormat.decimal_places,
    currency_display: numberFormat.currency_display,
    is_default: numberFormat.is_default,
    active: numberFormat.active
  };

  res.json(transformedNumberFormat);
}));

router.patch('/numberformats/:id/set-default', asyncHandler(async (req, res) => {
  const numberFormat = await NumberFormat.findByPk(req.params.id);
  if (!numberFormat) {
    return res.status(404).json({ message: 'Format de nombre non trouvé' });
  }

  // Vérifier si le format est actif
  if (!numberFormat.active) {
    return res.status(400).json({ message: 'Impossible de définir un format inactif comme format par défaut' });
  }

  // Désactiver tous les formats par défaut
  await NumberFormat.update(
    { is_default: false },
    { where: { is_default: true } }
  );

  // Définir ce format comme format par défaut
  numberFormat.is_default = true;
  await numberFormat.save();

  // Transformer les données
  const transformedNumberFormat = {
    id: numberFormat.id.toString(),
    name: numberFormat.name,
    decimal_separator: numberFormat.decimal_separator,
    thousands_separator: numberFormat.thousands_separator,
    decimal_places: numberFormat.decimal_places,
    currency_display: numberFormat.currency_display,
    is_default: numberFormat.is_default,
    active: numberFormat.active
  };

  res.json(transformedNumberFormat);
}));

// Routes pour les formats d'heure
router.get('/timeformats', asyncHandler(async (req, res) => {
  const timeFormats = await TimeFormat.findAll();

  // Transformer les données
  const transformedTimeFormats = timeFormats.map(format => ({
    id: format.id.toString(),
    name: format.name,
    format: format.format,
    example: format.example,
    region: format.region,
    uses_24_hour: format.uses_24_hour,
    is_default: format.is_default,
    active: format.active
  }));

  res.json(transformedTimeFormats);
}));

router.get('/timeformats/:id', asyncHandler(async (req, res) => {
  const timeFormat = await TimeFormat.findByPk(req.params.id);

  if (!timeFormat) {
    return res.status(404).json({ message: 'Format d\'heure non trouvé' });
  }

  // Transformer les données
  const transformedTimeFormat = {
    id: timeFormat.id.toString(),
    name: timeFormat.name,
    format: timeFormat.format,
    example: timeFormat.example,
    region: timeFormat.region,
    uses_24_hour: timeFormat.uses_24_hour,
    is_default: timeFormat.is_default,
    active: timeFormat.active
  };

  res.json(transformedTimeFormat);
}));

router.post('/timeformats', asyncHandler(async (req, res) => {
  const { name, format, example, region, uses_24_hour, is_default, active } = req.body;

  // Vérifier les données requises
  if (!name || !format || !example || !region) {
    return res.status(400).json({ message: 'Les champs name, format, example et region sont requis' });
  }

  // Vérifier si le format existe déjà
  const existingFormat = await TimeFormat.findOne({
    where: { name }
  });

  if (existingFormat) {
    return res.status(400).json({ message: 'Un format d\'heure avec ce nom existe déjà' });
  }

  // Si ce format est défini comme format par défaut, désactiver les autres formats par défaut
  if (is_default) {
    await TimeFormat.update(
      { is_default: false },
      { where: { is_default: true } }
    );
  }

  // Créer le format
  const timeFormat = await TimeFormat.create({
    name,
    format,
    example,
    region,
    uses_24_hour: uses_24_hour !== undefined ? uses_24_hour : true,
    is_default: is_default !== undefined ? is_default : false,
    active: active !== undefined ? active : true
  });

  // Transformer les données
  const transformedTimeFormat = {
    id: timeFormat.id.toString(),
    name: timeFormat.name,
    format: timeFormat.format,
    example: timeFormat.example,
    region: timeFormat.region,
    uses_24_hour: timeFormat.uses_24_hour,
    is_default: timeFormat.is_default,
    active: timeFormat.active
  };

  res.status(201).json(transformedTimeFormat);
}));

router.put('/timeformats/:id', asyncHandler(async (req, res) => {
  const { name, format, example, region, uses_24_hour, is_default, active } = req.body;

  // Vérifier les données requises
  if (!name || !format || !example || !region) {
    return res.status(400).json({ message: 'Les champs name, format, example et region sont requis' });
  }

  const timeFormat = await TimeFormat.findByPk(req.params.id);
  if (!timeFormat) {
    return res.status(404).json({ message: 'Format d\'heure non trouvé' });
  }

  // Vérifier si le nom est déjà utilisé par un autre format
  if (name !== timeFormat.name) {
    const existingFormat = await TimeFormat.findOne({
      where: { name }
    });

    if (existingFormat && existingFormat.id !== timeFormat.id) {
      return res.status(400).json({ message: 'Un format d\'heure avec ce nom existe déjà' });
    }
  }

  // Si ce format est défini comme format par défaut, désactiver les autres formats par défaut
  if (is_default && !timeFormat.is_default) {
    await TimeFormat.update(
      { is_default: false },
      {
        where: {
          is_default: true,
          id: { [Op.ne]: timeFormat.id }
        }
      }
    );
  }

  // Mettre à jour les champs
  timeFormat.name = name;
  timeFormat.format = format;
  timeFormat.example = example;
  timeFormat.region = region;
  if (uses_24_hour !== undefined) timeFormat.uses_24_hour = uses_24_hour;
  if (is_default !== undefined) timeFormat.is_default = is_default;
  if (active !== undefined) timeFormat.active = active;

  await timeFormat.save();

  // Transformer les données
  const transformedTimeFormat = {
    id: timeFormat.id.toString(),
    name: timeFormat.name,
    format: timeFormat.format,
    example: timeFormat.example,
    region: timeFormat.region,
    uses_24_hour: timeFormat.uses_24_hour,
    is_default: timeFormat.is_default,
    active: timeFormat.active
  };

  res.json(transformedTimeFormat);
}));

router.delete('/timeformats/:id', asyncHandler(async (req, res) => {
  const timeFormat = await TimeFormat.findByPk(req.params.id);
  if (!timeFormat) {
    return res.status(404).json({ message: 'Format d\'heure non trouvé' });
  }

  // Empêcher la suppression d'un format par défaut
  if (timeFormat.is_default) {
    return res.status(400).json({ message: 'Impossible de supprimer un format par défaut' });
  }

  await timeFormat.destroy();
  res.status(204).end();
}));

router.patch('/timeformats/:id/toggle-status', asyncHandler(async (req, res) => {
  const timeFormat = await TimeFormat.findByPk(req.params.id);
  if (!timeFormat) {
    return res.status(404).json({ message: 'Format d\'heure non trouvé' });
  }

  // Empêcher la désactivation d'un format par défaut
  if (timeFormat.is_default && timeFormat.active) {
    return res.status(400).json({ message: 'Impossible de désactiver un format par défaut' });
  }

  timeFormat.active = !timeFormat.active;
  await timeFormat.save();

  // Transformer les données
  const transformedTimeFormat = {
    id: timeFormat.id.toString(),
    name: timeFormat.name,
    format: timeFormat.format,
    example: timeFormat.example,
    region: timeFormat.region,
    uses_24_hour: timeFormat.uses_24_hour,
    is_default: timeFormat.is_default,
    active: timeFormat.active
  };

  res.json(transformedTimeFormat);
}));

router.patch('/timeformats/:id/set-default', asyncHandler(async (req, res) => {
  const timeFormat = await TimeFormat.findByPk(req.params.id);
  if (!timeFormat) {
    return res.status(404).json({ message: 'Format d\'heure non trouvé' });
  }

  // Vérifier si le format est actif
  if (!timeFormat.active) {
    return res.status(400).json({ message: 'Impossible de définir un format inactif comme format par défaut' });
  }

  // Désactiver tous les formats par défaut
  await TimeFormat.update(
    { is_default: false },
    { where: { is_default: true } }
  );

  // Définir ce format comme format par défaut
  timeFormat.is_default = true;
  await timeFormat.save();

  // Transformer les données
  const transformedTimeFormat = {
    id: timeFormat.id.toString(),
    name: timeFormat.name,
    format: timeFormat.format,
    example: timeFormat.example,
    region: timeFormat.region,
    uses_24_hour: timeFormat.uses_24_hour,
    is_default: timeFormat.is_default,
    active: timeFormat.active
  };

  res.json(transformedTimeFormat);
}));

module.exports = router;
