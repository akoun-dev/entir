'use strict';

const express = require('express');
const router = express.Router();
const { User, Group, Parameter, Currency, Country, Language, DateFormat, NumberFormat, TimeFormat, Translation, EmailServer, SecuritySetting, ApiKey, AutomationRule, LoggingSetting, DocumentLayout, ReportTemplate, Printer, Sequelize } = require('../models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
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

// Routes pour les serveurs d'email
router.get('/emailservers', asyncHandler(async (req, res) => {
  const emailServers = await EmailServer.findAll();

  // Transformer les données
  const transformedEmailServers = emailServers.map(server => ({
    id: server.id.toString(),
    name: server.name,
    protocol: server.protocol,
    host: server.host,
    port: server.port,
    username: server.username,
    // Ne pas renvoyer le mot de passe pour des raisons de sécurité
    password: server.password ? '********' : '',
    encryption: server.encryption,
    from_email: server.from_email,
    from_name: server.from_name,
    is_default: server.is_default,
    active: server.active
  }));

  res.json(transformedEmailServers);
}));

router.get('/emailservers/:id', asyncHandler(async (req, res) => {
  const emailServer = await EmailServer.findByPk(req.params.id);

  if (!emailServer) {
    return res.status(404).json({ message: 'Serveur d\'email non trouvé' });
  }

  // Transformer les données
  const transformedEmailServer = {
    id: emailServer.id.toString(),
    name: emailServer.name,
    protocol: emailServer.protocol,
    host: emailServer.host,
    port: emailServer.port,
    username: emailServer.username,
    // Ne pas renvoyer le mot de passe pour des raisons de sécurité
    password: emailServer.password ? '********' : '',
    encryption: emailServer.encryption,
    from_email: emailServer.from_email,
    from_name: emailServer.from_name,
    is_default: emailServer.is_default,
    active: emailServer.active
  };

  res.json(transformedEmailServer);
}));

router.post('/emailservers', asyncHandler(async (req, res) => {
  const { name, protocol, host, port, username, password, encryption, from_email, from_name, is_default, active } = req.body;

  // Vérifier les données requises
  if (!name || !host || !from_email || !from_name) {
    return res.status(400).json({ message: 'Les champs name, host, from_email et from_name sont requis' });
  }

  // Vérifier si le serveur existe déjà
  const existingServer = await EmailServer.findOne({
    where: { name }
  });

  if (existingServer) {
    return res.status(400).json({ message: 'Un serveur d\'email avec ce nom existe déjà' });
  }

  // Si ce serveur est défini comme serveur par défaut, désactiver les autres serveurs par défaut
  if (is_default) {
    await EmailServer.update(
      { is_default: false },
      { where: { is_default: true } }
    );
  }

  // Créer le serveur
  const emailServer = await EmailServer.create({
    name,
    protocol: protocol || 'smtp',
    host,
    port: port || 587,
    username,
    password,
    encryption: encryption || 'tls',
    from_email,
    from_name,
    is_default: is_default !== undefined ? is_default : false,
    active: active !== undefined ? active : true
  });

  // Transformer les données
  const transformedEmailServer = {
    id: emailServer.id.toString(),
    name: emailServer.name,
    protocol: emailServer.protocol,
    host: emailServer.host,
    port: emailServer.port,
    username: emailServer.username,
    // Ne pas renvoyer le mot de passe pour des raisons de sécurité
    password: emailServer.password ? '********' : '',
    encryption: emailServer.encryption,
    from_email: emailServer.from_email,
    from_name: emailServer.from_name,
    is_default: emailServer.is_default,
    active: emailServer.active
  };

  res.status(201).json(transformedEmailServer);
}));

router.put('/emailservers/:id', asyncHandler(async (req, res) => {
  const { name, protocol, host, port, username, password, encryption, from_email, from_name, is_default, active } = req.body;

  // Vérifier les données requises
  if (!name || !host || !from_email || !from_name) {
    return res.status(400).json({ message: 'Les champs name, host, from_email et from_name sont requis' });
  }

  const emailServer = await EmailServer.findByPk(req.params.id);
  if (!emailServer) {
    return res.status(404).json({ message: 'Serveur d\'email non trouvé' });
  }

  // Vérifier si le nom est déjà utilisé par un autre serveur
  if (name !== emailServer.name) {
    const existingServer = await EmailServer.findOne({
      where: { name }
    });

    if (existingServer && existingServer.id !== emailServer.id) {
      return res.status(400).json({ message: 'Un serveur d\'email avec ce nom existe déjà' });
    }
  }

  // Si ce serveur est défini comme serveur par défaut, désactiver les autres serveurs par défaut
  if (is_default && !emailServer.is_default) {
    await EmailServer.update(
      { is_default: false },
      {
        where: {
          is_default: true,
          id: { [Op.ne]: emailServer.id }
        }
      }
    );
  }

  // Mettre à jour les champs
  emailServer.name = name;
  if (protocol) emailServer.protocol = protocol;
  emailServer.host = host;
  if (port) emailServer.port = port;
  if (username !== undefined) emailServer.username = username;
  if (password && password !== '********') emailServer.password = password;
  if (encryption) emailServer.encryption = encryption;
  emailServer.from_email = from_email;
  emailServer.from_name = from_name;
  if (is_default !== undefined) emailServer.is_default = is_default;
  if (active !== undefined) emailServer.active = active;

  await emailServer.save();

  // Transformer les données
  const transformedEmailServer = {
    id: emailServer.id.toString(),
    name: emailServer.name,
    protocol: emailServer.protocol,
    host: emailServer.host,
    port: emailServer.port,
    username: emailServer.username,
    // Ne pas renvoyer le mot de passe pour des raisons de sécurité
    password: emailServer.password ? '********' : '',
    encryption: emailServer.encryption,
    from_email: emailServer.from_email,
    from_name: emailServer.from_name,
    is_default: emailServer.is_default,
    active: emailServer.active
  };

  res.json(transformedEmailServer);
}));

router.delete('/emailservers/:id', asyncHandler(async (req, res) => {
  const emailServer = await EmailServer.findByPk(req.params.id);
  if (!emailServer) {
    return res.status(404).json({ message: 'Serveur d\'email non trouvé' });
  }

  // Empêcher la suppression d'un serveur par défaut
  if (emailServer.is_default) {
    return res.status(400).json({ message: 'Impossible de supprimer un serveur par défaut. Veuillez d\'abord définir un autre serveur comme serveur par défaut.' });
  }

  await emailServer.destroy();
  res.status(204).end();
}));

router.patch('/emailservers/:id/toggle-status', asyncHandler(async (req, res) => {
  const emailServer = await EmailServer.findByPk(req.params.id);
  if (!emailServer) {
    return res.status(404).json({ message: 'Serveur d\'email non trouvé' });
  }

  // Empêcher la désactivation d'un serveur par défaut
  if (emailServer.is_default && emailServer.active) {
    return res.status(400).json({ message: 'Impossible de désactiver un serveur par défaut. Veuillez d\'abord définir un autre serveur comme serveur par défaut.' });
  }

  emailServer.active = !emailServer.active;
  await emailServer.save();

  // Transformer les données
  const transformedEmailServer = {
    id: emailServer.id.toString(),
    name: emailServer.name,
    protocol: emailServer.protocol,
    host: emailServer.host,
    port: emailServer.port,
    username: emailServer.username,
    // Ne pas renvoyer le mot de passe pour des raisons de sécurité
    password: emailServer.password ? '********' : '',
    encryption: emailServer.encryption,
    from_email: emailServer.from_email,
    from_name: emailServer.from_name,
    is_default: emailServer.is_default,
    active: emailServer.active
  };

  res.json(transformedEmailServer);
}));

router.patch('/emailservers/:id/set-default', asyncHandler(async (req, res) => {
  const emailServer = await EmailServer.findByPk(req.params.id);
  if (!emailServer) {
    return res.status(404).json({ message: 'Serveur d\'email non trouvé' });
  }

  // Vérifier si le serveur est actif
  if (!emailServer.active) {
    return res.status(400).json({ message: 'Impossible de définir un serveur inactif comme serveur par défaut' });
  }

  // Désactiver tous les serveurs par défaut
  await EmailServer.update(
    { is_default: false },
    { where: { is_default: true } }
  );

  // Définir ce serveur comme serveur par défaut
  emailServer.is_default = true;
  await emailServer.save();

  // Transformer les données
  const transformedEmailServer = {
    id: emailServer.id.toString(),
    name: emailServer.name,
    protocol: emailServer.protocol,
    host: emailServer.host,
    port: emailServer.port,
    username: emailServer.username,
    // Ne pas renvoyer le mot de passe pour des raisons de sécurité
    password: emailServer.password ? '********' : '',
    encryption: emailServer.encryption,
    from_email: emailServer.from_email,
    from_name: emailServer.from_name,
    is_default: emailServer.is_default,
    active: emailServer.active
  };

  res.json(transformedEmailServer);
}));

router.post('/emailservers/:id/test', asyncHandler(async (req, res) => {
  const emailServer = await EmailServer.findByPk(req.params.id);
  if (!emailServer) {
    return res.status(404).json({ message: 'Serveur d\'email non trouvé' });
  }

  // Simuler un test de connexion SMTP
  // Dans une application réelle, vous utiliseriez une bibliothèque comme nodemailer pour tester la connexion

  // Simuler un délai pour le test
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simuler un succès ou un échec aléatoire
  const success = Math.random() > 0.2; // 80% de chances de succès

  if (success) {
    res.json({ success: true, message: 'Connexion au serveur SMTP réussie' });
  } else {
    res.status(500).json({ success: false, message: 'Échec de la connexion au serveur SMTP. Vérifiez vos paramètres et réessayez.' });
  }
}));

// Routes pour les paramètres de sécurité
router.get('/securitysettings', asyncHandler(async (req, res) => {
  const securitySettings = await SecuritySetting.findAll();

  // Transformer les données
  const transformedSettings = securitySettings.map(setting => {
    // Convertir la valeur selon le type
    let parsedValue = setting.value;
    if (setting.valueType === 'boolean') {
      parsedValue = setting.value === 'true';
    } else if (setting.valueType === 'number') {
      parsedValue = parseFloat(setting.value);
    } else if (setting.valueType === 'json') {
      try {
        parsedValue = JSON.parse(setting.value);
      } catch (error) {
        console.error(`Erreur lors de l'analyse JSON pour ${setting.key}:`, error);
      }
    }

    return {
      id: setting.id.toString(),
      key: setting.key,
      value: parsedValue,
      description: setting.description || '',
      valueType: setting.valueType,
      category: setting.category
    };
  });

  res.json(transformedSettings);
}));

router.get('/securitysettings/category/:category', asyncHandler(async (req, res) => {
  const securitySettings = await SecuritySetting.findAll({
    where: { category: req.params.category }
  });

  // Transformer les données
  const transformedSettings = securitySettings.map(setting => {
    // Convertir la valeur selon le type
    let parsedValue = setting.value;
    if (setting.valueType === 'boolean') {
      parsedValue = setting.value === 'true';
    } else if (setting.valueType === 'number') {
      parsedValue = parseFloat(setting.value);
    } else if (setting.valueType === 'json') {
      try {
        parsedValue = JSON.parse(setting.value);
      } catch (error) {
        console.error(`Erreur lors de l'analyse JSON pour ${setting.key}:`, error);
      }
    }

    return {
      id: setting.id.toString(),
      key: setting.key,
      value: parsedValue,
      description: setting.description || '',
      valueType: setting.valueType,
      category: setting.category
    };
  });

  res.json(transformedSettings);
}));

router.get('/securitysettings/key/:key', asyncHandler(async (req, res) => {
  const securitySetting = await SecuritySetting.findOne({
    where: { key: req.params.key }
  });

  if (!securitySetting) {
    return res.status(404).json({ message: 'Paramètre de sécurité non trouvé' });
  }

  // Convertir la valeur selon le type
  let parsedValue = securitySetting.value;
  if (securitySetting.valueType === 'boolean') {
    parsedValue = securitySetting.value === 'true';
  } else if (securitySetting.valueType === 'number') {
    parsedValue = parseFloat(securitySetting.value);
  } else if (securitySetting.valueType === 'json') {
    try {
      parsedValue = JSON.parse(securitySetting.value);
    } catch (error) {
      console.error(`Erreur lors de l'analyse JSON pour ${securitySetting.key}:`, error);
    }
  }

  // Transformer les données
  const transformedSetting = {
    id: securitySetting.id.toString(),
    key: securitySetting.key,
    value: parsedValue,
    description: securitySetting.description || '',
    valueType: securitySetting.valueType,
    category: securitySetting.category
  };

  res.json(transformedSetting);
}));

router.put('/securitysettings/key/:key', asyncHandler(async (req, res) => {
  const { value } = req.body;

  const securitySetting = await SecuritySetting.findOne({
    where: { key: req.params.key }
  });

  if (!securitySetting) {
    return res.status(404).json({ message: 'Paramètre de sécurité non trouvé' });
  }

  // Convertir la valeur selon le type avant de la stocker
  let stringValue = value;
  if (securitySetting.valueType === 'boolean') {
    stringValue = value.toString();
  } else if (securitySetting.valueType === 'number') {
    stringValue = value.toString();
  } else if (securitySetting.valueType === 'json') {
    stringValue = JSON.stringify(value);
  }

  securitySetting.value = stringValue;
  await securitySetting.save();

  // Convertir la valeur selon le type pour la réponse
  let parsedValue = securitySetting.value;
  if (securitySetting.valueType === 'boolean') {
    parsedValue = securitySetting.value === 'true';
  } else if (securitySetting.valueType === 'number') {
    parsedValue = parseFloat(securitySetting.value);
  } else if (securitySetting.valueType === 'json') {
    try {
      parsedValue = JSON.parse(securitySetting.value);
    } catch (error) {
      console.error(`Erreur lors de l'analyse JSON pour ${securitySetting.key}:`, error);
    }
  }

  // Transformer les données
  const transformedSetting = {
    id: securitySetting.id.toString(),
    key: securitySetting.key,
    value: parsedValue,
    description: securitySetting.description || '',
    valueType: securitySetting.valueType,
    category: securitySetting.category
  };

  res.json(transformedSetting);
}));

router.put('/securitysettings/batch', asyncHandler(async (req, res) => {
  const { settings } = req.body;

  const updatedSettings = [];

  for (const setting of settings) {
    const securitySetting = await SecuritySetting.findOne({
      where: { key: setting.key }
    });

    if (securitySetting) {
      // Convertir la valeur selon le type avant de la stocker
      let stringValue = setting.value;
      if (securitySetting.valueType === 'boolean') {
        stringValue = setting.value.toString();
      } else if (securitySetting.valueType === 'number') {
        stringValue = setting.value.toString();
      } else if (securitySetting.valueType === 'json') {
        stringValue = JSON.stringify(setting.value);
      }

      securitySetting.value = stringValue;
      await securitySetting.save();

      // Convertir la valeur selon le type pour la réponse
      let parsedValue = securitySetting.value;
      if (securitySetting.valueType === 'boolean') {
        parsedValue = securitySetting.value === 'true';
      } else if (securitySetting.valueType === 'number') {
        parsedValue = parseFloat(securitySetting.value);
      } else if (securitySetting.valueType === 'json') {
        try {
          parsedValue = JSON.parse(securitySetting.value);
        } catch (error) {
          console.error(`Erreur lors de l'analyse JSON pour ${securitySetting.key}:`, error);
        }
      }

      updatedSettings.push({
        id: securitySetting.id.toString(),
        key: securitySetting.key,
        value: parsedValue,
        description: securitySetting.description || '',
        valueType: securitySetting.valueType,
        category: securitySetting.category
      });
    }
  }

  res.json(updatedSettings);
}));

// Routes pour les clés API
router.get('/apikeys', asyncHandler(async (req, res) => {
  const apiKeys = await ApiKey.findAll();

  // Transformer les données
  const transformedApiKeys = apiKeys.map(apiKey => ({
    id: apiKey.id.toString(),
    name: apiKey.name,
    key: apiKey.masked_key, // Utiliser la clé masquée pour la sécurité
    permissions: apiKey.permissions,
    active: apiKey.active,
    expires_at: apiKey.expires_at ? apiKey.expires_at.toISOString() : null,
    last_used_at: apiKey.last_used_at ? apiKey.last_used_at.toISOString() : null,
    description: apiKey.description || '',
    createdAt: apiKey.createdAt.toISOString()
  }));

  res.json(transformedApiKeys);
}));

router.get('/apikeys/:id', asyncHandler(async (req, res) => {
  const apiKey = await ApiKey.findByPk(req.params.id);

  if (!apiKey) {
    return res.status(404).json({ message: 'Clé API non trouvée' });
  }

  // Transformer les données
  const transformedApiKey = {
    id: apiKey.id.toString(),
    name: apiKey.name,
    key: apiKey.masked_key, // Utiliser la clé masquée pour la sécurité
    permissions: apiKey.permissions,
    active: apiKey.active,
    expires_at: apiKey.expires_at ? apiKey.expires_at.toISOString() : null,
    last_used_at: apiKey.last_used_at ? apiKey.last_used_at.toISOString() : null,
    description: apiKey.description || '',
    createdAt: apiKey.createdAt.toISOString()
  };

  res.json(transformedApiKey);
}));

router.post('/apikeys', asyncHandler(async (req, res) => {
  const { name, permissions, active, expires_at, description } = req.body;

  // Générer une nouvelle clé API
  const key = 'sk_' + crypto.randomBytes(24).toString('hex');

  // Créer la clé API
  const apiKey = await ApiKey.create({
    name,
    key,
    permissions: permissions || ['read'],
    active: active !== undefined ? active : true,
    expires_at: expires_at || null,
    description
  });

  // Transformer les données
  const transformedApiKey = {
    id: apiKey.id.toString(),
    name: apiKey.name,
    key: apiKey.key, // Renvoyer la clé complète lors de la création
    permissions: apiKey.permissions,
    active: apiKey.active,
    expires_at: apiKey.expires_at ? apiKey.expires_at.toISOString() : null,
    last_used_at: apiKey.last_used_at ? apiKey.last_used_at.toISOString() : null,
    description: apiKey.description || '',
    createdAt: apiKey.createdAt.toISOString()
  };

  res.status(201).json(transformedApiKey);
}));

router.put('/apikeys/:id', asyncHandler(async (req, res) => {
  const { name, permissions, active, expires_at, description } = req.body;

  const apiKey = await ApiKey.findByPk(req.params.id);
  if (!apiKey) {
    return res.status(404).json({ message: 'Clé API non trouvée' });
  }

  // Mettre à jour les champs
  if (name) apiKey.name = name;
  if (permissions) apiKey.permissions = permissions;
  if (active !== undefined) apiKey.active = active;
  if (expires_at !== undefined) apiKey.expires_at = expires_at;
  if (description !== undefined) apiKey.description = description;

  await apiKey.save();

  // Transformer les données
  const transformedApiKey = {
    id: apiKey.id.toString(),
    name: apiKey.name,
    key: apiKey.masked_key, // Utiliser la clé masquée pour la sécurité
    permissions: apiKey.permissions,
    active: apiKey.active,
    expires_at: apiKey.expires_at ? apiKey.expires_at.toISOString() : null,
    last_used_at: apiKey.last_used_at ? apiKey.last_used_at.toISOString() : null,
    description: apiKey.description || '',
    createdAt: apiKey.createdAt.toISOString()
  };

  res.json(transformedApiKey);
}));

router.delete('/apikeys/:id', asyncHandler(async (req, res) => {
  const apiKey = await ApiKey.findByPk(req.params.id);
  if (!apiKey) {
    return res.status(404).json({ message: 'Clé API non trouvée' });
  }

  await apiKey.destroy();
  res.status(204).end();
}));

router.post('/apikeys/:id/regenerate', asyncHandler(async (req, res) => {
  const apiKey = await ApiKey.findByPk(req.params.id);
  if (!apiKey) {
    return res.status(404).json({ message: 'Clé API non trouvée' });
  }

  // Générer une nouvelle clé API
  const key = 'sk_' + crypto.randomBytes(24).toString('hex');
  apiKey.key = key;
  await apiKey.save();

  // Transformer les données
  const transformedApiKey = {
    id: apiKey.id.toString(),
    name: apiKey.name,
    key: apiKey.key, // Renvoyer la clé complète lors de la régénération
    permissions: apiKey.permissions,
    active: apiKey.active,
    expires_at: apiKey.expires_at ? apiKey.expires_at.toISOString() : null,
    last_used_at: apiKey.last_used_at ? apiKey.last_used_at.toISOString() : null,
    description: apiKey.description || '',
    createdAt: apiKey.createdAt.toISOString()
  };

  res.json(transformedApiKey);
}));

router.patch('/apikeys/:id/toggle', asyncHandler(async (req, res) => {
  const apiKey = await ApiKey.findByPk(req.params.id);
  if (!apiKey) {
    return res.status(404).json({ message: 'Clé API non trouvée' });
  }

  apiKey.active = !apiKey.active;
  await apiKey.save();

  // Transformer les données
  const transformedApiKey = {
    id: apiKey.id.toString(),
    name: apiKey.name,
    key: apiKey.masked_key, // Utiliser la clé masquée pour la sécurité
    permissions: apiKey.permissions,
    active: apiKey.active,
    expires_at: apiKey.expires_at ? apiKey.expires_at.toISOString() : null,
    last_used_at: apiKey.last_used_at ? apiKey.last_used_at.toISOString() : null,
    description: apiKey.description || '',
    createdAt: apiKey.createdAt.toISOString()
  };

  res.json(transformedApiKey);
}));

// Routes pour les règles d'automatisation
router.get('/automationrules', asyncHandler(async (req, res) => {
  const rules = await AutomationRule.findAll({
    order: [['priority', 'ASC']]
  });

  // Transformer les données
  const transformedRules = rules.map(rule => ({
    id: rule.id.toString(),
    name: rule.name,
    description: rule.description || '',
    trigger_type: rule.trigger_type,
    trigger_value: rule.trigger_value,
    action_type: rule.action_type,
    action_params: rule.action_params,
    enabled: rule.enabled,
    priority: rule.priority,
    last_run: rule.last_run ? rule.last_run.toISOString() : null,
    last_status: rule.last_status,
    success_count: rule.success_count,
    failure_count: rule.failure_count,
    createdAt: rule.createdAt.toISOString()
  }));

  res.json(transformedRules);
}));

router.get('/automationrules/:id', asyncHandler(async (req, res) => {
  const rule = await AutomationRule.findByPk(req.params.id);

  if (!rule) {
    return res.status(404).json({ message: 'Règle d\'automatisation non trouvée' });
  }

  // Transformer les données
  const transformedRule = {
    id: rule.id.toString(),
    name: rule.name,
    description: rule.description || '',
    trigger_type: rule.trigger_type,
    trigger_value: rule.trigger_value,
    action_type: rule.action_type,
    action_params: rule.action_params,
    enabled: rule.enabled,
    priority: rule.priority,
    last_run: rule.last_run ? rule.last_run.toISOString() : null,
    last_status: rule.last_status,
    success_count: rule.success_count,
    failure_count: rule.failure_count,
    createdAt: rule.createdAt.toISOString()
  };

  res.json(transformedRule);
}));

router.post('/automationrules', asyncHandler(async (req, res) => {
  const {
    name,
    description,
    trigger_type,
    trigger_value,
    action_type,
    action_params,
    enabled,
    priority
  } = req.body;

  // Créer la règle d'automatisation
  const rule = await AutomationRule.create({
    name,
    description,
    trigger_type: trigger_type || 'cron',
    trigger_value,
    action_type,
    action_params,
    enabled: enabled !== undefined ? enabled : true,
    priority: priority || 100
  });

  // Transformer les données
  const transformedRule = {
    id: rule.id.toString(),
    name: rule.name,
    description: rule.description || '',
    trigger_type: rule.trigger_type,
    trigger_value: rule.trigger_value,
    action_type: rule.action_type,
    action_params: rule.action_params,
    enabled: rule.enabled,
    priority: rule.priority,
    last_run: rule.last_run ? rule.last_run.toISOString() : null,
    last_status: rule.last_status,
    success_count: rule.success_count,
    failure_count: rule.failure_count,
    createdAt: rule.createdAt.toISOString()
  };

  res.status(201).json(transformedRule);
}));

router.put('/automationrules/:id', asyncHandler(async (req, res) => {
  const {
    name,
    description,
    trigger_type,
    trigger_value,
    action_type,
    action_params,
    enabled,
    priority
  } = req.body;

  const rule = await AutomationRule.findByPk(req.params.id);
  if (!rule) {
    return res.status(404).json({ message: 'Règle d\'automatisation non trouvée' });
  }

  // Mettre à jour les champs
  if (name) rule.name = name;
  if (description !== undefined) rule.description = description;
  if (trigger_type) rule.trigger_type = trigger_type;
  if (trigger_value) rule.trigger_value = trigger_value;
  if (action_type) rule.action_type = action_type;
  if (action_params) rule.action_params = action_params;
  if (enabled !== undefined) rule.enabled = enabled;
  if (priority !== undefined) rule.priority = priority;

  await rule.save();

  // Transformer les données
  const transformedRule = {
    id: rule.id.toString(),
    name: rule.name,
    description: rule.description || '',
    trigger_type: rule.trigger_type,
    trigger_value: rule.trigger_value,
    action_type: rule.action_type,
    action_params: rule.action_params,
    enabled: rule.enabled,
    priority: rule.priority,
    last_run: rule.last_run ? rule.last_run.toISOString() : null,
    last_status: rule.last_status,
    success_count: rule.success_count,
    failure_count: rule.failure_count,
    createdAt: rule.createdAt.toISOString()
  };

  res.json(transformedRule);
}));

router.delete('/automationrules/:id', asyncHandler(async (req, res) => {
  const rule = await AutomationRule.findByPk(req.params.id);
  if (!rule) {
    return res.status(404).json({ message: 'Règle d\'automatisation non trouvée' });
  }

  await rule.destroy();
  res.status(204).end();
}));

router.patch('/automationrules/:id/toggle', asyncHandler(async (req, res) => {
  const rule = await AutomationRule.findByPk(req.params.id);
  if (!rule) {
    return res.status(404).json({ message: 'Règle d\'automatisation non trouvée' });
  }

  rule.enabled = !rule.enabled;
  await rule.save();

  // Transformer les données
  const transformedRule = {
    id: rule.id.toString(),
    name: rule.name,
    description: rule.description || '',
    trigger_type: rule.trigger_type,
    trigger_value: rule.trigger_value,
    action_type: rule.action_type,
    action_params: rule.action_params,
    enabled: rule.enabled,
    priority: rule.priority,
    last_run: rule.last_run ? rule.last_run.toISOString() : null,
    last_status: rule.last_status,
    success_count: rule.success_count,
    failure_count: rule.failure_count,
    createdAt: rule.createdAt.toISOString()
  };

  res.json(transformedRule);
}));

router.post('/automationrules/:id/run', asyncHandler(async (req, res) => {
  const rule = await AutomationRule.findByPk(req.params.id);
  if (!rule) {
    return res.status(404).json({ message: 'Règle d\'automatisation non trouvée' });
  }

  // Simuler l'exécution de la règle (dans une vraie application, cela déclencherait l'action réelle)
  const success = Math.random() > 0.2; // 80% de chance de succès pour la simulation

  rule.last_run = new Date();
  rule.last_status = success ? 'success' : 'failure';

  if (success) {
    rule.success_count += 1;
  } else {
    rule.failure_count += 1;
  }

  await rule.save();

  // Transformer les données
  const transformedRule = {
    id: rule.id.toString(),
    name: rule.name,
    description: rule.description || '',
    trigger_type: rule.trigger_type,
    trigger_value: rule.trigger_value,
    action_type: rule.action_type,
    action_params: rule.action_params,
    enabled: rule.enabled,
    priority: rule.priority,
    last_run: rule.last_run ? rule.last_run.toISOString() : null,
    last_status: rule.last_status,
    success_count: rule.success_count,
    failure_count: rule.failure_count,
    createdAt: rule.createdAt.toISOString()
  };

  res.json({
    rule: transformedRule,
    execution: {
      success,
      message: success ? 'Règle exécutée avec succès' : 'Échec de l\'exécution de la règle',
      timestamp: new Date().toISOString()
    }
  });
}));

// Routes pour les paramètres de journalisation
router.get('/loggingsettings', asyncHandler(async (req, res) => {
  const settings = await LoggingSetting.findAll();

  // Transformer les données
  const transformedSettings = settings.map(setting => {
    let value = setting.value;

    // Convertir la valeur selon son type
    if (setting.valueType === 'boolean') {
      value = value === 'true';
    } else if (setting.valueType === 'number') {
      value = Number(value);
    } else if (setting.valueType === 'json') {
      try {
        value = JSON.parse(value);
      } catch (e) {
        console.error(`Erreur lors de la conversion JSON pour ${setting.key}:`, e);
      }
    }

    return {
      id: setting.id.toString(),
      key: setting.key,
      value: value,
      description: setting.description || '',
      valueType: setting.valueType,
      category: setting.category
    };
  });

  res.json(transformedSettings);
}));

router.get('/loggingsettings/:key', asyncHandler(async (req, res) => {
  const setting = await LoggingSetting.findOne({
    where: { key: req.params.key }
  });

  if (!setting) {
    return res.status(404).json({ message: 'Paramètre de journalisation non trouvé' });
  }

  // Convertir la valeur selon son type
  let value = setting.value;
  if (setting.valueType === 'boolean') {
    value = value === 'true';
  } else if (setting.valueType === 'number') {
    value = Number(value);
  } else if (setting.valueType === 'json') {
    try {
      value = JSON.parse(value);
    } catch (e) {
      console.error(`Erreur lors de la conversion JSON pour ${setting.key}:`, e);
    }
  }

  // Transformer les données
  const transformedSetting = {
    id: setting.id.toString(),
    key: setting.key,
    value: value,
    description: setting.description || '',
    valueType: setting.valueType,
    category: setting.category
  };

  res.json(transformedSetting);
}));

router.put('/loggingsettings/:key', asyncHandler(async (req, res) => {
  const { value } = req.body;

  const setting = await LoggingSetting.findOne({
    where: { key: req.params.key }
  });

  if (!setting) {
    return res.status(404).json({ message: 'Paramètre de journalisation non trouvé' });
  }

  // Convertir la valeur en chaîne selon son type
  let stringValue;
  if (typeof value === 'boolean') {
    stringValue = value.toString();
  } else if (typeof value === 'number') {
    stringValue = value.toString();
  } else if (typeof value === 'object') {
    stringValue = JSON.stringify(value);
  } else {
    stringValue = value;
  }

  setting.value = stringValue;
  await setting.save();

  // Convertir la valeur selon son type pour la réponse
  let convertedValue = setting.value;
  if (setting.valueType === 'boolean') {
    convertedValue = convertedValue === 'true';
  } else if (setting.valueType === 'number') {
    convertedValue = Number(convertedValue);
  } else if (setting.valueType === 'json') {
    try {
      convertedValue = JSON.parse(convertedValue);
    } catch (e) {
      console.error(`Erreur lors de la conversion JSON pour ${setting.key}:`, e);
    }
  }

  // Transformer les données
  const transformedSetting = {
    id: setting.id.toString(),
    key: setting.key,
    value: convertedValue,
    description: setting.description || '',
    valueType: setting.valueType,
    category: setting.category
  };

  res.json(transformedSetting);
}));

router.put('/loggingsettings/batch', asyncHandler(async (req, res) => {
  const { settings } = req.body;

  const updatedSettings = [];

  for (const settingData of settings) {
    const setting = await LoggingSetting.findOne({
      where: { key: settingData.key }
    });

    if (setting) {
      // Convertir la valeur en chaîne selon son type
      let stringValue;
      if (typeof settingData.value === 'boolean') {
        stringValue = settingData.value.toString();
      } else if (typeof settingData.value === 'number') {
        stringValue = settingData.value.toString();
      } else if (typeof settingData.value === 'object') {
        stringValue = JSON.stringify(settingData.value);
      } else {
        stringValue = settingData.value;
      }

      setting.value = stringValue;
      await setting.save();

      // Convertir la valeur selon son type pour la réponse
      let convertedValue = setting.value;
      if (setting.valueType === 'boolean') {
        convertedValue = convertedValue === 'true';
      } else if (setting.valueType === 'number') {
        convertedValue = Number(convertedValue);
      } else if (setting.valueType === 'json') {
        try {
          convertedValue = JSON.parse(convertedValue);
        } catch (e) {
          console.error(`Erreur lors de la conversion JSON pour ${setting.key}:`, e);
        }
      }

      updatedSettings.push({
        id: setting.id.toString(),
        key: setting.key,
        value: convertedValue,
        description: setting.description || '',
        valueType: setting.valueType,
        category: setting.category
      });
    }
  }

  res.json(updatedSettings);
}));

// Routes pour les modèles de documents
router.get('/documentlayouts', asyncHandler(async (req, res) => {
  const layouts = await DocumentLayout.findAll({
    order: [['type', 'ASC'], ['name', 'ASC']]
  });

  // Transformer les données
  const transformedLayouts = layouts.map(layout => ({
    id: layout.id.toString(),
    name: layout.name,
    type: layout.type,
    isDefault: layout.isDefault,
    orientation: layout.orientation,
    paperSize: layout.paperSize,
    previewUrl: layout.previewUrl,
    status: layout.status,
    lastModified: layout.updatedAt.toISOString().split('T')[0]
  }));

  res.json(transformedLayouts);
}));

router.get('/documentlayouts/:id', asyncHandler(async (req, res) => {
  const layout = await DocumentLayout.findByPk(req.params.id);

  if (!layout) {
    return res.status(404).json({ message: 'Modèle de document non trouvé' });
  }

  // Transformer les données
  const transformedLayout = {
    id: layout.id.toString(),
    name: layout.name,
    type: layout.type,
    content: layout.content,
    metadata: layout.metadata,
    isDefault: layout.isDefault,
    orientation: layout.orientation,
    paperSize: layout.paperSize,
    margins: layout.margins,
    previewUrl: layout.previewUrl,
    status: layout.status,
    createdAt: layout.createdAt.toISOString(),
    lastModified: layout.updatedAt.toISOString().split('T')[0]
  };

  res.json(transformedLayout);
}));

router.post('/documentlayouts', asyncHandler(async (req, res) => {
  const {
    name,
    type,
    content,
    metadata,
    isDefault,
    orientation,
    paperSize,
    margins,
    previewUrl,
    status
  } = req.body;

  // Si ce modèle est défini comme modèle par défaut, désactiver les autres modèles par défaut du même type
  if (isDefault) {
    await DocumentLayout.update(
      { isDefault: false },
      { where: { type, isDefault: true } }
    );
  }

  // Créer le modèle de document
  const layout = await DocumentLayout.create({
    name,
    type,
    content,
    metadata,
    isDefault: isDefault !== undefined ? isDefault : false,
    orientation: orientation || 'portrait',
    paperSize: paperSize || 'A4',
    margins: margins || { top: 10, right: 10, bottom: 10, left: 10 },
    previewUrl,
    status: status || 'active'
  });

  // Transformer les données
  const transformedLayout = {
    id: layout.id.toString(),
    name: layout.name,
    type: layout.type,
    isDefault: layout.isDefault,
    orientation: layout.orientation,
    paperSize: layout.paperSize,
    previewUrl: layout.previewUrl,
    status: layout.status,
    lastModified: layout.updatedAt.toISOString().split('T')[0]
  };

  res.status(201).json(transformedLayout);
}));

router.put('/documentlayouts/:id', asyncHandler(async (req, res) => {
  const {
    name,
    type,
    content,
    metadata,
    isDefault,
    orientation,
    paperSize,
    margins,
    previewUrl,
    status
  } = req.body;

  const layout = await DocumentLayout.findByPk(req.params.id);
  if (!layout) {
    return res.status(404).json({ message: 'Modèle de document non trouvé' });
  }

  // Si ce modèle est défini comme modèle par défaut, désactiver les autres modèles par défaut du même type
  if (isDefault && !layout.isDefault) {
    await DocumentLayout.update(
      { isDefault: false },
      {
        where: {
          type: type || layout.type,
          isDefault: true,
          id: { [Op.ne]: layout.id }
        }
      }
    );
  }

  // Mettre à jour les champs
  if (name) layout.name = name;
  if (type) layout.type = type;
  if (content) layout.content = content;
  if (metadata) layout.metadata = metadata;
  if (isDefault !== undefined) layout.isDefault = isDefault;
  if (orientation) layout.orientation = orientation;
  if (paperSize) layout.paperSize = paperSize;
  if (margins) layout.margins = margins;
  if (previewUrl) layout.previewUrl = previewUrl;
  if (status) layout.status = status;

  await layout.save();

  // Transformer les données
  const transformedLayout = {
    id: layout.id.toString(),
    name: layout.name,
    type: layout.type,
    isDefault: layout.isDefault,
    orientation: layout.orientation,
    paperSize: layout.paperSize,
    previewUrl: layout.previewUrl,
    status: layout.status,
    lastModified: layout.updatedAt.toISOString().split('T')[0]
  };

  res.json(transformedLayout);
}));

router.delete('/documentlayouts/:id', asyncHandler(async (req, res) => {
  const layout = await DocumentLayout.findByPk(req.params.id);
  if (!layout) {
    return res.status(404).json({ message: 'Modèle de document non trouvé' });
  }

  // Empêcher la suppression d'un modèle par défaut
  if (layout.isDefault) {
    return res.status(400).json({
      message: 'Impossible de supprimer un modèle par défaut. Veuillez d\'abord définir un autre modèle comme modèle par défaut.'
    });
  }

  await layout.destroy();
  res.status(204).end();
}));

router.patch('/documentlayouts/:id/setdefault', asyncHandler(async (req, res) => {
  const layout = await DocumentLayout.findByPk(req.params.id);
  if (!layout) {
    return res.status(404).json({ message: 'Modèle de document non trouvé' });
  }

  // Désactiver les autres modèles par défaut du même type
  await DocumentLayout.update(
    { isDefault: false },
    {
      where: {
        type: layout.type,
        isDefault: true,
        id: { [Op.ne]: layout.id }
      }
    }
  );

  // Définir ce modèle comme modèle par défaut
  layout.isDefault = true;
  await layout.save();

  // Transformer les données
  const transformedLayout = {
    id: layout.id.toString(),
    name: layout.name,
    type: layout.type,
    isDefault: layout.isDefault,
    orientation: layout.orientation,
    paperSize: layout.paperSize,
    previewUrl: layout.previewUrl,
    status: layout.status,
    lastModified: layout.updatedAt.toISOString().split('T')[0]
  };

  res.json(transformedLayout);
}));

router.get('/documentlayouts/type/:type', asyncHandler(async (req, res) => {
  const layouts = await DocumentLayout.findAll({
    where: { type: req.params.type },
    order: [['name', 'ASC']]
  });

  // Transformer les données
  const transformedLayouts = layouts.map(layout => ({
    id: layout.id.toString(),
    name: layout.name,
    type: layout.type,
    isDefault: layout.isDefault,
    orientation: layout.orientation,
    paperSize: layout.paperSize,
    previewUrl: layout.previewUrl,
    status: layout.status,
    lastModified: layout.updatedAt.toISOString().split('T')[0]
  }));

  res.json(transformedLayouts);
}));

router.get('/documentlayouts/type/:type/default', asyncHandler(async (req, res) => {
  const layout = await DocumentLayout.findOne({
    where: {
      type: req.params.type,
      isDefault: true
    }
  });

  if (!layout) {
    return res.status(404).json({ message: 'Aucun modèle par défaut trouvé pour ce type de document' });
  }

  // Transformer les données
  const transformedLayout = {
    id: layout.id.toString(),
    name: layout.name,
    type: layout.type,
    content: layout.content,
    metadata: layout.metadata,
    isDefault: layout.isDefault,
    orientation: layout.orientation,
    paperSize: layout.paperSize,
    margins: layout.margins,
    previewUrl: layout.previewUrl,
    status: layout.status,
    createdAt: layout.createdAt.toISOString(),
    lastModified: layout.updatedAt.toISOString().split('T')[0]
  };

  res.json(transformedLayout);
}));

// Routes pour les modèles de rapports
router.get('/reporttemplates', asyncHandler(async (req, res) => {
  const templates = await ReportTemplate.findAll({
    order: [['category', 'ASC'], ['name', 'ASC']]
  });

  // Transformer les données
  const transformedTemplates = templates.map(template => ({
    id: template.id.toString(),
    name: template.name,
    category: template.category,
    format: template.format,
    previewUrl: template.previewUrl,
    status: template.status,
    lastModified: template.updatedAt.toISOString().split('T')[0]
  }));

  res.json(transformedTemplates);
}));

router.get('/reporttemplates/:id', asyncHandler(async (req, res) => {
  const template = await ReportTemplate.findByPk(req.params.id);

  if (!template) {
    return res.status(404).json({ message: 'Modèle de rapport non trouvé' });
  }

  // Transformer les données
  const transformedTemplate = {
    id: template.id.toString(),
    name: template.name,
    category: template.category,
    description: template.description || '',
    content: template.content,
    format: template.format,
    parameters: template.parameters,
    query: template.query,
    previewUrl: template.previewUrl,
    status: template.status,
    isShared: template.isShared,
    requiredPermissions: template.requiredPermissions,
    scheduleFrequency: template.scheduleFrequency,
    scheduleCron: template.scheduleCron,
    createdAt: template.createdAt.toISOString(),
    lastModified: template.updatedAt.toISOString().split('T')[0]
  };

  res.json(transformedTemplate);
}));

router.post('/reporttemplates', asyncHandler(async (req, res) => {
  const {
    name,
    category,
    description,
    content,
    format,
    parameters,
    query,
    previewUrl,
    status,
    isShared,
    requiredPermissions,
    scheduleFrequency,
    scheduleCron
  } = req.body;

  // Créer le modèle de rapport
  const template = await ReportTemplate.create({
    name,
    category,
    description,
    content,
    format: format || 'PDF',
    parameters,
    query,
    previewUrl,
    status: status || 'active',
    isShared: isShared !== undefined ? isShared : true,
    requiredPermissions,
    scheduleFrequency,
    scheduleCron
  });

  // Transformer les données
  const transformedTemplate = {
    id: template.id.toString(),
    name: template.name,
    category: template.category,
    format: template.format,
    previewUrl: template.previewUrl,
    status: template.status,
    lastModified: template.updatedAt.toISOString().split('T')[0]
  };

  res.status(201).json(transformedTemplate);
}));

router.put('/reporttemplates/:id', asyncHandler(async (req, res) => {
  const {
    name,
    category,
    description,
    content,
    format,
    parameters,
    query,
    previewUrl,
    status,
    isShared,
    requiredPermissions,
    scheduleFrequency,
    scheduleCron
  } = req.body;

  const template = await ReportTemplate.findByPk(req.params.id);
  if (!template) {
    return res.status(404).json({ message: 'Modèle de rapport non trouvé' });
  }

  // Mettre à jour les champs
  if (name) template.name = name;
  if (category) template.category = category;
  if (description !== undefined) template.description = description;
  if (content) template.content = content;
  if (format) template.format = format;
  if (parameters) template.parameters = parameters;
  if (query !== undefined) template.query = query;
  if (previewUrl) template.previewUrl = previewUrl;
  if (status) template.status = status;
  if (isShared !== undefined) template.isShared = isShared;
  if (requiredPermissions) template.requiredPermissions = requiredPermissions;
  if (scheduleFrequency !== undefined) template.scheduleFrequency = scheduleFrequency;
  if (scheduleCron !== undefined) template.scheduleCron = scheduleCron;

  await template.save();

  // Transformer les données
  const transformedTemplate = {
    id: template.id.toString(),
    name: template.name,
    category: template.category,
    format: template.format,
    previewUrl: template.previewUrl,
    status: template.status,
    lastModified: template.updatedAt.toISOString().split('T')[0]
  };

  res.json(transformedTemplate);
}));

router.delete('/reporttemplates/:id', asyncHandler(async (req, res) => {
  const template = await ReportTemplate.findByPk(req.params.id);
  if (!template) {
    return res.status(404).json({ message: 'Modèle de rapport non trouvé' });
  }

  await template.destroy();
  res.status(204).end();
}));

router.get('/reporttemplates/category/:category', asyncHandler(async (req, res) => {
  const templates = await ReportTemplate.findAll({
    where: { category: req.params.category },
    order: [['name', 'ASC']]
  });

  // Transformer les données
  const transformedTemplates = templates.map(template => ({
    id: template.id.toString(),
    name: template.name,
    category: template.category,
    format: template.format,
    previewUrl: template.previewUrl,
    status: template.status,
    lastModified: template.updatedAt.toISOString().split('T')[0]
  }));

  res.json(transformedTemplates);
}));

router.post('/reporttemplates/:id/generate', asyncHandler(async (req, res) => {
  const { parameters } = req.body;

  const template = await ReportTemplate.findByPk(req.params.id);
  if (!template) {
    return res.status(404).json({ message: 'Modèle de rapport non trouvé' });
  }

  // Simuler la génération d'un rapport (dans une vraie application, cela générerait réellement le rapport)
  // Ici, nous renvoyons simplement un lien de téléchargement fictif

  const reportUrl = `/reports/generated/${template.id}_${Date.now()}.${template.format.toLowerCase()}`;

  res.json({
    success: true,
    message: 'Rapport généré avec succès',
    reportUrl,
    format: template.format,
    generatedAt: new Date().toISOString()
  });
}));

// Routes pour les imprimantes
router.get('/printers', asyncHandler(async (req, res) => {
  const printers = await Printer.findAll({
    order: [['name', 'ASC']]
  });

  // Transformer les données
  const transformedPrinters = printers.map(printer => ({
    id: printer.id.toString(),
    name: printer.name,
    type: printer.type,
    connection: printer.connection,
    address: printer.address,
    port: printer.port,
    isDefault: printer.isDefault,
    status: printer.status,
    lastModified: printer.updatedAt.toISOString().split('T')[0]
  }));

  res.json(transformedPrinters);
}));

router.get('/printers/:id', asyncHandler(async (req, res) => {
  const printer = await Printer.findByPk(req.params.id);

  if (!printer) {
    return res.status(404).json({ message: 'Imprimante non trouvée' });
  }

  // Transformer les données
  const transformedPrinter = {
    id: printer.id.toString(),
    name: printer.name,
    type: printer.type,
    connection: printer.connection,
    address: printer.address,
    port: printer.port,
    driver: printer.driver,
    options: printer.options,
    isDefault: printer.isDefault,
    status: printer.status,
    capabilities: printer.capabilities,
    createdAt: printer.createdAt.toISOString(),
    lastModified: printer.updatedAt.toISOString().split('T')[0]
  };

  res.json(transformedPrinter);
}));

router.post('/printers', asyncHandler(async (req, res) => {
  const {
    name,
    type,
    connection,
    address,
    port,
    driver,
    options,
    isDefault,
    status,
    capabilities
  } = req.body;

  // Si cette imprimante est définie comme imprimante par défaut, désactiver les autres imprimantes par défaut
  if (isDefault) {
    await Printer.update(
      { isDefault: false },
      { where: { isDefault: true } }
    );
  }

  // Créer l'imprimante
  const printer = await Printer.create({
    name,
    type,
    connection,
    address,
    port,
    driver,
    options,
    isDefault: isDefault !== undefined ? isDefault : false,
    status: status || 'active',
    capabilities
  });

  // Transformer les données
  const transformedPrinter = {
    id: printer.id.toString(),
    name: printer.name,
    type: printer.type,
    connection: printer.connection,
    address: printer.address,
    port: printer.port,
    isDefault: printer.isDefault,
    status: printer.status,
    lastModified: printer.updatedAt.toISOString().split('T')[0]
  };

  res.status(201).json(transformedPrinter);
}));

router.put('/printers/:id', asyncHandler(async (req, res) => {
  const {
    name,
    type,
    connection,
    address,
    port,
    driver,
    options,
    isDefault,
    status,
    capabilities
  } = req.body;

  const printer = await Printer.findByPk(req.params.id);
  if (!printer) {
    return res.status(404).json({ message: 'Imprimante non trouvée' });
  }

  // Si cette imprimante est définie comme imprimante par défaut, désactiver les autres imprimantes par défaut
  if (isDefault && !printer.isDefault) {
    await Printer.update(
      { isDefault: false },
      {
        where: {
          isDefault: true,
          id: { [Op.ne]: printer.id }
        }
      }
    );
  }

  // Mettre à jour les champs
  if (name) printer.name = name;
  if (type) printer.type = type;
  if (connection) printer.connection = connection;
  if (address !== undefined) printer.address = address;
  if (port !== undefined) printer.port = port;
  if (driver !== undefined) printer.driver = driver;
  if (options) printer.options = options;
  if (isDefault !== undefined) printer.isDefault = isDefault;
  if (status) printer.status = status;
  if (capabilities) printer.capabilities = capabilities;

  await printer.save();

  // Transformer les données
  const transformedPrinter = {
    id: printer.id.toString(),
    name: printer.name,
    type: printer.type,
    connection: printer.connection,
    address: printer.address,
    port: printer.port,
    isDefault: printer.isDefault,
    status: printer.status,
    lastModified: printer.updatedAt.toISOString().split('T')[0]
  };

  res.json(transformedPrinter);
}));

router.delete('/printers/:id', asyncHandler(async (req, res) => {
  const printer = await Printer.findByPk(req.params.id);
  if (!printer) {
    return res.status(404).json({ message: 'Imprimante non trouvée' });
  }

  // Empêcher la suppression d'une imprimante par défaut
  if (printer.isDefault) {
    return res.status(400).json({
      message: 'Impossible de supprimer l\'imprimante par défaut. Veuillez d\'abord définir une autre imprimante comme imprimante par défaut.'
    });
  }

  await printer.destroy();
  res.status(204).end();
}));

router.patch('/printers/:id/setdefault', asyncHandler(async (req, res) => {
  const printer = await Printer.findByPk(req.params.id);
  if (!printer) {
    return res.status(404).json({ message: 'Imprimante non trouvée' });
  }

  // Désactiver les autres imprimantes par défaut
  await Printer.update(
    { isDefault: false },
    {
      where: {
        isDefault: true,
        id: { [Op.ne]: printer.id }
      }
    }
  );

  // Définir cette imprimante comme imprimante par défaut
  printer.isDefault = true;
  await printer.save();

  // Transformer les données
  const transformedPrinter = {
    id: printer.id.toString(),
    name: printer.name,
    type: printer.type,
    connection: printer.connection,
    address: printer.address,
    port: printer.port,
    isDefault: printer.isDefault,
    status: printer.status,
    lastModified: printer.updatedAt.toISOString().split('T')[0]
  };

  res.json(transformedPrinter);
}));

router.post('/printers/:id/test', asyncHandler(async (req, res) => {
  const printer = await Printer.findByPk(req.params.id);
  if (!printer) {
    return res.status(404).json({ message: 'Imprimante non trouvée' });
  }

  // Simuler un test d'impression (dans une vraie application, cela enverrait réellement une page de test à l'imprimante)
  // Ici, nous renvoyons simplement un résultat de test fictif

  const testResult = {
    success: true,
    message: 'Test d\'impression réussi',
    printer: printer.name,
    timestamp: new Date().toISOString()
  };

  res.json(testResult);
}));

module.exports = router;
