# PGN Tools

[![GitHub Workflow Status](https://github.com/mliebelt/pgn-tools/actions/workflows/nodejs.yml/badge.svg)](https://github.com/mliebelt/pgn-tools/actions)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/mliebelt/pgn-tools?color=33aa33&label=Version&logo=npm)](https://www.npmjs.com/package/@mliebelt/pgn-tools)
[![npm](https://img.shields.io/npm/dm/@mliebelt/pgn-tools?label=Downloads&logo=npm)](https://www.npmjs.com/package/@mliebelt/pgn-tools)
[![GitHub](https://img.shields.io/github/license/mliebelt/pgn-tools?label=License)](https://github.com/mliebelt/pgn-tools/blob/main/LICENSE)
[![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/mliebelt/pgn-tools)](https://libraries.io/npm/@mliebelt%2Fpgn-tools)

Collection of useful functions / commands that combine different functions from pgn-parser, pgn-reader, pgn-writer.

## Goals

I have developed over years many different tools in the context of PGN, but combining them is not always easy. I don't want to have additional dependencies, so I want to have a collection of small functions that can be used in different projects.

So the pgn-tools will do the following:

* Provide Javascript/Typescript functions that can be used in any project.
* Provide a command line tool that can be used in any shell.
* Provide useful subcommands with different options per subcommand.

## Current Implementation

The current implementation is very early, but I want to provide some overview of what was already achieved, and what will be next.

* `readFile`: Sufficiently well implemented, should be usable directly by other commands then.