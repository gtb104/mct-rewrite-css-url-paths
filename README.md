mct-rewrite-css-url-paths
=======================

## Overview

This mimosa-combine transform package will rewrite relative url paths for images to account for the fact that mimosa-combine can break relative paths.

For information on mimosa-combine transforms, checkout the [mimosa-combine repo](https://github.com/dbashford/mimosa-combine#transform-functions).

## Installation

From the root of your Mimosa project, type `npm install mct-rewrite-css-url-paths --save`

## Usage

Add this module as a combine transform in the `mimosa-config` file.
```javascript
combine: {
    folders: [
      {
        transforms: [
          require('mct-rewrite-css-url-paths')
        ]
```
