import * as treeController from '../src/controllers/tree.controller.js';
import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { Tree } from '../src/models/tree.model.js';

describe('getAllTrees', () => {
  let req;
  let res;
  beforeEach(() => {
    req = {};
    res = {
      json: function (data) {
        this.data = data;
      },
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      send: function (text) {
        this.text = text;
      },
    };
  });

  it('should return all trees', async () => {
    // On appelle la fonction getAllTrees
    await treeController.getAllTrees(req, res);
    // On vérifie que l'on a bien un tableau contenant un minimum de 1 arbre
    assert.ok(res.data.length > 0);
  });
  it('should return an error', async () => {
    // On simule une erreur en modifiant la fonction findAll de Tree
    const findAll = Tree.findAll;
    Tree.findAll = async () => {
      throw new Error('Erreur de la base de données');
    };
    // On appelle la fonction getAllTrees
    await treeController.getAllTrees(req, res);
    // On vérifie que le statut est bien 500
    assert.strictEqual(res.statusCode, 500);
    // On remet la fonction initiale
    Tree.findAll = findAll;
  });
});
