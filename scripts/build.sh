#!/bin/sh

DIR="$( cd "$( dirname "$0" )" && pwd; )"
cd ..

echo "${PWD}"

echo "[INFO] Building project..."
npm run build

echo "[INFO] Removing old files..."
rm -rf docs/*

echo "[INFO] Copying new files..."
cp -R dist/. docs/ 

echo "[SUCCESS] Build done"