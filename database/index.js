"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pool = exports.query = exports.db = void 0;
const tslib_1 = require("tslib");
const setupDatabase_1 = tslib_1.__importDefault(require("./setupDatabase"));
const query_1 = tslib_1.__importDefault(require("./query"));
exports.query = query_1.default;
const pg_1 = require("./pg");
Object.defineProperty(exports, "Pool", { enumerable: true, get: function () { return pg_1.Pool; } });
const db = setupDatabase_1.default();
exports.db = db;
