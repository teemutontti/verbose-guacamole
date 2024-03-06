const express = require("express");
const router = express.Router();
const connection = require("../database/connection.js");

/** Parses JSON requests */
router.use(express.json());

/** Handles GET requests for fetching all the words. */
router.get("/", async (req, res) => {
    try {
        const languages = await connection.findAll();
        res.json(languages);
    } catch (err) {
        if (err.code) {
            res.status(err.code).json(err);
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    }
});

/** Handles POST requests for saving a new word. */
router.post("/", async (req, res) => {
    try {
        const word = await connection.save(req.body);
        res.status(201).json(word);
    } catch (err) {
        if (err.code) {
            res.status(err.code).json(err);
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    }
});

/** Handles PATCH requests for updating a word information. */
router.patch("/:myId([0-9]+)", async (req, res) => {
    const id = parseInt(req.params.myId);
    try {
        const word = await connection.update(id, req.body);
        res.status(200).json(word);
    } catch (err) {
        if (err.code) {
            res.status(err.code).json(err);
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    }
});

/** Handles DELETE requests for deleting a food. */
router.delete("/:myId([0-9]+)", async (req, res) => {
    const id = parseInt(req.params.myId);
    try {
        const word = await connection.delete(id);
        res.status(200).json(word);
    } catch (err) {
        if (err.code) {
            res.status(err.code).json(err);
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    }
});

/**
 * Module exports the API router.
 * @module
 * @type {express.Router}
 */
module.exports = router;
