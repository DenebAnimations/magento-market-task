#!/bin/sh

DIR="$( cd "$( dirname "$0" )" && pwd; )"
cd ..

echo "${PWD}"

echo "[INFO] Building project..."
npm run build

echo "[INFO] Removing old files..."
rm -rf gh-pages/*

echo "[INFO] Copying new files..."
cp -R dist/. gh-pages/ 

echo "[SUCCESS] Build done"